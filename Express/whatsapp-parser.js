/**
 * WhatsApp Chat Export Parser
 * Parses .txt files exported from WhatsApp into structured message objects.
 *
 * Supports formats:
 *   - "DD/MM/YYYY, HH:MM - Sender: Message"
 *   - "MM/DD/YYYY, HH:MM - Sender: Message"
 *   - "DD/MM/YY, HH:MM - Sender: Message"
 *   - "[DD/MM/YYYY, HH:MM:SS] Sender: Message"
 *   - 12-hour (AM/PM) and 24-hour time formats
 */

// Matches lines that start with a timestamp and sender
var MESSAGE_RE = /^[\["]?(\d{1,2}\/\d{1,2}\/\d{2,4}),?\s+(\d{1,2}:\d{2}(?::\d{2})?(?:\s*[APap][Mm])?)\]?\s*[-–]\s*(.+?):\s([\s\S]*)$/;

// System messages (no sender) like "Messages and calls are end-to-end encrypted"
var SYSTEM_RE = /^[\["]?(\d{1,2}\/\d{1,2}\/\d{2,4}),?\s+(\d{1,2}:\d{2}(?::\d{2})?(?:\s*[APap][Mm])?)\]?\s*[-–]\s*(.+)$/;

function parseChat(text) {
  var lines = text.split('\n');
  var messages = [];
  var participants = {};

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (!line.trim()) continue;

    var match = line.match(MESSAGE_RE);
    if (match) {
      var sender = match[3].trim();
      participants[sender] = true;
      messages.push({
        date: match[1],
        time: match[2].trim(),
        sender: sender,
        text: match[4],
        isSystem: false
      });
    } else if (SYSTEM_RE.test(line)) {
      var sysMatch = line.match(SYSTEM_RE);
      messages.push({
        date: sysMatch[1],
        time: sysMatch[2].trim(),
        sender: null,
        text: sysMatch[3],
        isSystem: true
      });
    } else if (messages.length > 0) {
      // Continuation of previous message (multi-line)
      messages[messages.length - 1].text += '\n' + line;
    }
  }

  return {
    messages: messages,
    participants: Object.keys(participants),
    totalMessages: messages.filter(function(m) { return !m.isSystem; }).length,
    systemMessages: messages.filter(function(m) { return m.isSystem; }).length
  };
}

function getStats(parsed) {
  var stats = {};
  parsed.participants.forEach(function(p) {
    stats[p] = { count: 0, words: 0 };
  });

  parsed.messages.forEach(function(m) {
    if (!m.isSystem && stats[m.sender]) {
      stats[m.sender].count++;
      stats[m.sender].words += m.text.split(/\s+/).filter(Boolean).length;
    }
  });

  return stats;
}

module.exports = { parseChat: parseChat, getStats: getStats };
