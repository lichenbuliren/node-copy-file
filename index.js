var fs = require('fs');
var path = require('path');

var sourcePath = '/Users/Heaven/meizu/GitLab/fed/meike/dist/';
var targetPath = '/Users/Heaven/meizu/Developer/mk1.meizu.com/';

copyDir(sourcePath, targetPath);

function copyDir(sourcePath, targetPath) {
  
  var sourceStats = fs.statSync(sourcePath);
  if (!sourceStats.isDirectory()) {
    console.error('请传入正确的源文件目录路径');
  };

  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath);
  }

  fs.readdir(sourcePath, function(err, files) {
    // 过滤隐藏文件
    var result = files.filter(function(file) {
      return file[0] !== '.';
    });
  
    result.forEach(function(file, index) {
      fs.stat(path.resolve(sourcePath, file), function(err, stats) {
        if (err) {
          console.log(err);
          return;
        }
        if (stats.isFile()) {
          console.log(path.join(sourcePath, file) + ' => ' + path.join(targetPath, file));
          copyFile(path.join(sourcePath, file), path.join(targetPath, file));
        } 

        if (stats.isDirectory()) {
          !fs.existsSync(path.join(targetPath, file)) && fs.mkdirSync(path.join(targetPath, file));
          copyDir(path.join(sourcePath, file), path.join(targetPath, file));
        }
      });
    });
  });
}

function copyFile(source, target) {
  fs.createReadStream(source).pipe(fs.createWriteStream(target));
}