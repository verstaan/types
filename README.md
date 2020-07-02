# types

1. This repository is meant to be used as a git submodule. However, you can still edit/commit to this like a normal repo. 

2. How do I integrate the submodule into my new repository?
    a. Run "git submodule add https://github.com/verstaan/types.git" in the directory you want to add the submodule.
    b. Once you run this, the submodule should be added and a .gitmodules file should be created as well. Feel free to move the .gitmodules file
       to the outside directory if you want, but make sure the path to the submodule is correct (inside the file).
    c. Lastly, double check you are using the most recent types version by pulling from master. Git understands that this is a repo inside of a repo
       navigate to the types directory and run "git checkout <branch>" or "git pull" and it will know that you are referring to the types submodule.

3. How do I make changes to this submodule?
    a. (The long way) - You can open the submodule repo independently and commit changes.
    b. (The easy way) - You can open the submodule repo inside of the repo you are using and commit changes from there as well 
       (make sure you are in the correct directory).
