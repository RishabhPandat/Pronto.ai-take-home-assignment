var shell = require('shelljs');
shell.config.silent = true;

git_dir = "" // add the path for the github directory here.
function changeWorkingDirectory(git_dir){
    shell.cd('~/'+git_dir);
    // console.log("Working Directory changed to: " + process.cwd());
}
function activeBranch(){
    output = shell.exec("git branch --show-current");
    return output.stdout.trimEnd();
}

function modified(){
    output = shell.exec("git status");
    ans = output.stdout.includes("nothing to commit, working tree clean");
    return !ans? "True":"False"
}

function headCommitInLastWeek(){
    output = shell.exec("git log -1 --stat");
    data = output.stdout.split(": ")
    date = data[2].split('\n')[0]
    const unixTimeZero = Date.parse(date);
    const unixTimeZero1 = Date.parse(Date.now());
    diff = unixTimeZero1 - unixTimeZero
    
    if( diff < 7*24*60*60*1000) {
        return "true"
    } else {
        return "false"
    }

}

function headCommitAuthor(){
    output = shell.exec("git log -1 --stat");
    data = output.stdout.split(": ")
    author = data[1].split('<')[0].trimEnd().trimStart()
    if( author === "Rufus") {
        return "true"
    } else {
       return "false"

    }
}

changeWorkingDirectory(git_dir)
detail1 = "active branch: " + activeBranch()
detail2 = "local changes: " + modified()
detail3 = "recent commit: " + headCommitInLastWeek()
detail4 = "blame Rufus: " + headCommitAuthor()
console.log(detail1)
console.log(detail2)
console.log(detail3)
console.log(detail4)