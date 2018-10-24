- Install github in you system<br><br>
Check whether git is installed on your system
```
git status
```
To start git version control on your directory
```
git init
```
Add your files to git using
```
git add .
```
Then make your commit

```
git commit -m "Commit message"
```
Now you need to push it to your github repository. For that you need to set your own credentials

Configure username
```
git config --global user.name "Your Name"
```
Configure Email
```
git config --global user.email "youremail@someorganistaion.com"
```
Link the repository you want to push the data. If you don't have any repository. Do create a respository in github and use http link of your repository

```
git remote add orgin "your repository link"
```
Note: Double quotes is not required.

To push
```
git push orgin master
```

If you see any error like cannot access the repository. Try using
```
git push orgin master --force
```

That's it. Check your github repository. Your files will be uploaded there

After your first commit, if you make any changes to your local files and wish to push it again to git.
Go to the directory, where you initalised git using 'git init'. And then
```
git add .
```
This will make add your changes
Commit your changes

```
git commit -m "Commit Message"
```
Finally push it
```
git push orgin master
```
Do repeat last three commands whenever you make changes and stay updated