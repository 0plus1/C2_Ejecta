fnr.exe --cl --dir %CD% --fileMask "*.js"  --find "this.isDomFree = this.isDirectCanvas || this.isCocoonJs;" --replace "this.isDomFree = true;"
fnr.exe --cl --dir %CD% --fileMask "*.js"  --find "this.isiOS = this.isiPhone || this.isiPad;" --replace "this.isiOS = true;"
fnr.exe --cl --dir %CD% --fileMask "*.js"  --find "this.ctx = null;" --replace "this.ctx = global_ctx;"

fnr.exe --cl --dir %CD% --fileMask "*.js"  --find "if (!this.instanceObject.paused)" --replace ""

fnr.exe --cl --dir %CD% --fileMask "*.js"  --find "Arial" --replace "ArialMT"