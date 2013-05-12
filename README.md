C2_Ejecta
=========

Construct 2 Plug-in for Ejecta.

Plugin How-to
-------------

To-Do

Integration How-to
------------------

1. Download: fnr.exe from http://findandreplace.codeplex.com/
2. Export your game in unminified HTML5
3. Place fnr.exe and the exporter you will be using in the directory in which you exported your game
4. Run the exporter
5. Copy c2runtime.js, the media directory, the images directory (, your loading logo if you are using it) and the provided index.js file in the App directory of Ejecta
6. ???
7. Profit!

Notes
-----

* Currently WebGL is not officially supported by this plugin. The exporter exists and it's included but it's completely experimental and it won't work with the provided index.js file.  The reason is that after several tests I found that WebGL is much slower than 2d canvas and memory wise there are no improvements, canvas 2d is the way to go for now.
