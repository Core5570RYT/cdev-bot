echo off
cls
haxe build.hxml
cd bin
node main.js
cd..