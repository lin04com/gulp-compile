!function(seajs){function setComboHash(uris){var len=uris.length;if(!(2>len)){data.comboSyntax&&(comboSyntax=data.comboSyntax),data.comboMaxLength&&(comboMaxLength=data.comboMaxLength),comboExcludes=data.comboExcludes;for(var needComboUris=[],i=0;len>i;i++){var uri=uris[i];if(!comboHash[uri]){var mod=Module.get(uri);mod.status<FETCHING&&!isExcluded(uri)&&!isComboUri(uri)&&needComboUris.push(uri)}}needComboUris.length>1&&paths2hash(uris2paths(needComboUris))}}function setRequestUri(data){data.requestUri=comboHash[data.uri]||data.uri}function uris2paths(uris){return meta2paths(uris2meta(uris))}function uris2meta(uris){for(var meta={__KEYS:[]},i=0,len=uris.length;len>i;i++)for(var parts=uris[i].replace("://","__").split("/"),m=meta,j=0,l=parts.length;l>j;j++){var part=parts[j];m[part]||(m[part]={__KEYS:[]},m.__KEYS.push(part)),m=m[part]}return meta}function meta2paths(meta){for(var paths=[],__KEYS=meta.__KEYS,i=0,len=__KEYS.length;len>i;i++){for(var part=__KEYS[i],root=part,m=meta[part],KEYS=m.__KEYS;1===KEYS.length;)root+="/"+KEYS[0],m=m[KEYS[0]],KEYS=m.__KEYS;KEYS.length&&paths.push([root.replace("__","://"),meta2arr(m)])}return paths}function meta2arr(meta){for(var arr=[],__KEYS=meta.__KEYS,i=0,len=__KEYS.length;len>i;i++){var key=__KEYS[i],r=meta2arr(meta[key]),m=r.length;if(m)for(var j=0;m>j;j++)arr.push(key+"/"+r[j]);else arr.push(key)}return arr}function paths2hash(paths){for(var i=0,len=paths.length;len>i;i++)for(var path=paths[i],root=path[0]+"/",group=files2group(path[1]),j=0,m=group.length;m>j;j++)setHash(root,group[j]);return comboHash}function setHash(root,files){var comboPath=root+comboSyntax[0]+files.join(comboSyntax[1]),exceedMax=comboPath.length>comboMaxLength;if(files.length>1&&exceedMax){var parts=splitFiles(files,comboMaxLength-(root+comboSyntax[0]).length);setHash(root,parts[0]),setHash(root,parts[1])}else{if(exceedMax)throw new Error("The combo url is too long: "+comboPath);for(var i=0,len=files.length;len>i;i++)comboHash[root+files[i]]=comboPath}}function splitFiles(files,filesMaxLength){for(var sep=comboSyntax[1],s=files[0],i=1,len=files.length;len>i;i++)if(s+=sep+files[i],s.length>filesMaxLength)return[files.splice(0,i),files]}function files2group(files){for(var group=[],hash={},i=0,len=files.length;len>i;i++){var file=files[i],ext=getExt(file);ext&&(hash[ext]||(hash[ext]=[])).push(file)}for(var k in hash)hash.hasOwnProperty(k)&&group.push(hash[k]);return group}function getExt(file){var p=file.lastIndexOf(".");return p>=0?file.substring(p):""}function isExcluded(uri){return comboExcludes?comboExcludes.test?comboExcludes.test(uri):comboExcludes(uri):void 0}function isComboUri(uri){var comboSyntax=data.comboSyntax||["??",","],s1=comboSyntax[0],s2=comboSyntax[1];return s1&&uri.indexOf(s1)>0||s2&&uri.indexOf(s2)>0}var comboExcludes,Module=seajs.Module,FETCHING=Module.STATUS.FETCHING,data=seajs.data,comboHash=data.comboHash={},comboSyntax=["??",","],comboMaxLength=2e3;if(seajs.on("load",setComboHash),seajs.on("fetch",setRequestUri),data.test){var test=seajs.test||(seajs.test={});test.uris2paths=uris2paths,test.paths2hash=paths2hash}define("seajs-combo-debug",[],{})}(seajs);