YUI.add("juicer",function(e){var t=function(){var e=[].slice.call(arguments);return e.push(t.options),e[0].match(/^\s*#([\w:\-\.]+)\s*$/gim)&&e[0].replace(/^\s*#([\w:\-\.]+)\s*$/gim,function(t,n){var o=document,i=o&&o.getElementById(n);e[0]=i?i.value||i.innerHTML:t}),t.documentHTML&&(t.compile.call(t,t.documentHTML),t.documentHTML=""),1==arguments.length?t.compile.apply(t,e):arguments.length>=2?t.to_html.apply(t,e):void 0},n={escapehash:{"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;","'":"&#x27;","/":"&#x2f;"},escapereplace:function(e){return n.escapehash[e]},escaping:function(e){return"string"!=typeof e?e:e.replace(/[&<>"']/gim,this.escapereplace)},detection:function(e){return"undefined"==typeof e?"":e}},o=function(e){if("undefined"!=typeof console){if(console.warn)return void console.warn(e);if(console.log)return void console.log(e)}throw e},i=function(e,t){if(e=e!==Object(e)?{}:e,e.__proto__)return e.__proto__=t,e;var n=function(){},o=Object.create?Object.create(t):new(n.prototype=t,n);for(var i in e)e.hasOwnProperty(i)&&(o[i]=e[i]);return o},r=function(e){var t,n,o,i=/^function\s*[^\(]*\(\s*([^\)]*)\)/m,r=/,/,s=/^\s*(_?)(\S+?)\1\s*$/,a=/^function[^{]+{([\s\S]*)}/m,c=[];"function"==typeof e?e.length&&(t=e.toString()):"string"==typeof e&&(t=e),t=t.trim(),o=t.match(i),n=t.match(a)[1].trim();for(var p=0;p<o[1].split(r).length;p++){var l=o[1].split(r)[p];l.replace(s,function(e,t,n){c.push(n)})}return[c,n]};t.__cache={},t.version="0.6.15",t.settings={},t.documentHTML="",t.tags={operationOpen:"{@",operationClose:"}",interpolateOpen:"\\${",interpolateClose:"}",noneencodeOpen:"\\$\\${",noneencodeClose:"}",commentOpen:"\\{#",commentClose:"\\}"},t.options={cache:!0,strip:!0,errorhandling:!0,detection:!0,_method:i({__escapehtml:n,__throw:o,__juicer:t},{})},t.tagInit=function(){var e=t.tags.operationOpen+"each\\s*([^}]*?)\\s*as\\s*(\\w*?)\\s*(,\\s*\\w*?)?"+t.tags.operationClose,n=t.tags.operationOpen+"\\/each"+t.tags.operationClose,o=t.tags.operationOpen+"if\\s*([^}]*?)"+t.tags.operationClose,i=t.tags.operationOpen+"\\/if"+t.tags.operationClose,r=t.tags.operationOpen+"else"+t.tags.operationClose,s=t.tags.operationOpen+"else if\\s*([^}]*?)"+t.tags.operationClose,a=t.tags.interpolateOpen+"([\\s\\S]+?)"+t.tags.interpolateClose,c=t.tags.noneencodeOpen+"([\\s\\S]+?)"+t.tags.noneencodeClose,p=t.tags.commentOpen+"[^}]*?"+t.tags.commentClose,l=t.tags.operationOpen+"each\\s*(\\w*?)\\s*in\\s*range\\(([^}]+?)\\s*,\\s*([^}]+?)\\)"+t.tags.operationClose,u=t.tags.operationOpen+"include\\s*([^}]*?)\\s*,\\s*([^}]*?)"+t.tags.operationClose,g=t.tags.operationOpen+"helper\\s*([^}]*?)\\s*"+t.tags.operationClose,f="([\\s\\S]*?)",h=t.tags.operationOpen+"\\/helper"+t.tags.operationClose;t.settings.forstart=new RegExp(e,"igm"),t.settings.forend=new RegExp(n,"igm"),t.settings.ifstart=new RegExp(o,"igm"),t.settings.ifend=new RegExp(i,"igm"),t.settings.elsestart=new RegExp(r,"igm"),t.settings.elseifstart=new RegExp(s,"igm"),t.settings.interpolate=new RegExp(a,"igm"),t.settings.noneencode=new RegExp(c,"igm"),t.settings.inlinecomment=new RegExp(p,"igm"),t.settings.rangestart=new RegExp(l,"igm"),t.settings.include=new RegExp(u,"igm"),t.settings.helperRegister=new RegExp(g+f+h,"igm")},t.tagInit(),t.set=function(e,t){var n=this,o=function(e){return e.replace(/[\$\(\)\[\]\+\^\{\}\?\*\|\.]/gim,function(e){return"\\"+e})},i=function(e,t){var i=e.match(/^tag::(.*)$/i);return i?(n.tags[i[1]]=o(t),void n.tagInit()):void(n.options[e]=t)};if(2===arguments.length)return void i(e,t);if(e===Object(e))for(var r in e)e.hasOwnProperty(r)&&i(r,e[r])},t.register=function(e,t){var n=this.options._method;return n.hasOwnProperty(e)?!1:n[e]=t},t.unregister=function(e){var t=this.options._method;return t.hasOwnProperty(e)?delete t[e]:void 0},t.template=function(e){var n=this;this.options=e,this.__interpolate=function(e,t,n){var o,i=e.split("|"),r=i[0]||"";return i.length>1&&(e=i.shift(),o=i.shift().split(","),r="_method."+o.shift()+".call(this, "+[e].concat(o)+")"),"<%= "+(t?"_method.__escapehtml.escaping":"")+"("+(n&&n.detection===!1?"":"_method.__escapehtml.detection")+"("+r+")) %>"},this.__removeShell=function(e,o){var i=0;return e=e.replace(t.settings.helperRegister,function(e,n,o){var i=r(o),s=i[0],a=i[1],c=new Function(s.join(","),a);return t.register(n,c),e}).replace(t.settings.forstart,function(e,t,n,o){var n=n||"value",o=o&&o.substr(1),r="i"+i++;return"<% ~function() {for(var "+r+" in "+t+") {if("+t+".hasOwnProperty("+r+")) {var "+n+"="+t+"["+r+"];"+(o?"var "+o+"="+r+";":"")+" %>"}).replace(t.settings.forend,"<% }}}(); %>").replace(t.settings.ifstart,function(e,t){return"<% if("+t+") { %>"}).replace(t.settings.ifend,"<% } %>").replace(t.settings.elsestart,function(){return"<% } else { %>"}).replace(t.settings.elseifstart,function(e,t){return"<% } else if("+t+") { %>"}).replace(t.settings.noneencode,function(e,t){return n.__interpolate(t,!1,o)}).replace(t.settings.interpolate,function(e,t){return n.__interpolate(t,!0,o)}).replace(t.settings.inlinecomment,"").replace(t.settings.rangestart,function(e,t,n,o){var r="j"+i++;return"<% ~function() {for(var "+r+"="+n+";"+r+"<"+o+";"+r+"++) {{var "+t+"="+r+"; %>"}).replace(t.settings.include,function(e,t,n){return t.match(/^file\:\/\//gim)?e:"<%= _method.__juicer("+t+", "+n+"); %>"}),o&&o.errorhandling===!1||(e="<% try { %>"+e,e+='<% } catch(e) {_method.__throw("Juicer Render Exception: "+e.message);} %>'),e},this.__toNative=function(e,t){return this.__convert(e,!t||t.strip)},this.__lexicalAnalyze=function(e){var n=[],o=[],i="",r=["if","each","_","_method","console","break","case","catch","continue","debugger","default","delete","do","finally","for","function","in","instanceof","new","return","switch","this","throw","try","typeof","var","void","while","with","null","typeof","class","enum","export","extends","import","super","implements","interface","let","package","private","protected","public","static","yield","const","arguments","true","false","undefined","NaN"],s=function(e,t){if(Array.prototype.indexOf&&e.indexOf===Array.prototype.indexOf)return e.indexOf(t);for(var n=0;n<e.length;n++)if(e[n]===t)return n;return-1},a=function(e,i){if(i=i.match(/\w+/gim)[0],-1===s(n,i)&&-1===s(r,i)&&-1===s(o,i)){if("undefined"!=typeof window&&"function"==typeof window[i]&&window[i].toString().match(/^\s*?function \w+\(\) \{\s*?\[native code\]\s*?\}\s*?$/i))return e;if("undefined"!=typeof global&&"function"==typeof global[i]&&global[i].toString().match(/^\s*?function \w+\(\) \{\s*?\[native code\]\s*?\}\s*?$/i))return e;if("function"==typeof t.options._method[i]||t.options._method.hasOwnProperty(i))return o.push(i),e;if(i.match(/^\d+/gim))return e;n.push(i)}return e};e.replace(t.settings.forstart,a).replace(t.settings.interpolate,a).replace(t.settings.ifstart,a).replace(t.settings.elseifstart,a).replace(t.settings.include,a).replace(/[\+\-\*\/%!\?\|\^&~<>=,\(\)\[\]]\s*([A-Za-z_0-9]+)/gim,a);for(var c=0;c<n.length;c++)i+="var "+n[c]+"=_."+n[c]+";";for(var c=0;c<o.length;c++)i+="var "+o[c]+"=_method."+o[c]+";";return"<% "+i+" %>"},this.__convert=function(e,t){var n=[].join("");return n+="'use strict';",n+="var _=_||{};",n+="var _out='';_out+='",n+=t!==!1?e.replace(/\\/g,"\\\\").replace(/[\r\t\n]/g," ").replace(/'(?=[^%]*%>)/g,"	").split("'").join("\\'").split("	").join("'").replace(/<%=(.+?)%>/g,"';_out+=$1;_out+='").split("<%").join("';").split("%>").join("_out+='")+"';return _out;":e.replace(/\\/g,"\\\\").replace(/[\r]/g,"\\r").replace(/[\t]/g,"\\t").replace(/[\n]/g,"\\n").replace(/'(?=[^%]*%>)/g,"	").split("'").join("\\'").split("	").join("'").replace(/<%=(.+?)%>/g,"';_out+=$1;_out+='").split("<%").join("';").split("%>").join("_out+='")+"';return _out.replace(/[\\r\\n]\\s+[\\r\\n]/g, '\\r\\n');"},this.parse=function(e,t){var o=this;return t&&t.loose===!1||(e=this.__lexicalAnalyze(e)+e),e=this.__removeShell(e,t),e=this.__toNative(e,t),this._render=new Function("_, _method",e),this.render=function(e,t){return t&&t===n.options._method||(t=i(t,n.options._method)),o._render.call(this,e,t)},this}},t.compile=function(e,t){t&&t===this.options||(t=i(t,this.options));var n=this,r={get:function(e){return t.cachestore?t.cachestore.get(e):n.__cache[e]},set:function(e,o){return t.cachestore?t.cachestore.set(e,o):n.__cache[e]=o}};try{var s=r.get(e)?r.get(e):new this.template(this.options).parse(e,t);return t&&t.cache===!1||r.set(e,s),s}catch(a){return o("Juicer Compile Exception: "+a.message),{render:function(){}}}},t.to_html=function(e,t,n){return n&&n===this.options||(n=i(n,this.options)),this.compile(e,n).render(t,n._method)},"undefined"!=typeof global&&"undefined"==typeof window&&t.set("cache",!1),"undefined"!=typeof document&&document.body&&(t.documentHTML=document.body.innerHTML),e.juicer=t},"0.6.5-stable");