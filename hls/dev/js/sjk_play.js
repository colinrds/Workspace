/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return enableLogs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return logger; });
function noop() {}

const fakeLogger = {
  trace: noop,
  debug: noop,
  log: noop,
  warn: noop,
  info: noop,
  error: noop
};

let exportedLogger = fakeLogger;

/*globals self: false */

//let lastCallTime;
// function formatMsgWithTimeInfo(type, msg) {
//   const now = Date.now();
//   const diff = lastCallTime ? '+' + (now - lastCallTime) : '0';
//   lastCallTime = now;
//   msg = (new Date(now)).toISOString() + ' | [' +  type + '] > ' + msg + ' ( ' + diff + ' ms )';
//   return msg;
// }

function formatMsg(type, msg) {
  msg = '[' +  type + '] > ' + msg;
  return msg;
}

function consolePrintFn(type) {
  const func = self.console[type];
  if (func) {
    return function(...args) {
      if(args[0]) {
        args[0] = formatMsg(type, args[0]);
      }
      func.apply(self.console, args);
    };
  }
  return noop;
}

function exportLoggerFunctions(debugConfig, ...functions) {
  functions.forEach(function(type) {
    exportedLogger[type] = debugConfig[type] ? debugConfig[type].bind(debugConfig) : consolePrintFn(type);
  });
}

var enableLogs = function(debugConfig) {
  if (debugConfig === true || typeof debugConfig === 'object') {
    exportLoggerFunctions(debugConfig,
      // Remove out from list here to hard-disable a log-level
      //'trace',
      'debug',
      'log',
      'info',
      'warn',
      'error'
    );
    // Some browsers don't allow to use bind on console object anyway
    // fallback to default if needed
    try {
     exportedLogger.log();
    } catch (e) {
      exportedLogger = fakeLogger;
    }
  }
  else {
    exportedLogger = fakeLogger;
  }
};

var logger = exportedLogger;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = {
  // fired before MediaSource is attaching to media element - data: { media }
  MEDIA_ATTACHING: 'hlsMediaAttaching',
  // fired when MediaSource has been succesfully attached to media element - data: { }
  MEDIA_ATTACHED: 'hlsMediaAttached',
  // fired before detaching MediaSource from media element - data: { }
  MEDIA_DETACHING: 'hlsMediaDetaching',
  // fired when MediaSource has been detached from media element - data: { }
  MEDIA_DETACHED: 'hlsMediaDetached',
  // fired when we buffer is going to be reset - data: { }
  BUFFER_RESET: 'hlsBufferReset',
  // fired when we know about the codecs that we need buffers for to push into - data: {tracks : { container, codec, levelCodec, initSegment, metadata }}
  BUFFER_CODECS: 'hlsBufferCodecs',
  // fired when sourcebuffers have been created - data: { tracks : tracks }
  BUFFER_CREATED: 'hlsBufferCreated',
  // fired when we append a segment to the buffer - data: { segment: segment object }
  BUFFER_APPENDING: 'hlsBufferAppending',
  // fired when we are done with appending a media segment to the buffer - data : { parent : segment parent that triggered BUFFER_APPENDING, pending : nb of segments waiting for appending for this segment parent}
  BUFFER_APPENDED: 'hlsBufferAppended',
  // fired when the stream is finished and we want to notify the media buffer that there will be no more data - data: { }
  BUFFER_EOS: 'hlsBufferEos',
  // fired when the media buffer should be flushed - data { startOffset, endOffset }
  BUFFER_FLUSHING: 'hlsBufferFlushing',
  // fired when the media buffer has been flushed - data: { }
  BUFFER_FLUSHED: 'hlsBufferFlushed',
  // fired to signal that a manifest loading starts - data: { url : manifestURL}
  MANIFEST_LOADING: 'hlsManifestLoading',
  // fired after manifest has been loaded - data: { levels : [available quality levels], audioTracks : [ available audio tracks], url : manifestURL, stats : { trequest, tfirst, tload, mtime}}
  MANIFEST_LOADED: 'hlsManifestLoaded',
  // fired after manifest has been parsed - data: { levels : [available quality levels], firstLevel : index of first quality level appearing in Manifest}
  MANIFEST_PARSED: 'hlsManifestParsed',
  // fired when a level switch is requested - data: { level : id of new level } // deprecated in favor LEVEL_SWITCHING
  LEVEL_SWITCH: 'hlsLevelSwitch',
  // fired when a level switch is requested - data: { level : id of new level }
  LEVEL_SWITCHING: 'hlsLevelSwitching',
  // fired when a level switch is effective - data: { level : id of new level }
  LEVEL_SWITCHED: 'hlsLevelSwitched',
  // fired when a level playlist loading starts - data: { url : level URL, level : id of level being loaded}
  LEVEL_LOADING: 'hlsLevelLoading',
  // fired when a level playlist loading finishes - data: { details : levelDetails object, level : id of loaded level, stats : { trequest, tfirst, tload, mtime} }
  LEVEL_LOADED: 'hlsLevelLoaded',
  // fired when a level's details have been updated based on previous details, after it has been loaded - data: { details : levelDetails object, level : id of updated level }
  LEVEL_UPDATED: 'hlsLevelUpdated',
  // fired when a level's PTS information has been updated after parsing a fragment - data: { details : levelDetails object, level : id of updated level, drift: PTS drift observed when parsing last fragment }
  LEVEL_PTS_UPDATED: 'hlsLevelPtsUpdated',
  // fired to notify that audio track lists has been updated - data: { audioTracks : audioTracks }
  AUDIO_TRACKS_UPDATED: 'hlsAudioTracksUpdated',
  // fired when an audio track switch occurs - data: { id : audio track id } // deprecated in favor AUDIO_TRACK_SWITCHING
  AUDIO_TRACK_SWITCH: 'hlsAudioTrackSwitch',
  // fired when an audio track switching is requested - data: { id : audio track id }
  AUDIO_TRACK_SWITCHING: 'hlsAudioTrackSwitching',
  // fired when an audio track switch actually occurs - data: { id : audio track id }
  AUDIO_TRACK_SWITCHED: 'hlsAudioTrackSwitched',
  // fired when an audio track loading starts - data: { url : audio track URL, id : audio track id }
  AUDIO_TRACK_LOADING: 'hlsAudioTrackLoading',
  // fired when an audio track loading finishes - data: { details : levelDetails object, id : audio track id, stats : { trequest, tfirst, tload, mtime } }
  AUDIO_TRACK_LOADED: 'hlsAudioTrackLoaded',
  // fired to notify that subtitle track lists has been updated - data: { subtitleTracks : subtitleTracks }
  SUBTITLE_TRACKS_UPDATED: 'hlsSubtitleTracksUpdated',
  // fired when an subtitle track switch occurs - data: { id : subtitle track id }
  SUBTITLE_TRACK_SWITCH: 'hlsSubtitleTrackSwitch',
  // fired when a subtitle track loading starts - data: { url : subtitle track URL, id : subtitle track id }
  SUBTITLE_TRACK_LOADING: 'hlsSubtitleTrackLoading',
  // fired when a subtitle track loading finishes - data: { details : levelDetails object, id : subtitle track id, stats : { trequest, tfirst, tload, mtime } }
  SUBTITLE_TRACK_LOADED: 'hlsSubtitleTrackLoaded',
  // fired when a subtitle fragment has been processed - data: { success : boolean, frag : the processed frag }
  SUBTITLE_FRAG_PROCESSED: 'hlsSubtitleFragProcessed',
  // fired when the first timestamp is found - data: { id : demuxer id, initPTS: initPTS, frag : fragment object }
  INIT_PTS_FOUND: 'hlsInitPtsFound',
  // fired when a fragment loading starts - data: { frag : fragment object }
  FRAG_LOADING: 'hlsFragLoading',
  // fired when a fragment loading is progressing - data: { frag : fragment object, { trequest, tfirst, loaded } }
  FRAG_LOAD_PROGRESS: 'hlsFragLoadProgress',
  // Identifier for fragment load aborting for emergency switch down - data: { frag : fragment object }
  FRAG_LOAD_EMERGENCY_ABORTED: 'hlsFragLoadEmergencyAborted',
  // fired when a fragment loading is completed - data: { frag : fragment object, payload : fragment payload, stats : { trequest, tfirst, tload, length } }
  FRAG_LOADED: 'hlsFragLoaded',
  // fired when a fragment has finished decrypting - data: { id : demuxer id, frag: fragment object, stats : { tstart, tdecrypt } }
  FRAG_DECRYPTED: 'hlsFragDecrypted',
  // fired when Init Segment has been extracted from fragment - data: { id : demuxer id, frag: fragment object, moov : moov MP4 box, codecs : codecs found while parsing fragment }
  FRAG_PARSING_INIT_SEGMENT: 'hlsFragParsingInitSegment',
  // fired when parsing sei text is completed - data: { id : demuxer id, frag: fragment object, samples : [ sei samples pes ] }
  FRAG_PARSING_USERDATA: 'hlsFragParsingUserdata',
  // fired when parsing id3 is completed - data: { id : demuxer id, frag: fragment object, samples : [ id3 samples pes ] }
  FRAG_PARSING_METADATA: 'hlsFragParsingMetadata',
  // fired when data have been extracted from fragment - data: { id : demuxer id, frag: fragment object, data1 : moof MP4 box or TS fragments, data2 : mdat MP4 box or null}
  FRAG_PARSING_DATA: 'hlsFragParsingData',
  // fired when fragment parsing is completed - data: { id : demuxer id, frag: fragment object }
  FRAG_PARSED: 'hlsFragParsed',
  // fired when fragment remuxed MP4 boxes have all been appended into SourceBuffer - data: { id : demuxer id, frag : fragment object, stats : { trequest, tfirst, tload, tparsed, tbuffered, length, bwEstimate } }
  FRAG_BUFFERED: 'hlsFragBuffered',
  // fired when fragment matching with current media position is changing - data : { id : demuxer id, frag : fragment object }
  FRAG_CHANGED: 'hlsFragChanged',
  // Identifier for a FPS drop event - data: { curentDropped, currentDecoded, totalDroppedFrames }
  FPS_DROP: 'hlsFpsDrop',
  //triggered when FPS drop triggers auto level capping - data: { level, droppedlevel }
  FPS_DROP_LEVEL_CAPPING: 'hlsFpsDropLevelCapping',
  // Identifier for an error event - data: { type : error type, details : error details, fatal : if true, hls.js cannot/will not try to recover, if false, hls.js will try to recover,other error specific data }
  ERROR: 'hlsError',
  // fired when hls.js instance starts destroying. Different from MEDIA_DETACHED as one could want to detach and reattach a media to the instance of hls.js to handle mid-rolls for example - data: { }
  DESTROYING: 'hlsDestroying',
  // fired when a decrypt key loading starts - data: { frag : fragment object }
  KEY_LOADING: 'hlsKeyLoading',
  // fired when a decrypt key loading is completed - data: { frag : fragment object, payload : key payload, stats : { trequest, tfirst, tload, length } }
  KEY_LOADED: 'hlsKeyLoaded',
  // fired upon stream controller state transitions - data: { previousState, nextState }
  STREAM_STATE_TRANSITION: 'hlsStreamStateTransition'
};


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const ErrorTypes = {
  // Identifier for a network error (loading error / timeout ...)
  NETWORK_ERROR: 'networkError',
  // Identifier for a media Error (video/parsing/mediasource error)
  MEDIA_ERROR: 'mediaError',
  // Identifier for a mux Error (demuxing/remuxing)
  MUX_ERROR: 'muxError',
  // Identifier for all other errors
  OTHER_ERROR: 'otherError'
};
/* harmony export (immutable) */ __webpack_exports__["b"] = ErrorTypes;


const ErrorDetails = {
  // Identifier for a manifest load error - data: { url : faulty URL, response : { code: error code, text: error text }}
  MANIFEST_LOAD_ERROR: 'manifestLoadError',
  // Identifier for a manifest load timeout - data: { url : faulty URL, response : { code: error code, text: error text }}
  MANIFEST_LOAD_TIMEOUT: 'manifestLoadTimeOut',
  // Identifier for a manifest parsing error - data: { url : faulty URL, reason : error reason}
  MANIFEST_PARSING_ERROR: 'manifestParsingError',
  // Identifier for a manifest with only incompatible codecs error - data: { url : faulty URL, reason : error reason}
  MANIFEST_INCOMPATIBLE_CODECS_ERROR: 'manifestIncompatibleCodecsError',
  // Identifier for a level load error - data: { url : faulty URL, response : { code: error code, text: error text }}
  LEVEL_LOAD_ERROR: 'levelLoadError',
  // Identifier for a level load timeout - data: { url : faulty URL, response : { code: error code, text: error text }}
  LEVEL_LOAD_TIMEOUT: 'levelLoadTimeOut',
  // Identifier for a level switch error - data: { level : faulty level Id, event : error description}
  LEVEL_SWITCH_ERROR: 'levelSwitchError',
  // Identifier for an audio track load error - data: { url : faulty URL, response : { code: error code, text: error text }}
  AUDIO_TRACK_LOAD_ERROR: 'audioTrackLoadError',
  // Identifier for an audio track load timeout - data: { url : faulty URL, response : { code: error code, text: error text }}
  AUDIO_TRACK_LOAD_TIMEOUT: 'audioTrackLoadTimeOut',
  // Identifier for fragment load error - data: { frag : fragment object, response : { code: error code, text: error text }}
  FRAG_LOAD_ERROR: 'fragLoadError',
  // Identifier for fragment loop loading error - data: { frag : fragment object}
  FRAG_LOOP_LOADING_ERROR: 'fragLoopLoadingError',
  // Identifier for fragment load timeout error - data: { frag : fragment object}
  FRAG_LOAD_TIMEOUT: 'fragLoadTimeOut',
  // Identifier for a fragment decryption error event - data: {id : demuxer Id,frag: fragment object, reason : parsing error description }
  FRAG_DECRYPT_ERROR: 'fragDecryptError',
  // Identifier for a fragment parsing error event - data: { id : demuxer Id, reason : parsing error description }
  // will be renamed DEMUX_PARSING_ERROR and switched to MUX_ERROR in the next major release
  FRAG_PARSING_ERROR: 'fragParsingError',
  // Identifier for a remux alloc error event - data: { id : demuxer Id, frag : fragment object, bytes : nb of bytes on which allocation failed , reason : error text }
  REMUX_ALLOC_ERROR : 'remuxAllocError',
  // Identifier for decrypt key load error - data: { frag : fragment object, response : { code: error code, text: error text }}
  KEY_LOAD_ERROR: 'keyLoadError',
  // Identifier for decrypt key load timeout error - data: { frag : fragment object}
  KEY_LOAD_TIMEOUT: 'keyLoadTimeOut',
  // Triggered when an exception occurs while adding a sourceBuffer to MediaSource - data : {  err : exception , mimeType : mimeType }
  BUFFER_ADD_CODEC_ERROR: 'bufferAddCodecError',
  // Identifier for a buffer append error - data: append error description
  BUFFER_APPEND_ERROR: 'bufferAppendError',
  // Identifier for a buffer appending error event - data: appending error description
  BUFFER_APPENDING_ERROR: 'bufferAppendingError',
  // Identifier for a buffer stalled error event
  BUFFER_STALLED_ERROR: 'bufferStalledError',
  // Identifier for a buffer full event
  BUFFER_FULL_ERROR: 'bufferFullError',
  // Identifier for a buffer seek over hole event
  BUFFER_SEEK_OVER_HOLE: 'bufferSeekOverHole',
  // Identifier for a buffer nudge on stall (playback is stuck although currentTime is in a buffered area)
  BUFFER_NUDGE_ON_STALL : 'bufferNudgeOnStall',
  // Identifier for an internal exception happening inside hls.js while handling an event
  INTERNAL_EXCEPTION: 'internalException',
  // Malformed WebVTT contents
  WEBVTT_EXCEPTION: 'webVTTException'
};
/* harmony export (immutable) */ __webpack_exports__["a"] = ErrorDetails;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_logger__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__events__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__events__);
/*
*
* All objects in the event handling chain should inherit from this class
*
*/





class EventHandler {

  constructor(hls, ...events) {
    this.hls = hls;
    this.onEvent = this.onEvent.bind(this);
    this.handledEvents = events;
    this.useGenericHandler = true;

    this.registerListeners();
  }

  destroy() {
    this.unregisterListeners();
  }

  isEventHandler() {
    return typeof this.handledEvents === 'object' && this.handledEvents.length && typeof this.onEvent === 'function';
  }

  registerListeners() {
    if (this.isEventHandler()) {
      this.handledEvents.forEach(function(event) {
        if (event === 'hlsEventGeneric') {
          throw new Error('Forbidden event name: ' + event);
        }
        this.hls.on(event, this.onEvent);
      }, this);
    }
  }

  unregisterListeners() {
    if (this.isEventHandler()) {
      this.handledEvents.forEach(function(event) {
        this.hls.off(event, this.onEvent);
      }, this);
    }
  }

  /**
   * arguments: event (string), data (any)
   */
  onEvent(event, data) {
    this.onEventGeneric(event, data);
  }

  onEventGeneric(event, data) {
    var eventToFunction = function(event, data) {
      var funcName = 'on' + event.replace('hls', '');
      if (typeof this[funcName] !== 'function') {
        throw new Error(`Event ${event} has no generic handler in this ${this.constructor.name} class (tried ${funcName})`);
      }
      return this[funcName].bind(this, data);
    };
    try {
      eventToFunction.call(this, event, data).call();
    } catch (err) {
      __WEBPACK_IMPORTED_MODULE_0__utils_logger__["b" /* logger */].error(`internal error happened while processing ${event}:${err.message}`);
      this.hls.trigger(__WEBPACK_IMPORTED_MODULE_2__events___default.a.ERROR, {type: __WEBPACK_IMPORTED_MODULE_1__errors__["b" /* ErrorTypes */].OTHER_ERROR, details: __WEBPACK_IMPORTED_MODULE_1__errors__["a" /* ErrorDetails */].INTERNAL_EXCEPTION, fatal: false, event : event, err : err});
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (EventHandler);


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if(!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true,
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/**
 * Buffer Helper utils, providing methods dealing buffer length retrieval
*/

const BufferHelper = {
  isBuffered : function(media,position) {
    if (media) {
      let buffered = media.buffered;
      for (let i = 0; i < buffered.length; i++) {
        if (position >= buffered.start(i) && position <= buffered.end(i)) {
          return true;
        }
      }
    }
    return false;
  },

  bufferInfo : function(media, pos,maxHoleDuration) {
    if (media) {
      var vbuffered = media.buffered, buffered = [],i;
      for (i = 0; i < vbuffered.length; i++) {
        buffered.push({start: vbuffered.start(i), end: vbuffered.end(i)});
      }
      return this.bufferedInfo(buffered,pos,maxHoleDuration);
    } else {
      return {len: 0, start: pos, end: pos, nextStart : undefined} ;
    }
  },

  bufferedInfo : function(buffered,pos,maxHoleDuration) {
    var buffered2 = [],
        // bufferStart and bufferEnd are buffer boundaries around current video position
        bufferLen,bufferStart, bufferEnd,bufferStartNext,i;
    // sort on buffer.start/smaller end (IE does not always return sorted buffered range)
    buffered.sort(function (a, b) {
      var diff = a.start - b.start;
      if (diff) {
        return diff;
      } else {
        return b.end - a.end;
      }
    });
    // there might be some small holes between buffer time range
    // consider that holes smaller than maxHoleDuration are irrelevant and build another
    // buffer time range representations that discards those holes
    for (i = 0; i < buffered.length; i++) {
      var buf2len = buffered2.length;
      if(buf2len) {
        var buf2end = buffered2[buf2len - 1].end;
        // if small hole (value between 0 or maxHoleDuration ) or overlapping (negative)
        if((buffered[i].start - buf2end) < maxHoleDuration) {
          // merge overlapping time ranges
          // update lastRange.end only if smaller than item.end
          // e.g.  [ 1, 15] with  [ 2,8] => [ 1,15] (no need to modify lastRange.end)
          // whereas [ 1, 8] with  [ 2,15] => [ 1,15] ( lastRange should switch from [1,8] to [1,15])
          if(buffered[i].end > buf2end) {
            buffered2[buf2len - 1].end = buffered[i].end;
          }
        } else {
          // big hole
          buffered2.push(buffered[i]);
        }
      } else {
        // first value
        buffered2.push(buffered[i]);
      }
    }
    for (i = 0, bufferLen = 0, bufferStart = bufferEnd = pos; i < buffered2.length; i++) {
      var start =  buffered2[i].start,
          end = buffered2[i].end;
      //logger.log('buf start/end:' + buffered.start(i) + '/' + buffered.end(i));
      if ((pos + maxHoleDuration) >= start && pos < end) {
        // play position is inside this buffer TimeRange, retrieve end of buffer position and buffer length
        bufferStart = start;
        bufferEnd = end;
        bufferLen = bufferEnd - pos;
      } else if ((pos + maxHoleDuration) < start) {
        bufferStartNext = start;
        break;
      }
    }
    return {len: bufferLen, start: bufferStart, end: bufferEnd, nextStart : bufferStartNext};
  }
};

module.exports = BufferHelper;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

var BinarySearch = {
    /**
     * Searches for an item in an array which matches a certain condition.
     * This requires the condition to only match one item in the array,
     * and for the array to be ordered.
     *
     * @param {Array} list The array to search.
     * @param {Function} comparisonFunction
     *      Called and provided a candidate item as the first argument.
     *      Should return:
     *          > -1 if the item should be located at a lower index than the provided item.
     *          > 1 if the item should be located at a higher index than the provided item.
     *          > 0 if the item is the item you're looking for.
     *
     * @return {*} The object if it is found or null otherwise.
     */
    search: function(list, comparisonFunction) {
        var minIndex = 0;
        var maxIndex = list.length - 1;
        var currentIndex = null;
        var currentElement = null;
     
        while (minIndex <= maxIndex) {
            currentIndex = (minIndex + maxIndex) / 2 | 0;
            currentElement = list[currentIndex];
            
            var comparisonResult = comparisonFunction(currentElement);
            if (comparisonResult > 0) {
                minIndex = currentIndex + 1;
            }
            else if (comparisonResult < 0) {
                maxIndex = currentIndex - 1;
            }
            else {
                return currentElement;
            }
        }
     
        return null;
    }
};

module.exports = BinarySearch;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__events__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__events__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__crypt_decrypter__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__demux_aacdemuxer__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__demux_mp4demuxer__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__demux_tsdemuxer__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__demux_mp3demuxer__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__remux_mp4_remuxer__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__remux_passthrough_remuxer__ = __webpack_require__(37);
/*  inline demuxer.
 *   probe fragments and instantiate appropriate demuxer depending on content type (TSDemuxer, AACDemuxer, ...)
 */











class DemuxerInline {

  constructor(observer, typeSupported, config, vendor) {
    this.observer = observer;
    this.typeSupported = typeSupported;
    this.config = config;
    this.vendor = vendor;
  }

  destroy() {
    var demuxer = this.demuxer;
    if (demuxer) {
      demuxer.destroy();
    }
  }

  push(data, decryptdata, initSegment, audioCodec, videoCodec, timeOffset, discontinuity, trackSwitch, contiguous, duration, accurateTimeOffset, defaultInitPTS) {
    if ((data.byteLength > 0) && (decryptdata != null) && (decryptdata.key != null) && (decryptdata.method === 'AES-128')) {
      let decrypter = this.decrypter;
      if (decrypter == null) {
        decrypter = this.decrypter = new __WEBPACK_IMPORTED_MODULE_2__crypt_decrypter__["a" /* default */](this.observer, this.config);
      }
      var localthis = this;
      // performance.now() not available on WebWorker, at least on Safari Desktop
      var startTime;
      try {
        startTime = performance.now();
      } catch (error) {
        startTime = Date.now();
      }
      decrypter.decrypt(data, decryptdata.key.buffer, decryptdata.iv.buffer, function (decryptedData) {
        var endTime;
        try {
          endTime = performance.now();
        } catch (error) {
          endTime = Date.now();
        }
        localthis.observer.trigger(__WEBPACK_IMPORTED_MODULE_0__events___default.a.FRAG_DECRYPTED, { stats: { tstart: startTime, tdecrypt: endTime } });
        localthis.pushDecrypted(new Uint8Array(decryptedData), decryptdata, new Uint8Array(initSegment), audioCodec, videoCodec, timeOffset, discontinuity, trackSwitch, contiguous, duration, accurateTimeOffset, defaultInitPTS);
      });
    } else {
      this.pushDecrypted(new Uint8Array(data), decryptdata, new Uint8Array(initSegment), audioCodec, videoCodec, timeOffset, discontinuity, trackSwitch, contiguous, duration, accurateTimeOffset, defaultInitPTS);
    }
  }

  pushDecrypted(data, decryptdata, initSegment, audioCodec, videoCodec, timeOffset, discontinuity, trackSwitch, contiguous, duration, accurateTimeOffset, defaultInitPTS) {
    var demuxer = this.demuxer;
    if (!demuxer ||
      // in case of continuity change, we might switch from content type (AAC container to TS container for example)
      // so let's check that current demuxer is still valid
      (discontinuity && !this.probe(data))) {
      const observer = this.observer;
      const typeSupported = this.typeSupported;
      const config = this.config;
      // probing order is AAC/MP3/TS/MP4
      const muxConfig = [{ demux: __WEBPACK_IMPORTED_MODULE_3__demux_aacdemuxer__["a" /* default */], remux: __WEBPACK_IMPORTED_MODULE_7__remux_mp4_remuxer__["a" /* default */] },
      { demux: __WEBPACK_IMPORTED_MODULE_6__demux_mp3demuxer__["a" /* default */], remux: __WEBPACK_IMPORTED_MODULE_7__remux_mp4_remuxer__["a" /* default */] },
      { demux: __WEBPACK_IMPORTED_MODULE_5__demux_tsdemuxer__["a" /* default */], remux: __WEBPACK_IMPORTED_MODULE_7__remux_mp4_remuxer__["a" /* default */] },
      { demux: __WEBPACK_IMPORTED_MODULE_4__demux_mp4demuxer__["a" /* default */], remux: __WEBPACK_IMPORTED_MODULE_8__remux_passthrough_remuxer__["a" /* default */] }];

      // probe for content type
      for (let i = 0, len = muxConfig.length; i < len; i++) {
        const mux = muxConfig[i];
        const probe = mux.demux.probe;
        if (probe(data)) {
          const remuxer = this.remuxer = new mux.remux(observer, config, typeSupported, this.vendor);
          demuxer = new mux.demux(observer, remuxer, config, typeSupported);
          this.probe = probe;
          break;
        }
      }
      if (!demuxer) {
        observer.trigger(__WEBPACK_IMPORTED_MODULE_0__events___default.a.ERROR, { type: __WEBPACK_IMPORTED_MODULE_1__errors__["b" /* ErrorTypes */].MEDIA_ERROR, details: __WEBPACK_IMPORTED_MODULE_1__errors__["a" /* ErrorDetails */].FRAG_PARSING_ERROR, fatal: true, reason: 'no demux matching with content found' });
        return;
      }
      this.demuxer = demuxer;
    }
    const remuxer = this.remuxer;

    if (discontinuity || trackSwitch) {
      demuxer.resetInitSegment(initSegment, audioCodec, videoCodec, duration);
      remuxer.resetInitSegment();
    }
    if (discontinuity) {
      demuxer.resetTimeStamp(defaultInitPTS);
      remuxer.resetTimeStamp(defaultInitPTS);
    }
    if (typeof demuxer.setDecryptData === 'function') {
      demuxer.setDecryptData(decryptdata);
    }
    demuxer.append(data, timeOffset, contiguous, accurateTimeOffset);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (DemuxerInline);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__aes_crypto__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fast_aes_key__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__aes_decryptor__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__errors__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_logger__ = __webpack_require__(0);







/*globals self: false */

class Decrypter {
  constructor(observer,config) {
    this.observer = observer;
    this.config = config;
    this.logEnabled = true;
    try {
      const browserCrypto = crypto ? crypto : self.crypto;
      this.subtle = browserCrypto.subtle || browserCrypto.webkitSubtle;
    } catch (e) {}
    this.disableWebCrypto = !this.subtle;
  }

  isSync() {
    return (this.disableWebCrypto && this.config.enableSoftwareAES);
  }

  decrypt(data, key, iv, callback) {
    if (this.disableWebCrypto && this.config.enableSoftwareAES) {
      if (this.logEnabled) {
        __WEBPACK_IMPORTED_MODULE_4__utils_logger__["b" /* logger */].log('JS AES decrypt');
        this.logEnabled = false;
      }
      let decryptor = this.decryptor;
      if (!decryptor) {
        this.decryptor = decryptor = new __WEBPACK_IMPORTED_MODULE_2__aes_decryptor__["a" /* default */]();
      }
      decryptor.expandKey(key);
      callback(decryptor.decrypt(data, 0, iv));
    }
    else {
      if (this.logEnabled) {
        __WEBPACK_IMPORTED_MODULE_4__utils_logger__["b" /* logger */].log('WebCrypto AES decrypt');
        this.logEnabled = false;
      }
      const subtle = this.subtle;
      if (this.key !== key) {
        this.key = key;
        this.fastAesKey = new __WEBPACK_IMPORTED_MODULE_1__fast_aes_key__["a" /* default */](subtle,key);
      }

      this.fastAesKey.expandKey().
        then((aesKey) => {
          // decrypt using web crypto
          let crypto = new __WEBPACK_IMPORTED_MODULE_0__aes_crypto__["a" /* default */](subtle,iv);
          crypto.decrypt(data, aesKey).
          catch ((err) => {
            this.onWebCryptoError(err, data, key, iv, callback);
          }).
          then((result) => {
            callback(result);
          });
        }).
        catch ((err) => {
          this.onWebCryptoError(err, data, key, iv, callback);
        });
    }
  }

  onWebCryptoError(err, data, key, iv, callback) {
    if (this.config.enableSoftwareAES) {
      __WEBPACK_IMPORTED_MODULE_4__utils_logger__["b" /* logger */].log('WebCrypto Error, disable WebCrypto API');
      this.disableWebCrypto = true;
      this.logEnabled = true;
      this.decrypt(data, key, iv, callback);
    }
    else {
      __WEBPACK_IMPORTED_MODULE_4__utils_logger__["b" /* logger */].error(`decrypting error : ${err.message}`);
      this.observer.trigger(Event.ERROR, {type : __WEBPACK_IMPORTED_MODULE_3__errors__["b" /* ErrorTypes */].MEDIA_ERROR, details : __WEBPACK_IMPORTED_MODULE_3__errors__["a" /* ErrorDetails */].FRAG_DECRYPT_ERROR, fatal : true, reason : err.message});
    }
  }

  destroy() {
    let decryptor = this.decryptor;
    if (decryptor) {
      decryptor.destroy();
      this.decryptor = undefined;
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Decrypter);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_logger__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors__ = __webpack_require__(2);
/**
 *  ADTS parser helper
 */



const ADTS = {
  getAudioConfig: function (observer, data, offset, audioCodec) {
    var adtsObjectType, // :int
      adtsSampleingIndex, // :int
      adtsExtensionSampleingIndex, // :int
      adtsChanelConfig, // :int
      config,
      userAgent = navigator.userAgent.toLowerCase(),
      manifestCodec = audioCodec,
      adtsSampleingRates = [
        96000, 88200,
        64000, 48000,
        44100, 32000,
        24000, 22050,
        16000, 12000,
        11025, 8000,
        7350];
    // byte 2
    adtsObjectType = ((data[offset + 2] & 0xC0) >>> 6) + 1;
    adtsSampleingIndex = ((data[offset + 2] & 0x3C) >>> 2);
    if (adtsSampleingIndex > adtsSampleingRates.length - 1) {
      observer.trigger(Event.ERROR, { type: __WEBPACK_IMPORTED_MODULE_1__errors__["b" /* ErrorTypes */].MEDIA_ERROR, details: __WEBPACK_IMPORTED_MODULE_1__errors__["a" /* ErrorDetails */].FRAG_PARSING_ERROR, fatal: true, reason: `invalid ADTS sampling index:${adtsSampleingIndex}` });
      return;
    }
    adtsChanelConfig = ((data[offset + 2] & 0x01) << 2);
    // byte 3
    adtsChanelConfig |= ((data[offset + 3] & 0xC0) >>> 6);
    __WEBPACK_IMPORTED_MODULE_0__utils_logger__["b" /* logger */].log(`manifest codec:${audioCodec},ADTS data:type:${adtsObjectType},sampleingIndex:${adtsSampleingIndex}[${adtsSampleingRates[adtsSampleingIndex]}Hz],channelConfig:${adtsChanelConfig}`);
    // firefox: freq less than 24kHz = AAC SBR (HE-AAC)
    if (/firefox/i.test(userAgent)) {
      if (adtsSampleingIndex >= 6) {
        adtsObjectType = 5;
        config = new Array(4);
        // HE-AAC uses SBR (Spectral Band Replication) , high frequencies are constructed from low frequencies
        // there is a factor 2 between frame sample rate and output sample rate
        // multiply frequency by 2 (see table below, equivalent to substract 3)
        adtsExtensionSampleingIndex = adtsSampleingIndex - 3;
      } else {
        adtsObjectType = 2;
        config = new Array(2);
        adtsExtensionSampleingIndex = adtsSampleingIndex;
      }
      // Android : always use AAC
    } else if (userAgent.indexOf('android') !== -1) {
      adtsObjectType = 2;
      config = new Array(2);
      adtsExtensionSampleingIndex = adtsSampleingIndex;
    } else {
      /*  for other browsers (Chrome/Vivaldi/Opera ...)
          always force audio type to be HE-AAC SBR, as some browsers do not support audio codec switch properly (like Chrome ...)
      */
      adtsObjectType = 5;
      config = new Array(4);
      // if (manifest codec is HE-AAC or HE-AACv2) OR (manifest codec not specified AND frequency less than 24kHz)
      if ((audioCodec && ((audioCodec.indexOf('mp4a.40.29') !== -1) ||
        (audioCodec.indexOf('mp4a.40.5') !== -1))) ||
        (!audioCodec && adtsSampleingIndex >= 6)) {
        // HE-AAC uses SBR (Spectral Band Replication) , high frequencies are constructed from low frequencies
        // there is a factor 2 between frame sample rate and output sample rate
        // multiply frequency by 2 (see table below, equivalent to substract 3)
        adtsExtensionSampleingIndex = adtsSampleingIndex - 3;
      } else {
        // if (manifest codec is AAC) AND (frequency less than 24kHz AND nb channel is 1) OR (manifest codec not specified and mono audio)
        // Chrome fails to play back with low frequency AAC LC mono when initialized with HE-AAC.  This is not a problem with stereo.
        if (audioCodec && audioCodec.indexOf('mp4a.40.2') !== -1 && (adtsSampleingIndex >= 6 && adtsChanelConfig === 1) ||
          (!audioCodec && adtsChanelConfig === 1)) {
          adtsObjectType = 2;
          config = new Array(2);
        }
        adtsExtensionSampleingIndex = adtsSampleingIndex;
      }
    }
    /* refer to http://wiki.multimedia.cx/index.php?title=MPEG-4_Audio#Audio_Specific_Config
        ISO 14496-3 (AAC).pdf - Table 1.13 — Syntax of AudioSpecificConfig()
      Audio Profile / Audio Object Type
      0: Null
      1: AAC Main
      2: AAC LC (Low Complexity)
      3: AAC SSR (Scalable Sample Rate)
      4: AAC LTP (Long Term Prediction)
      5: SBR (Spectral Band Replication)
      6: AAC Scalable
     sampling freq
      0: 96000 Hz
      1: 88200 Hz
      2: 64000 Hz
      3: 48000 Hz
      4: 44100 Hz
      5: 32000 Hz
      6: 24000 Hz
      7: 22050 Hz
      8: 16000 Hz
      9: 12000 Hz
      10: 11025 Hz
      11: 8000 Hz
      12: 7350 Hz
      13: Reserved
      14: Reserved
      15: frequency is written explictly
      Channel Configurations
      These are the channel configurations:
      0: Defined in AOT Specifc Config
      1: 1 channel: front-center
      2: 2 channels: front-left, front-right
    */
    // audioObjectType = profile => profile, the MPEG-4 Audio Object Type minus 1
    config[0] = adtsObjectType << 3;
    // samplingFrequencyIndex
    config[0] |= (adtsSampleingIndex & 0x0E) >> 1;
    config[1] |= (adtsSampleingIndex & 0x01) << 7;
    // channelConfiguration
    config[1] |= adtsChanelConfig << 3;
    if (adtsObjectType === 5) {
      // adtsExtensionSampleingIndex
      config[1] |= (adtsExtensionSampleingIndex & 0x0E) >> 1;
      config[2] = (adtsExtensionSampleingIndex & 0x01) << 7;
      // adtsObjectType (force to 2, chrome is checking that object type is less than 5 ???
      //    https://chromium.googlesource.com/chromium/src.git/+/master/media/formats/mp4/aac.cc
      config[2] |= 2 << 2;
      config[3] = 0;
    }
    return { config: config, samplerate: adtsSampleingRates[adtsSampleingIndex], channelCount: adtsChanelConfig, codec: ('mp4a.40.' + adtsObjectType), manifestCodec: manifestCodec };
  },

  isHeaderPattern: function (data, offset) {
    return data[offset] === 0xff && (data[offset + 1] & 0xf6) === 0xf0;
  },

  getHeaderLength: function (data, offset) {
    return (!!(data[offset + 1] & 0x01) ? 7 : 9);
  },

  getFullFrameLength: function (data, offset) {
    return ((data[offset + 3] & 0x03) << 11) |
      (data[offset + 4] << 3) |
      ((data[offset + 5] & 0xE0) >>> 5);
  },

  isHeader: function (data, offset) {
    // Look for ADTS header | 1111 1111 | 1111 X00X | where X can be either 0 or 1
    // Layer bits (position 14 and 15) in header should be always 0 for ADTS
    // More info https://wiki.multimedia.cx/index.php?title=ADTS
    if (offset + 1 < data.length && this.isHeaderPattern(data, offset)) {
      return true;
    }
    return false;
  },

  probe: function (data, offset) {
    // same as isHeader but we also check that ADTS frame follows last ADTS frame 
    // or end of data is reached
    if (offset + 1 < data.length && this.isHeaderPattern(data, offset)) {
      // ADTS header Length
      let headerLength = this.getHeaderLength(data, offset);
      // ADTS frame Length
      let frameLength = headerLength;
      if (offset + 5 < data.length) {
        frameLength = this.getFullFrameLength(data, offset);
      }
      let newOffset = offset + frameLength;
      if (newOffset === data.length || (newOffset + 1 < data.length && this.isHeaderPattern(data, newOffset))) {
        return true;
      }
    }
    return false;
  },

  initTrackConfig: function (track, observer, data, offset, audioCodec) {
    if (!track.samplerate) {
      var config = this.getAudioConfig(observer, data, offset, audioCodec);
      track.config = config.config;
      track.samplerate = config.samplerate;
      track.channelCount = config.channelCount;
      track.codec = config.codec;
      track.manifestCodec = config.manifestCodec;
      __WEBPACK_IMPORTED_MODULE_0__utils_logger__["b" /* logger */].log(`parsed codec:${track.codec},rate:${config.samplerate},nb channel:${config.channelCount}`);
    }
  },

  getFrameDuration: function (samplerate) {
    return 1024 * 90000 / samplerate;
  },

  appendFrame: function (track, data, offset, pts, frameIndex) {
    var frameDuration = this.getFrameDuration(track.samplerate);
    var header = this.parseFrameHeader(data, offset, pts, frameIndex, frameDuration);
    if (header) {
      var stamp = header.stamp;
      var headerLength = header.headerLength;
      var frameLength = header.frameLength;

      //logger.log(`AAC frame, offset/length/total/pts:${offset+headerLength}/${frameLength}/${data.byteLength}/${(stamp/90).toFixed(0)}`);
      var aacSample = { unit: data.subarray(offset + headerLength, offset + headerLength + frameLength), pts: stamp, dts: stamp };

      track.samples.push(aacSample);
      track.len += frameLength;

      return { sample: aacSample, length: frameLength + headerLength };
    }

    return undefined;
  },

  parseFrameHeader: function (data, offset, pts, frameIndex, frameDuration) {
    var headerLength, frameLength, stamp;
    var length = data.length;

    // The protection skip bit tells us if we have 2 bytes of CRC data at the end of the ADTS header
    headerLength = this.getHeaderLength(data, offset);
    // retrieve frame size
    frameLength = this.getFullFrameLength(data, offset);
    frameLength -= headerLength;

    if ((frameLength > 0) && ((offset + headerLength + frameLength) <= length)) {
      stamp = pts + frameIndex * frameDuration;
      //logger.log(`AAC frame, offset/length/total/pts:${offset+headerLength}/${frameLength}/${data.byteLength}/${(stamp/90).toFixed(0)}`);
      return { headerLength, frameLength, stamp };
    }

    return undefined;
  }
};

module.exports = ADTS;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(4)(module)))

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * ID3 parser
 */
 class ID3 {
  /**
   * Returns true if an ID3 header can be found at offset in data
   * @param {Uint8Array} data - The data to search in
   * @param {number} offset - The offset at which to start searching
   * @return {boolean} - True if an ID3 header is found
   */
  static isHeader(data, offset) {
    /*
    * http://id3.org/id3v2.3.0
    * [0]     = 'I'
    * [1]     = 'D'
    * [2]     = '3'
    * [3,4]   = {Version}
    * [5]     = {Flags}
    * [6-9]   = {ID3 Size}
    *
    * An ID3v2 tag can be detected with the following pattern:
    *  $49 44 33 yy yy xx zz zz zz zz
    * Where yy is less than $FF, xx is the 'flags' byte and zz is less than $80
    */
    if (offset + 10 <= data.length) {
      //look for 'ID3' identifier
      if (data[offset] === 0x49 && data[offset+1] === 0x44 && data[offset+2] === 0x33) {
        //check version is within range
        if (data[offset+3] < 0xFF && data[offset+4] < 0xFF) {
          //check size is within range
          if (data[offset+6] < 0x80 && data[offset+7] < 0x80 && data[offset+8] < 0x80 && data[offset+9] < 0x80) {
            return true;
          }
        }
      }
    }

    return false;
  }

  /**
   * Returns true if an ID3 footer can be found at offset in data
   * @param {Uint8Array} data - The data to search in
   * @param {number} offset - The offset at which to start searching
   * @return {boolean} - True if an ID3 footer is found
   */
  static isFooter(data, offset) {
    /*
    * The footer is a copy of the header, but with a different identifier
    */
    if (offset + 10 <= data.length) {
      //look for '3DI' identifier
      if (data[offset] === 0x33 && data[offset+1] === 0x44 && data[offset+2] === 0x49) {
        //check version is within range
        if (data[offset+3] < 0xFF && data[offset+4] < 0xFF) {
          //check size is within range
          if (data[offset+6] < 0x80 && data[offset+7] < 0x80 && data[offset+8] < 0x80 && data[offset+9] < 0x80) {
            return true;
          }
        }
      }
    }

    return false;
  }

  /**
   * Returns any adjacent ID3 tags found in data starting at offset, as one block of data
   * @param {Uint8Array} data - The data to search in
   * @param {number} offset - The offset at which to start searching
   * @return {Uint8Array} - The block of data containing any ID3 tags found
   */
  static getID3Data(data, offset) {
    const front = offset;
    let length = 0;

    while (ID3.isHeader(data, offset)) {
      //ID3 header is 10 bytes
      length += 10;

      const size = ID3._readSize(data, offset + 6);
      length += size;

      if (ID3.isFooter(data, offset + 10)) {
        //ID3 footer is 10 bytes
        length += 10;
      }

      offset += length;
    }

    if (length > 0) {
      return data.subarray(front, front + length);
    }

    return undefined;
  }

  static _readSize(data, offset) {
    let size = 0;
    size  = ((data[offset]   & 0x7f) << 21);
    size |= ((data[offset+1] & 0x7f) << 14);
    size |= ((data[offset+2] & 0x7f) << 7);
    size |=  (data[offset+3] & 0x7f);
    return size;
  }

  /**
   * Searches for the Elementary Stream timestamp found in the ID3 data chunk
   * @param {Uint8Array} data - Block of data containing one or more ID3 tags
   * @return {number} - The timestamp
   */
  static getTimeStamp(data) {
    const frames = ID3.getID3Frames(data);
    for(let i = 0; i < frames.length; i++) {
      const frame = frames[i];
      if (ID3.isTimeStampFrame(frame)) {
        return ID3._readTimeStamp(frame);
      }
    }

    return undefined;
  }

  /**
   * Returns true if the ID3 frame is an Elementary Stream timestamp frame
   * @param {ID3 frame} frame
   */
  static isTimeStampFrame(frame) {
    return (frame && frame.key === 'PRIV' && frame.info === 'com.apple.streaming.transportStreamTimestamp');
  }

  static _getFrameData(data) {
    /*
    Frame ID       $xx xx xx xx (four characters)
    Size           $xx xx xx xx
    Flags          $xx xx
    */
    const type = String.fromCharCode(data[0], data[1], data[2], data[3]);
    const size = ID3._readSize(data, 4);

    //skip frame id, size, and flags
    let offset = 10;

    return { type, size, data: data.subarray(offset, offset + size) };
  }

  /**
   * Returns an array of ID3 frames found in all the ID3 tags in the id3Data
   * @param {Uint8Array} id3Data - The ID3 data containing one or more ID3 tags
   * @return {ID3 frame[]} - Array of ID3 frame objects
   */
  static getID3Frames(id3Data) {
    let offset = 0;
    const frames = [];

    while (ID3.isHeader(id3Data, offset)) {
      const size = ID3._readSize(id3Data, offset + 6);
      //skip past ID3 header
      offset += 10;
      const end = offset + size;
      //loop through frames in the ID3 tag
      while (offset + 8 < end) {
        const frameData = ID3._getFrameData(id3Data.subarray(offset));
        const frame = ID3._decodeFrame(frameData);
        if (frame) {
          frames.push(frame);
        }
        //skip frame header and frame data
        offset += frameData.size + 10;
      }

      if (ID3.isFooter(id3Data, offset)) {
        offset += 10;
      }
    }

    return frames;
  }

  static _decodeFrame(frame) {
    if (frame.type === 'PRIV') {
      return ID3._decodePrivFrame(frame);
    } else if (frame.type[0] === 'T') {
      return ID3._decodeTextFrame(frame);
    } else if (frame.type[0] === 'W') {
      return ID3._decodeURLFrame(frame);
    }

    return undefined;
  }

  static _readTimeStamp(timeStampFrame) {
    if (timeStampFrame.data.byteLength === 8) {
      const data = new Uint8Array(timeStampFrame.data);
      // timestamp is 33 bit expressed as a big-endian eight-octet number,
      // with the upper 31 bits set to zero.
      const pts33Bit = data[3] & 0x1;
      let timestamp = (data[4] << 23) +
                      (data[5] << 15) +
                      (data[6] <<  7) +
                       data[7];
      timestamp /= 45;

      if (pts33Bit) {
        timestamp += 47721858.84; // 2^32 / 90
      }

      return Math.round(timestamp);
    }

    return undefined;
  }

  static _decodePrivFrame(frame) {
    /*
    Format: <text string>\0<binary data>
    */
    if (frame.size < 2) {
      return undefined;
    }

    const owner = ID3._utf8ArrayToStr(frame.data);
    const privateData = new Uint8Array(frame.data.subarray(owner.length + 1));

    return { key: frame.type, info: owner, data: privateData.buffer };
  }

  static _decodeTextFrame(frame) {
    if (frame.size < 2) {
      return undefined;
    }

    if (frame.type === 'TXXX') {
      /*
      Format:
      [0]   = {Text Encoding}
      [1-?] = {Description}\0{Value}
      */
      let index = 1;
      const description = ID3._utf8ArrayToStr(frame.data.subarray(index));

      index += description.length + 1;
      const value = ID3._utf8ArrayToStr(frame.data.subarray(index));

      return { key: frame.type, info: description, data: value };
    } else {
      /*
      Format:
      [0]   = {Text Encoding}
      [1-?] = {Value}
      */
      const text = ID3._utf8ArrayToStr(frame.data.subarray(1));
      return { key: frame.type, data: text };
    }
  }

  static _decodeURLFrame(frame) {
    if (frame.type === 'WXXX') {
      /*
      Format:
      [0]   = {Text Encoding}
      [1-?] = {Description}\0{URL}
      */
      if (frame.size < 2) {
        return undefined;
      }

      let index = 1;
      const description = ID3._utf8ArrayToStr(frame.data.subarray(index));

      index += description.length + 1;
      const value = ID3._utf8ArrayToStr(frame.data.subarray(index));

      return { key: frame.type, info: description, data: value };
    } else {
      /*
      Format:
      [0-?] = {URL}
      */
      const url = ID3._utf8ArrayToStr(frame.data);
      return { key: frame.type, data: url };
    }
  }

  // http://stackoverflow.com/questions/8936984/uint8array-to-string-in-javascript/22373197
  // http://www.onicos.com/staff/iz/amuse/javascript/expert/utf.txt
  /* utf.js - UTF-8 <=> UTF-16 convertion
   *
   * Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
   * Version: 1.0
   * LastModified: Dec 25 1999
   * This library is free.  You can redistribute it and/or modify it.
   */
  static _utf8ArrayToStr(array) {

    let char2;
    let char3;
    let out = '';
    let i = 0;
    let length = array.length;

    while (i < length) {
      let c = array[i++];
      switch (c >> 4) {
        case 0:
          return out;
        case 1: case 2: case 3: case 4: case 5: case 6: case 7:
          // 0xxxxxxx
          out += String.fromCharCode(c);
          break;
        case 12: case 13:
          // 110x xxxx   10xx xxxx
          char2 = array[i++];
          out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
          break;
        case 14:
          // 1110 xxxx  10xx xxxx  10xx xxxx
          char2 = array[i++];
          char3 = array[i++];
          out += String.fromCharCode(((c & 0x0F) << 12) |
            ((char2 & 0x3F) << 6) |
            ((char3 & 0x3F) << 0));
          break;
      }
    }

    return out;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (ID3);


/***/ }),
/* 11 */
/***/ (function(module, exports) {

/**
 *  MPEG parser helper
 */

const MpegAudio = {

    BitratesMap: [
        32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448,
        32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384,
        32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320,
        32, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 224, 256,
        8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160],

    SamplingRateMap: [44100, 48000, 32000, 22050, 24000, 16000, 11025, 12000, 8000],

    appendFrame: function (track, data, offset, pts, frameIndex) {
        // Using http://www.datavoyage.com/mpgscript/mpeghdr.htm as a reference
        if (offset + 24 > data.length) {
            return undefined;
        }

        var header = this.parseHeader(data, offset);
        if (header && offset + header.frameLength <= data.length) {
            var frameDuration = 1152 * 90000 / header.sampleRate;
            var stamp = pts + frameIndex * frameDuration;
            var sample = { unit: data.subarray(offset, offset + header.frameLength), pts: stamp, dts: stamp };

            track.config = [];
            track.channelCount = header.channelCount;
            track.samplerate = header.sampleRate;
            track.samples.push(sample);
            track.len += header.frameLength;

            return { sample, length: header.frameLength };
        }

        return undefined;
    },

    parseHeader: function (data, offset) {
        var headerB = (data[offset + 1] >> 3) & 3;
        var headerC = (data[offset + 1] >> 1) & 3;
        var headerE = (data[offset + 2] >> 4) & 15;
        var headerF = (data[offset + 2] >> 2) & 3;
        var headerG = !!(data[offset + 2] & 2);
        if (headerB !== 1 && headerE !== 0 && headerE !== 15 && headerF !== 3) {
            var columnInBitrates = headerB === 3 ? (3 - headerC) : (headerC === 3 ? 3 : 4);
            var bitRate = MpegAudio.BitratesMap[columnInBitrates * 14 + headerE - 1] * 1000;
            var columnInSampleRates = headerB === 3 ? 0 : headerB === 2 ? 1 : 2;
            var sampleRate = MpegAudio.SamplingRateMap[columnInSampleRates * 3 + headerF];
            var padding = headerG ? 1 : 0;
            var channelCount = data[offset + 3] >> 6 === 3 ? 1 : 2; // If bits of channel mode are `11` then it is a single channel (Mono)
            var frameLength = headerC === 3 ?
                ((headerB === 3 ? 12 : 6) * bitRate / sampleRate + padding) << 2 :
                ((headerB === 3 ? 144 : 72) * bitRate / sampleRate + padding) | 0;

            return { sampleRate, channelCount, frameLength };
        }

        return undefined;
    },

    isHeaderPattern: function (data, offset) {
        return data[offset] === 0xff && (data[offset + 1] & 0xe0) === 0xe0 && (data[offset + 1] & 0x06) !== 0x00;
    },

    isHeader: function (data, offset) {
        // Look for MPEG header | 1111 1111 | 111X XYZX | where X can be either 0 or 1 and Y or Z should be 1
        // Layer bits (position 14 and 15) in header should be always different from 0 (Layer I or Layer II or Layer III)
        // More info http://www.mp3-tech.org/programmer/frame_header.html
        if (offset + 1 < data.length && this.isHeaderPattern(data, offset)) {
            return true;
        }
        return false;
    },

    probe: function (data, offset) {
        // same as isHeader but we also check that MPEG frame follows last MPEG frame 
        // or end of data is reached
        if (offset + 1 < data.length && this.isHeaderPattern(data, offset)) {
            // MPEG header Length
            let headerLength = 4;
            // MPEG frame Length
            let header = this.parseHeader(data, offset);
            let frameLength = headerLength;
            if (header && header.frameLength) {
                frameLength = header.frameLength;
            }
            let newOffset = offset + frameLength;
            if (newOffset === data.length || (newOffset + 1 < data.length && this.isHeaderPattern(data, newOffset))) {
                return true;
            }
        }
        return false;
    }
};

module.exports = MpegAudio;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return fixLineBreaks; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vttcue__ = __webpack_require__(43);
/*
 * Source: https://github.com/mozilla/vtt.js/blob/master/dist/vtt.js#L1716
 */



const StringDecoder = function StringDecoder() {
  return {
    decode: function(data) {
      if (!data) {
        return '';
      }
      if (typeof data !== 'string') {
        throw new Error('Error - expected string data.');
      }
      return decodeURIComponent(encodeURIComponent(data));
        },
    };
  };

function VTTParser() {
    this.window = window;
    this.state = 'INITIAL';
    this.buffer = '';
    this.decoder = new StringDecoder();
    this.regionList = [];
}


// Try to parse input as a time stamp.
function parseTimeStamp(input) {

  function computeSeconds(h, m, s, f) {
    return (h | 0) * 3600 + (m | 0) * 60 + (s | 0) + (f | 0) / 1000;
  }

  var m = input.match(/^(\d+):(\d{2})(:\d{2})?\.(\d{3})/);
  if (!m) {
    return null;
  }

  if (m[3]) {
    // Timestamp takes the form of [hours]:[minutes]:[seconds].[milliseconds]
    return computeSeconds(m[1], m[2], m[3].replace(':', ''), m[4]);
  } else if (m[1] > 59) {
    // Timestamp takes the form of [hours]:[minutes].[milliseconds]
    // First position is hours as it's over 59.
    return computeSeconds(m[1], m[2], 0, m[4]);
  } else {
    // Timestamp takes the form of [minutes]:[seconds].[milliseconds]
    return computeSeconds(0, m[1], m[2], m[4]);
  }
}

// A settings object holds key/value pairs and will ignore anything but the first
// assignment to a specific key.
function Settings() {
  this.values = Object.create(null);
}

Settings.prototype = {
  // Only accept the first assignment to any key.
  set: function(k, v) {
    if (!this.get(k) && v !== '') {
      this.values[k] = v;
    }
  },
  // Return the value for a key, or a default value.
  // If 'defaultKey' is passed then 'dflt' is assumed to be an object with
  // a number of possible default values as properties where 'defaultKey' is
  // the key of the property that will be chosen; otherwise it's assumed to be
  // a single value.
  get: function(k, dflt, defaultKey) {
    if (defaultKey) {
      return this.has(k) ? this.values[k] : dflt[defaultKey];
    }
    return this.has(k) ? this.values[k] : dflt;
  },
  // Check whether we have a value for a key.
  has: function(k) {
    return k in this.values;
  },
  // Accept a setting if its one of the given alternatives.
  alt: function(k, v, a) {
    for (var n = 0; n < a.length; ++n) {
      if (v === a[n]) {
        this.set(k, v);
        break;
      }
    }
  },
  // Accept a setting if its a valid (signed) integer.
  integer: function(k, v) {
    if (/^-?\d+$/.test(v)) { // integer
      this.set(k, parseInt(v, 10));
    }
  },
  // Accept a setting if its a valid percentage.
  percent: function(k, v) {
    var m;
    if ((m = v.match(/^([\d]{1,3})(\.[\d]*)?%$/))) {
      v = parseFloat(v);
      if (v >= 0 && v <= 100) {
        this.set(k, v);
        return true;
      }
    }
    return false;
  }
};

// Helper function to parse input into groups separated by 'groupDelim', and
// interprete each group as a key/value pair separated by 'keyValueDelim'.
function parseOptions(input, callback, keyValueDelim, groupDelim) {
  var groups = groupDelim ? input.split(groupDelim) : [input];
  for (var i in groups) {
    if (typeof groups[i] !== 'string') {
      continue;
    }
    var kv = groups[i].split(keyValueDelim);
    if (kv.length !== 2) {
      continue;
    }
    var k = kv[0];
    var v = kv[1];
    callback(k, v);
  }
}

var defaults = new __WEBPACK_IMPORTED_MODULE_0__vttcue__["a" /* default */](0, 0, 0);
// 'middle' was changed to 'center' in the spec: https://github.com/w3c/webvtt/pull/244
// Chrome and Safari don't yet support this change, but FF does
var center = defaults.align === 'middle' ? 'middle' : 'center';

function parseCue(input, cue, regionList) {
  // Remember the original input if we need to throw an error.
  var oInput = input;
  // 4.1 WebVTT timestamp
  function consumeTimeStamp() {
    var ts = parseTimeStamp(input);
    if (ts === null) {
      throw new Error('Malformed timestamp: ' + oInput);
    }
    // Remove time stamp from input.
    input = input.replace(/^[^\sa-zA-Z-]+/, '');
    return ts;
  }

  // 4.4.2 WebVTT cue settings
  function consumeCueSettings(input, cue) {
    var settings = new Settings();

    parseOptions(input, function(k, v) {
      switch (k) {
        case 'region':
          // Find the last region we parsed with the same region id.
          for (var i = regionList.length - 1; i >= 0; i--) {
            if (regionList[i].id === v) {
              settings.set(k, regionList[i].region);
              break;
            }
          }
          break;
        case 'vertical':
          settings.alt(k, v, ['rl', 'lr']);
          break;
        case 'line':
          var vals = v.split(','),
            vals0 = vals[0];
          settings.integer(k, vals0);
          if (settings.percent(k, vals0)) {
            settings.set('snapToLines', false);
          }
          settings.alt(k, vals0, ['auto']);
          if (vals.length === 2) {
            settings.alt('lineAlign', vals[1], ['start', center, 'end']);
          }
          break;
        case 'position':
          vals = v.split(',');
          settings.percent(k, vals[0]);
          if (vals.length === 2) {
            settings.alt('positionAlign', vals[1], ['start', center, 'end', 'line-left', 'line-right', 'auto']);
          }
          break;
        case 'size':
          settings.percent(k, v);
          break;
        case 'align':
          settings.alt(k, v, ['start', center, 'end', 'left', 'right']);
          break;
      }
    }, /:/, /\s/);

    // Apply default values for any missing fields.
    cue.region = settings.get('region', null);
    cue.vertical = settings.get('vertical', '');
    var line = settings.get('line', 'auto');
    if (line === 'auto' && defaults.line === -1) {
      // set numeric line number for Safari
      line = -1;
    }
    cue.line = line;
    cue.lineAlign = settings.get('lineAlign', 'start');
    cue.snapToLines = settings.get('snapToLines', true);
    cue.size = settings.get('size', 100);
    cue.align = settings.get('align', center);
    var position = settings.get('position', 'auto');
    if (position === 'auto' && defaults.position === 50) {
      // set numeric position for Safari
      position = cue.align === 'start' || cue.align === 'left' ? 0 : cue.align === 'end' || cue.align === 'right' ? 100 : 50;
    }
    cue.position = position;
  }

  function skipWhitespace() {
    input = input.replace(/^\s+/, '');
  }

  // 4.1 WebVTT cue timings.
  skipWhitespace();
  cue.startTime = consumeTimeStamp();   // (1) collect cue start time
  skipWhitespace();
  if (input.substr(0, 3) !== '-->') {     // (3) next characters must match '-->'
    throw new Error('Malformed time stamp (time stamps must be separated by \'-->\'): ' +
      oInput);
  }
  input = input.substr(3);
  skipWhitespace();
  cue.endTime = consumeTimeStamp();     // (5) collect cue end time

  // 4.1 WebVTT cue settings list.
  skipWhitespace();
  consumeCueSettings(input, cue);
}

function fixLineBreaks(input) {
  return input.replace(/<br(?: \/)?>/gi, '\n');
}

VTTParser.prototype = {
  parse: function(data) {
    var self = this;

    // If there is no data then we won't decode it, but will just try to parse
    // whatever is in buffer already. This may occur in circumstances, for
    // example when flush() is called.
    if (data) {
      // Try to decode the data that we received.
      self.buffer += self.decoder.decode(data, {stream: true});
    }

    function collectNextLine() {
      var buffer = self.buffer;
      var pos = 0;

      buffer = fixLineBreaks(buffer);

      while (pos < buffer.length && buffer[pos] !== '\r' && buffer[pos] !== '\n') {
        ++pos;
      }
      var line = buffer.substr(0, pos);
      // Advance the buffer early in case we fail below.
      if (buffer[pos] === '\r') {
        ++pos;
      }
      if (buffer[pos] === '\n') {
        ++pos;
      }
      self.buffer = buffer.substr(pos);
      return line;
    }

    // 3.2 WebVTT metadata header syntax
    function parseHeader(input) {
      parseOptions(input, function(k, v) {
        switch (k) {
          case 'Region':
            // 3.3 WebVTT region metadata header syntax
            console.log('parse region', v);
            //parseRegion(v);
            break;
        }
      }, /:/);
    }

    // 5.1 WebVTT file parsing.
    try {
      var line;
      if (self.state === 'INITIAL') {
        // We can't start parsing until we have the first line.
        if (!/\r\n|\n/.test(self.buffer)) {
          return this;
        }

        line = collectNextLine();

        var m = line.match(/^WEBVTT([ \t].*)?$/);
        if (!m || !m[0]) {
          throw new Error('Malformed WebVTT signature.');
        }

        self.state = 'HEADER';
      }

      var alreadyCollectedLine = false;
      while (self.buffer) {
        // We can't parse a line until we have the full line.
        if (!/\r\n|\n/.test(self.buffer)) {
          return this;
        }

        if (!alreadyCollectedLine) {
          line = collectNextLine();
        } else {
          alreadyCollectedLine = false;
        }

        switch (self.state) {
          case 'HEADER':
            // 13-18 - Allow a header (metadata) under the WEBVTT line.
            if (/:/.test(line)) {
              parseHeader(line);
            } else if (!line) {
              // An empty line terminates the header and starts the body (cues).
              self.state = 'ID';
            }
            continue;
          case 'NOTE':
            // Ignore NOTE blocks.
            if (!line) {
              self.state = 'ID';
            }
            continue;
          case 'ID':
            // Check for the start of NOTE blocks.
            if (/^NOTE($|[ \t])/.test(line)) {
              self.state = 'NOTE';
              break;
            }
            // 19-29 - Allow any number of line terminators, then initialize new cue values.
            if (!line) {
              continue;
            }
            self.cue = new __WEBPACK_IMPORTED_MODULE_0__vttcue__["a" /* default */](0, 0, '');
            self.state = 'CUE';
            // 30-39 - Check if self line contains an optional identifier or timing data.
            if (line.indexOf('-->') === -1) {
              self.cue.id = line;
              continue;
            }
          // Process line as start of a cue.
          /*falls through*/
          case 'CUE':
            // 40 - Collect cue timings and settings.
            try {
              parseCue(line, self.cue, self.regionList);
            } catch (e) {
              // In case of an error ignore rest of the cue.
              self.cue = null;
              self.state = 'BADCUE';
              continue;
            }
            self.state = 'CUETEXT';
            continue;
          case 'CUETEXT':
            var hasSubstring = line.indexOf('-->') !== -1;
            // 34 - If we have an empty line then report the cue.
            // 35 - If we have the special substring '-->' then report the cue,
            // but do not collect the line as we need to process the current
            // one as a new cue.
            if (!line || hasSubstring && (alreadyCollectedLine = true)) {
              // We are done parsing self cue.
              if (self.oncue) {
                self.oncue(self.cue);
              }
              self.cue = null;
              self.state = 'ID';
              continue;
            }
            if (self.cue.text) {
              self.cue.text += '\n';
            }
            self.cue.text += line;
            continue;
          case 'BADCUE': // BADCUE
            // 54-62 - Collect and discard the remaining cue.
            if (!line) {
              self.state = 'ID';
            }
            continue;
        }
      }
    } catch (e) {

      // If we are currently parsing a cue, report what we have.
      if (self.state === 'CUETEXT' && self.cue && self.oncue) {
        self.oncue(self.cue);
      }
      self.cue = null;
      // Enter BADWEBVTT state if header was not parsed correctly otherwise
      // another exception occurred so enter BADCUE state.
      self.state = self.state === 'INITIAL' ? 'BADWEBVTT' : 'BADCUE';
    }
    return this;
  },
  flush: function() {
    var self = this;
    try {
      // Finish decoding the stream.
      self.buffer += self.decoder.decode();
      // Synthesize the end of the current cue or region.
      if (self.cue || self.state === 'HEADER') {
        self.buffer += '\n\n';
        self.parse();
      }
      // If we've flushed, parsed, and we're still on the INITIAL state then
      // that means we don't have enough of the stream to parse the first
      // line.
      if (self.state === 'INITIAL') {
        throw new Error('Malformed WebVTT signature.');
      }
    } catch (e) {
      throw e;
    }
    if (self.onflush) {
      self.onflush();
    }
    return this;
  }
};



/* harmony default export */ __webpack_exports__["a"] = (VTTParser);


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hlsDefaultConfig", function() { return hlsDefaultConfig; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__controller_abr_controller__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controller_buffer_controller__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__controller_cap_level_controller__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__controller_fps_controller__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_xhr_loader__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__controller_audio_track_controller__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__controller_audio_stream_controller__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils_cues__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__controller_timeline_controller__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__controller_subtitle_track_controller__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__controller_subtitle_stream_controller__ = __webpack_require__(48);
/**
 * HLS config
 */







//import FetchLoader from './utils/fetch-loader';
//#if altaudio


//#endif

//#if subtitle




//#endif

var hlsDefaultConfig = {
      autoStartLoad: true,                    // used by stream-controller
      startPosition: -1,                      // used by stream-controller
      defaultAudioCodec: undefined,           // used by stream-controller
      debug: false,                           // used by logger
      capLevelOnFPSDrop: false,               // used by fps-controller
      capLevelToPlayerSize: false,            // used by cap-level-controller
      initialLiveManifestSize: 1,             // used by stream-controller
      maxBufferLength: 30,                    // used by stream-controller
      maxBufferSize: 60 * 1000 * 1000,        // used by stream-controller
      maxBufferHole: 0.5,                     // used by stream-controller
      maxSeekHole: 2,                         // used by stream-controller
      lowBufferWatchdogPeriod: 0.5,           // used by stream-controller
      highBufferWatchdogPeriod: 3,            // used by stream-controller
      nudgeOffset: 0.1,                       // used by stream-controller
      nudgeMaxRetry : 3,                      // used by stream-controller
      maxFragLookUpTolerance: 0.25,           // used by stream-controller
      liveSyncDurationCount:3,                // used by stream-controller
      liveMaxLatencyDurationCount: Infinity,  // used by stream-controller
      liveSyncDuration: undefined,            // used by stream-controller
      liveMaxLatencyDuration: undefined,      // used by stream-controller
      maxMaxBufferLength: 600,                // used by stream-controller
      enableWorker: true,                     // used by demuxer
      enableSoftwareAES: true,                // used by decrypter
      manifestLoadingTimeOut: 10000,          // used by playlist-loader
      manifestLoadingMaxRetry: 1,             // used by playlist-loader
      manifestLoadingRetryDelay: 1000,        // used by playlist-loader
      manifestLoadingMaxRetryTimeout: 64000,  // used by playlist-loader
      startLevel: undefined,                  // used by level-controller
      levelLoadingTimeOut: 10000,             // used by playlist-loader
      levelLoadingMaxRetry: 4,                // used by playlist-loader
      levelLoadingRetryDelay: 1000,           // used by playlist-loader
      levelLoadingMaxRetryTimeout: 64000,     // used by playlist-loader
      fragLoadingTimeOut: 20000,              // used by fragment-loader
      fragLoadingMaxRetry: 6,                 // used by fragment-loader
      fragLoadingRetryDelay: 1000,            // used by fragment-loader
      fragLoadingMaxRetryTimeout: 64000,      // used by fragment-loader
      fragLoadingLoopThreshold: 3,            // used by stream-controller
      startFragPrefetch: false,               // used by stream-controller
      fpsDroppedMonitoringPeriod: 5000,       // used by fps-controller
      fpsDroppedMonitoringThreshold: 0.2,     // used by fps-controller
      appendErrorMaxRetry: 3,                 // used by buffer-controller
      loader: __WEBPACK_IMPORTED_MODULE_4__utils_xhr_loader__["a" /* default */],
      //loader: FetchLoader,
      fLoader: undefined,
      pLoader: undefined,
      xhrSetup: undefined,
      fetchSetup: undefined,
      abrController: __WEBPACK_IMPORTED_MODULE_0__controller_abr_controller__["a" /* default */],
      bufferController: __WEBPACK_IMPORTED_MODULE_1__controller_buffer_controller__["a" /* default */],
      capLevelController: __WEBPACK_IMPORTED_MODULE_2__controller_cap_level_controller__["a" /* default */],
      fpsController: __WEBPACK_IMPORTED_MODULE_3__controller_fps_controller__["a" /* default */],
//#if altaudio
      audioStreamController: __WEBPACK_IMPORTED_MODULE_6__controller_audio_stream_controller__["a" /* default */],
      audioTrackController : __WEBPACK_IMPORTED_MODULE_5__controller_audio_track_controller__["a" /* default */],
//#endif
//#if subtitle
      subtitleStreamController: __WEBPACK_IMPORTED_MODULE_10__controller_subtitle_stream_controller__["a" /* default */],
      subtitleTrackController: __WEBPACK_IMPORTED_MODULE_9__controller_subtitle_track_controller__["a" /* default */],
      timelineController: __WEBPACK_IMPORTED_MODULE_8__controller_timeline_controller__["a" /* default */],
      cueHandler: __WEBPACK_IMPORTED_MODULE_7__utils_cues__["default"],
      enableCEA708Captions: true,               // used by timeline-controller
      enableWebVTT: true,                       // used by timeline-controller
      captionsTextTrack1Label: 'English',       // used by timeline-controller
      captionsTextTrack1LanguageCode: 'en',      // used by timeline-controller
      captionsTextTrack2Label: 'Spanish',       // used by timeline-controller
      captionsTextTrack2LanguageCode: 'es',     // used by timeline-controller
//#endif
      stretchShortVideoTrack: false,            // used by mp4-remuxer
      forceKeyFrameOnDiscontinuity: true,       // used by ts-demuxer
      abrEwmaFastLive: 3,                       // used by abr-controller
      abrEwmaSlowLive: 9,                       // used by abr-controller
      abrEwmaFastVoD: 3,                        // used by abr-controller
      abrEwmaSlowVoD: 9,                        // used by abr-controller
      abrEwmaDefaultEstimate: 5e5, // 500 kbps  // used by abr-controller
      abrBandWidthFactor : 0.95,                // used by abr-controller
      abrBandWidthUpFactor : 0.7,               // used by abr-controller
      abrMaxWithRealBitrate : false,            // used by abr-controller
      maxStarvationDelay : 4,                   // used by abr-controller
      maxLoadingDelay : 4,                      // used by abr-controller
      minAutoBitrate: 0                         // used by hls
    };


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__events__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__events__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__event_handler__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helper_buffer_helper__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helper_buffer_helper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__helper_buffer_helper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__errors__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_logger__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_ewma_bandwidth_estimator__ = __webpack_require__(16);
/*
 * simple ABR Controller
 *  - compute next level based on last fragment bw heuristics
 *  - implement an abandon rules triggered if we have less than 2 frag buffered and if computed bw shows that we risk buffer stalling
 */








class AbrController extends __WEBPACK_IMPORTED_MODULE_1__event_handler__["a" /* default */] {

  constructor(hls) {
    super(hls, __WEBPACK_IMPORTED_MODULE_0__events___default.a.FRAG_LOADING,
               __WEBPACK_IMPORTED_MODULE_0__events___default.a.FRAG_LOADED,
               __WEBPACK_IMPORTED_MODULE_0__events___default.a.FRAG_BUFFERED,
               __WEBPACK_IMPORTED_MODULE_0__events___default.a.ERROR);
    this.lastLoadedFragLevel = 0;
    this._nextAutoLevel = -1;
    this.hls = hls;
    this.timer = null;
    this._bwEstimator = null;
    this.onCheck = this._abandonRulesCheck.bind(this);
  }

  destroy() {
    this.clearTimer();
    __WEBPACK_IMPORTED_MODULE_1__event_handler__["a" /* default */].prototype.destroy.call(this);
  }

  onFragLoading(data) {
    let frag = data.frag;
    if (frag.type === 'main') {
      if (!this.timer) {
        this.timer = setInterval(this.onCheck, 100);
      }
      // lazy init of bw Estimator, rationale is that we use different params for Live/VoD
      // so we need to wait for stream manifest / playlist type to instantiate it.
      if (!this._bwEstimator) {
        let hls = this.hls,
            level = data.frag.level,
            isLive = hls.levels[level].details.live,
            config = hls.config,
            ewmaFast, ewmaSlow;

        if (isLive) {
          ewmaFast = config.abrEwmaFastLive;
          ewmaSlow = config.abrEwmaSlowLive;
        } else {
          ewmaFast = config.abrEwmaFastVoD;
          ewmaSlow = config.abrEwmaSlowVoD;
        }
        this._bwEstimator = new __WEBPACK_IMPORTED_MODULE_5__utils_ewma_bandwidth_estimator__["a" /* default */](hls,ewmaSlow,ewmaFast,config.abrEwmaDefaultEstimate);
      }
      this.fragCurrent = frag;
    }
  }

  _abandonRulesCheck() {
    /*
      monitor fragment retrieval time...
      we compute expected time of arrival of the complete fragment.
      we compare it to expected time of buffer starvation
    */
    let hls = this.hls, v = hls.media,frag = this.fragCurrent, loader = frag.loader, minAutoLevel = hls.minAutoLevel;

    // if loader has been destroyed or loading has been aborted, stop timer and return
    if(!loader || ( loader.stats && loader.stats.aborted)) {
      __WEBPACK_IMPORTED_MODULE_4__utils_logger__["b" /* logger */].warn('frag loader destroy or aborted, disarm abandonRules');
      this.clearTimer();
      return;
    }
    let stats = loader.stats;
    /* only monitor frag retrieval time if
    (video not paused OR first fragment being loaded(ready state === HAVE_NOTHING = 0)) AND autoswitching enabled AND not lowest level (=> means that we have several levels) */
    if (v && ((!v.paused && (v.playbackRate !== 0)) || !v.readyState) && frag.autoLevel && frag.level) {
      let requestDelay = performance.now() - stats.trequest,
          playbackRate = Math.abs(v.playbackRate);
      // monitor fragment load progress after half of expected fragment duration,to stabilize bitrate
      if (requestDelay > (500 * frag.duration / playbackRate)) {
        let levels = hls.levels,
            loadRate = Math.max(1, stats.bw ? stats.bw / 8 : stats.loaded * 1000 / requestDelay), // byte/s; at least 1 byte/s to avoid division by zero
            // compute expected fragment length using frag duration and level bitrate. also ensure that expected len is gte than already loaded size
            level = levels[frag.level],
            levelBitrate = level.realBitrate ? Math.max(level.realBitrate,level.bitrate) : level.bitrate,
            expectedLen = stats.total ? stats.total : Math.max(stats.loaded, Math.round(frag.duration * levelBitrate / 8)),
            pos = v.currentTime,
            fragLoadedDelay = (expectedLen - stats.loaded) / loadRate,
            bufferStarvationDelay = (__WEBPACK_IMPORTED_MODULE_2__helper_buffer_helper___default.a.bufferInfo(v,pos,hls.config.maxBufferHole).end - pos) / playbackRate;
        // consider emergency switch down only if we have less than 2 frag buffered AND
        // time to finish loading current fragment is bigger than buffer starvation delay
        // ie if we risk buffer starvation if bw does not increase quickly
        if ((bufferStarvationDelay < (2 * frag.duration / playbackRate)) && (fragLoadedDelay > bufferStarvationDelay)) {
          let fragLevelNextLoadedDelay, nextLoadLevel;
          // lets iterate through lower level and try to find the biggest one that could avoid rebuffering
          // we start from current level - 1 and we step down , until we find a matching level
          for (nextLoadLevel = frag.level - 1 ; nextLoadLevel > minAutoLevel ; nextLoadLevel--) {
            // compute time to load next fragment at lower level
            // 0.8 : consider only 80% of current bw to be conservative
            // 8 = bits per byte (bps/Bps)
            let levelNextBitrate = levels[nextLoadLevel].realBitrate ? Math.max(levels[nextLoadLevel].realBitrate,levels[nextLoadLevel].bitrate) : levels[nextLoadLevel].bitrate;
            fragLevelNextLoadedDelay = frag.duration * levelNextBitrate / (8 * 0.8 * loadRate);
            if (fragLevelNextLoadedDelay < bufferStarvationDelay) {
              // we found a lower level that be rebuffering free with current estimated bw !
              break;
            }
          }
          // only emergency switch down if it takes less time to load new fragment at lowest level instead
          // of finishing loading current one ...
          if (fragLevelNextLoadedDelay < fragLoadedDelay) {
            __WEBPACK_IMPORTED_MODULE_4__utils_logger__["b" /* logger */].warn(`loading too slow, abort fragment loading and switch to level ${nextLoadLevel}:fragLoadedDelay[${nextLoadLevel}]<fragLoadedDelay[${frag.level-1}];bufferStarvationDelay:${fragLevelNextLoadedDelay.toFixed(1)}<${fragLoadedDelay.toFixed(1)}:${bufferStarvationDelay.toFixed(1)}`);
            // force next load level in auto mode
            hls.nextLoadLevel = nextLoadLevel;
            // update bw estimate for this fragment before cancelling load (this will help reducing the bw)
            this._bwEstimator.sample(requestDelay,stats.loaded);
            //abort fragment loading
            loader.abort();
            // stop abandon rules timer
            this.clearTimer();
            hls.trigger(__WEBPACK_IMPORTED_MODULE_0__events___default.a.FRAG_LOAD_EMERGENCY_ABORTED, {frag: frag, stats: stats });
          }
        }
      }
    }
  }

  onFragLoaded(data) {
    let frag = data.frag;
    if (frag.type === 'main' && !isNaN(frag.sn)) {
      // stop monitoring bw once frag loaded
      this.clearTimer();
      // store level id after successful fragment load
      this.lastLoadedFragLevel = frag.level;
      // reset forced auto level value so that next level will be selected
      this._nextAutoLevel = -1;

      // compute level average bitrate
      if (this.hls.config.abrMaxWithRealBitrate) {
        const level = this.hls.levels[frag.level];
        let loadedBytes = (level.loaded ? level.loaded.bytes : 0) + data.stats.loaded;
        let loadedDuration = (level.loaded ? level.loaded.duration : 0) + data.frag.duration;
        level.loaded = { bytes : loadedBytes, duration : loadedDuration };
        level.realBitrate = Math.round(8*loadedBytes/loadedDuration);
      }
      // if fragment has been loaded to perform a bitrate test,
      if (data.frag.bitrateTest) {
        let stats = data.stats;
        stats.tparsed = stats.tbuffered = stats.tload;
        this.onFragBuffered(data);
      }
    }
  }

  onFragBuffered(data) {
    var stats = data.stats, frag = data.frag;
    // only update stats on first frag buffering
    // if same frag is loaded multiple times, it might be in browser cache, and loaded quickly
    // and leading to wrong bw estimation
    // on bitrate test, also only update stats once (if tload = tbuffered == on FRAG_LOADED)
    if (stats.aborted !== true && frag.loadCounter === 1 && frag.type === 'main' && !isNaN(frag.sn) && ((!frag.bitrateTest || stats.tload === stats.tbuffered))) {
      // use tparsed-trequest instead of tbuffered-trequest to compute fragLoadingProcessing; rationale is that  buffer appending only happens once media is attached
      // in case we use config.startFragPrefetch while media is not attached yet, fragment might be parsed while media not attached yet, but it will only be buffered on media attached
      // as a consequence it could happen really late in the process. meaning that appending duration might appears huge ... leading to underestimated throughput estimation
      let fragLoadingProcessingMs = stats.tparsed - stats.trequest;
      __WEBPACK_IMPORTED_MODULE_4__utils_logger__["b" /* logger */].log(`latency/loading/parsing/append/kbps:${Math.round(stats.tfirst-stats.trequest)}/${Math.round(stats.tload-stats.tfirst)}/${Math.round(stats.tparsed-stats.tload)}/${Math.round(stats.tbuffered-stats.tparsed)}/${Math.round(8*stats.loaded/(stats.tbuffered-stats.trequest))}`);
      this._bwEstimator.sample(fragLoadingProcessingMs,stats.loaded);
      stats.bwEstimate = this._bwEstimator.getEstimate();
      // if fragment has been loaded to perform a bitrate test, (hls.startLevel = -1), store bitrate test delay duration
      if (frag.bitrateTest) {
        this.bitrateTestDelay = fragLoadingProcessingMs/1000;
      } else {
        this.bitrateTestDelay = 0;
      }
    }
  }

  onError(data) {
    // stop timer in case of frag loading error
    switch(data.details) {
      case __WEBPACK_IMPORTED_MODULE_3__errors__["a" /* ErrorDetails */].FRAG_LOAD_ERROR:
      case __WEBPACK_IMPORTED_MODULE_3__errors__["a" /* ErrorDetails */].FRAG_LOAD_TIMEOUT:
        this.clearTimer();
        break;
      default:
        break;
    }
  }

 clearTimer() {
    clearInterval(this.timer);
    this.timer = null;
 }

  // return next auto level
  get nextAutoLevel() {
    const forcedAutoLevel = this._nextAutoLevel;
    const bwEstimator = this._bwEstimator;
    // in case next auto level has been forced, and bw not available or not reliable, return forced value
    if (forcedAutoLevel !== -1 && (!bwEstimator || !bwEstimator.canEstimate())) {
      return forcedAutoLevel;
    }
    // compute next level using ABR logic
    let nextABRAutoLevel = this._nextABRAutoLevel;
    // if forced auto level has been defined, use it to cap ABR computed quality level
    if (forcedAutoLevel !== -1) {
      nextABRAutoLevel = Math.min(forcedAutoLevel,nextABRAutoLevel);
    }
    return nextABRAutoLevel;
  }
  get _nextABRAutoLevel() {
    var hls = this.hls, maxAutoLevel = hls.maxAutoLevel, levels = hls.levels, config = hls.config, minAutoLevel = hls.minAutoLevel;
    const v = hls.media,
          currentLevel = this.lastLoadedFragLevel,
          currentFragDuration = this.fragCurrent ? this.fragCurrent.duration : 0,
          pos = (v ? v.currentTime : 0),
          // playbackRate is the absolute value of the playback rate; if v.playbackRate is 0, we use 1 to load as
          // if we're playing back at the normal rate.
          playbackRate = ((v && (v.playbackRate !== 0)) ? Math.abs(v.playbackRate) : 1.0),
          avgbw = this._bwEstimator ? this._bwEstimator.getEstimate() : config.abrEwmaDefaultEstimate,
          // bufferStarvationDelay is the wall-clock time left until the playback buffer is exhausted.
          bufferStarvationDelay = (__WEBPACK_IMPORTED_MODULE_2__helper_buffer_helper___default.a.bufferInfo(v, pos, config.maxBufferHole).end - pos) / playbackRate;

    // First, look to see if we can find a level matching with our avg bandwidth AND that could also guarantee no rebuffering at all
    let bestLevel = this._findBestLevel(currentLevel,currentFragDuration,avgbw,minAutoLevel,maxAutoLevel,bufferStarvationDelay,config.abrBandWidthFactor,config.abrBandWidthUpFactor,levels);
    if (bestLevel >= 0) {
      return bestLevel;
    } else {
      __WEBPACK_IMPORTED_MODULE_4__utils_logger__["b" /* logger */].trace('rebuffering expected to happen, lets try to find a quality level minimizing the rebuffering');
      // not possible to get rid of rebuffering ... let's try to find level that will guarantee less than maxStarvationDelay of rebuffering
      // if no matching level found, logic will return 0
      let maxStarvationDelay = currentFragDuration ? Math.min(currentFragDuration,config.maxStarvationDelay) : config.maxStarvationDelay,
          bwFactor = config.abrBandWidthFactor,
          bwUpFactor = config.abrBandWidthUpFactor;
      if (bufferStarvationDelay === 0) {
        // in case buffer is empty, let's check if previous fragment was loaded to perform a bitrate test
        let bitrateTestDelay = this.bitrateTestDelay;
        if (bitrateTestDelay) {
          // if it is the case, then we need to adjust our max starvation delay using maxLoadingDelay config value
          // max video loading delay used in  automatic start level selection :
          // in that mode ABR controller will ensure that video loading time (ie the time to fetch the first fragment at lowest quality level +
          // the time to fetch the fragment at the appropriate quality level is less than ```maxLoadingDelay``` )
          // cap maxLoadingDelay and ensure it is not bigger 'than bitrate test' frag duration
          const maxLoadingDelay = currentFragDuration ? Math.min(currentFragDuration,config.maxLoadingDelay) : config.maxLoadingDelay;
          maxStarvationDelay = maxLoadingDelay - bitrateTestDelay;
          __WEBPACK_IMPORTED_MODULE_4__utils_logger__["b" /* logger */].trace(`bitrate test took ${Math.round(1000*bitrateTestDelay)}ms, set first fragment max fetchDuration to ${Math.round(1000*maxStarvationDelay)} ms`);
          // don't use conservative factor on bitrate test
          bwFactor = bwUpFactor = 1;
        }
      }
      bestLevel = this._findBestLevel(currentLevel,currentFragDuration,avgbw,minAutoLevel,maxAutoLevel,bufferStarvationDelay+maxStarvationDelay,bwFactor,bwUpFactor,levels);
      return Math.max(bestLevel,0);
    }
  }

  _findBestLevel(currentLevel,currentFragDuration,currentBw,minAutoLevel,maxAutoLevel,maxFetchDuration,bwFactor,bwUpFactor,levels) {
    for (let i = maxAutoLevel; i >= minAutoLevel; i--) {
      let levelInfo = levels[i],
          levelDetails = levelInfo.details,
          avgDuration = levelDetails ? levelDetails.totalduration/levelDetails.fragments.length : currentFragDuration,
          live = levelDetails ? levelDetails.live : false,
          adjustedbw;
    // follow algorithm captured from stagefright :
    // https://android.googlesource.com/platform/frameworks/av/+/master/media/libstagefright/httplive/LiveSession.cpp
    // Pick the highest bandwidth stream below or equal to estimated bandwidth.
    // consider only 80% of the available bandwidth, but if we are switching up,
    // be even more conservative (70%) to avoid overestimating and immediately
    // switching back.
      if (i <= currentLevel) {
        adjustedbw = bwFactor * currentBw;
      } else {
        adjustedbw = bwUpFactor * currentBw;
      }
      const bitrate = levels[i].realBitrate ? Math.max(levels[i].realBitrate,levels[i].bitrate) : levels[i].bitrate,
            fetchDuration = bitrate * avgDuration / adjustedbw;

    __WEBPACK_IMPORTED_MODULE_4__utils_logger__["b" /* logger */].trace(`level/adjustedbw/bitrate/avgDuration/maxFetchDuration/fetchDuration: ${i}/${Math.round(adjustedbw)}/${bitrate}/${avgDuration}/${maxFetchDuration}/${fetchDuration}`);
      // if adjusted bw is greater than level bitrate AND
      if (adjustedbw > bitrate &&
      // fragment fetchDuration unknown OR live stream OR fragment fetchDuration less than max allowed fetch duration, then this level matches
      // we don't account for max Fetch Duration for live streams, this is to avoid switching down when near the edge of live sliding window ...
      // special case to support startLevel = -1 (bitrateTest) on live streams : in that case we should not exit loop so that _findBestLevel will return -1
        (!fetchDuration || (live  && !this.bitrateTestDelay) || fetchDuration < maxFetchDuration) ) {
        // as we are looping from highest to lowest, this will return the best achievable quality level
        return i;
      }
    }
    // not enough time budget even with quality level 0 ... rebuffering might happen
    return -1;
  }

  set nextAutoLevel(nextLevel) {
    this._nextAutoLevel = nextLevel;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (AbrController);



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_ewma__ = __webpack_require__(17);
/*
 * EWMA Bandwidth Estimator
 *  - heavily inspired from shaka-player
 * Tracks bandwidth samples and estimates available bandwidth.
 * Based on the minimum of two exponentially-weighted moving averages with
 * different half-lives.
 */




class EwmaBandWidthEstimator {

  constructor(hls,slow,fast,defaultEstimate) {
    this.hls = hls;
    this.defaultEstimate_ = defaultEstimate;
    this.minWeight_ = 0.001;
    this.minDelayMs_ = 50;
    this.slow_ = new __WEBPACK_IMPORTED_MODULE_0__utils_ewma__["a" /* default */](slow);
    this.fast_ = new __WEBPACK_IMPORTED_MODULE_0__utils_ewma__["a" /* default */](fast);
  }

  sample(durationMs,numBytes) {
    durationMs = Math.max(durationMs, this.minDelayMs_);
    var bandwidth = 8000* numBytes / durationMs,
    //console.log('instant bw:'+ Math.round(bandwidth));
    // we weight sample using loading duration....
        weight = durationMs / 1000;
    this.fast_.sample(weight,bandwidth);
    this.slow_.sample(weight,bandwidth);
  }

  canEstimate() {
    let fast = this.fast_;
    return (fast && fast.getTotalWeight() >= this.minWeight_);
  }


  getEstimate() {
    if (this.canEstimate()) {
      //console.log('slow estimate:'+ Math.round(this.slow_.getEstimate()));
      //console.log('fast estimate:'+ Math.round(this.fast_.getEstimate()));
      // Take the minimum of these two estimates.  This should have the effect of
      // adapting down quickly, but up more slowly.
      return Math.min(this.fast_.getEstimate(),this.slow_.getEstimate());
    } else {
      return this.defaultEstimate_;
    }
  }

  destroy() {
  }
}
/* harmony default export */ __webpack_exports__["a"] = (EwmaBandWidthEstimator);



/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
 * compute an Exponential Weighted moving average
 * - https://en.wikipedia.org/wiki/Moving_average#Exponential_moving_average
 *  - heavily inspired from shaka-player
 */

class EWMA {

 //  About half of the estimated value will be from the last |halfLife| samples by weight.
  constructor(halfLife) {
    // Larger values of alpha expire historical data more slowly.
    this.alpha_ = halfLife ? Math.exp(Math.log(0.5) / halfLife) : 0;
    this.estimate_ = 0;
    this.totalWeight_ = 0;
  }

  sample(weight,value) {
    var adjAlpha = Math.pow(this.alpha_, weight);
    this.estimate_ = value * (1 - adjAlpha) + adjAlpha * this.estimate_;
    this.totalWeight_ += weight;
  }

  getTotalWeight() {
    return this.totalWeight_;
  }

  getEstimate() {
    if (this.alpha_) {
      var zeroFactor = 1 - Math.pow(this.alpha_, this.totalWeight_);
      return this.estimate_ / zeroFactor;
    } else {
      return this.estimate_;
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (EWMA);


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__events__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__events__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__event_handler__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_logger__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__errors__ = __webpack_require__(2);
/*
 * Buffer Controller
*/







class BufferController extends __WEBPACK_IMPORTED_MODULE_1__event_handler__["a" /* default */] {

  constructor(hls) {
    super(hls,
      __WEBPACK_IMPORTED_MODULE_0__events___default.a.MEDIA_ATTACHING,
      __WEBPACK_IMPORTED_MODULE_0__events___default.a.MEDIA_DETACHING,
      __WEBPACK_IMPORTED_MODULE_0__events___default.a.MANIFEST_PARSED,
      __WEBPACK_IMPORTED_MODULE_0__events___default.a.BUFFER_RESET,
      __WEBPACK_IMPORTED_MODULE_0__events___default.a.BUFFER_APPENDING,
      __WEBPACK_IMPORTED_MODULE_0__events___default.a.BUFFER_CODECS,
      __WEBPACK_IMPORTED_MODULE_0__events___default.a.BUFFER_EOS,
      __WEBPACK_IMPORTED_MODULE_0__events___default.a.BUFFER_FLUSHING,
      __WEBPACK_IMPORTED_MODULE_0__events___default.a.LEVEL_PTS_UPDATED,
      __WEBPACK_IMPORTED_MODULE_0__events___default.a.LEVEL_UPDATED);

    // the value that we have set mediasource.duration to
    // (the actual duration may be tweaked slighly by the browser)
    this._msDuration = null;
    // the value that we want to set mediaSource.duration to
    this._levelDuration = null;

    // Source Buffer listeners
    this.onsbue = this.onSBUpdateEnd.bind(this);
    this.onsbe  = this.onSBUpdateError.bind(this);
    this.pendingTracks = {};
    this.tracks = {};
  }

  destroy() {
    __WEBPACK_IMPORTED_MODULE_1__event_handler__["a" /* default */].prototype.destroy.call(this);
  }

  onLevelPtsUpdated(data) {
    let type = data.type;
    let audioTrack = this.tracks.audio;

    // Adjusting `SourceBuffer.timestampOffset` (desired point in the timeline where the next frames should be appended)
    // in Chrome browser when we detect MPEG audio container and time delta between level PTS and `SourceBuffer.timestampOffset`
    // is greater than 100ms (this is enough to handle seek for VOD or level change for LIVE videos). At the time of change we issue
    // `SourceBuffer.abort()` and adjusting `SourceBuffer.timestampOffset` if `SourceBuffer.updating` is false or awaiting `updateend`
    // event if SB is in updating state.
    // More info here: https://github.com/video-dev/hls.js/issues/332#issuecomment-257986486

    if (type === 'audio' && audioTrack && audioTrack.container === 'audio/mpeg') { // Chrome audio mp3 track
      let audioBuffer = this.sourceBuffer.audio;
      let delta = Math.abs(audioBuffer.timestampOffset - data.start);

      // adjust timestamp offset if time delta is greater than 100ms
      if (delta > 0.1) {
        let updating = audioBuffer.updating;

        try {
          audioBuffer.abort();
        } catch (err) {
          updating = true;
          __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].warn('can not abort audio buffer: ' + err);
        }

        if (!updating) {
          __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].warn('change mpeg audio timestamp offset from ' + audioBuffer.timestampOffset + ' to ' + data.start);
          audioBuffer.timestampOffset = data.start;
        } else {
          this.audioTimestampOffset = data.start;
        }
      }
    }
  }

  onManifestParsed(data) {
    let audioExpected = data.audio,
        videoExpected = data.video || (data.levels.length && data.audio),
        sourceBufferNb = 0;
    // in case of alt audio 2 BUFFER_CODECS events will be triggered, one per stream controller
    // sourcebuffers will be created all at once when the expected nb of tracks will be reached
    // in case alt audio is not used, only one BUFFER_CODEC event will be fired from main stream controller
    // it will contain the expected nb of source buffers, no need to compute it
    if (data.altAudio && (audioExpected || videoExpected)) {
      sourceBufferNb = (audioExpected ? 1 : 0) + (videoExpected ? 1 : 0);
      __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].log(`${sourceBufferNb} sourceBuffer(s) expected`);
    }
    this.sourceBufferNb = sourceBufferNb;
  }

  onMediaAttaching(data) {
    let media = this.media = data.media;
    if (media) {
      // setup the media source
      var ms = this.mediaSource = new MediaSource();
      //Media Source listeners
      this.onmso = this.onMediaSourceOpen.bind(this);
      this.onmse = this.onMediaSourceEnded.bind(this);
      this.onmsc = this.onMediaSourceClose.bind(this);
      ms.addEventListener('sourceopen', this.onmso);
      ms.addEventListener('sourceended', this.onmse);
      ms.addEventListener('sourceclose', this.onmsc);
      // link video and media Source
      media.src = URL.createObjectURL(ms);
    }
  }

  onMediaDetaching() {
    __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].log('media source detaching');
    var ms = this.mediaSource;
    if (ms) {
      if (ms.readyState === 'open') {
        try {
          // endOfStream could trigger exception if any sourcebuffer is in updating state
          // we don't really care about checking sourcebuffer state here,
          // as we are anyway detaching the MediaSource
          // let's just avoid this exception to propagate
          ms.endOfStream();
        } catch(err) {
          __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].warn(`onMediaDetaching:${err.message} while calling endOfStream`);
        }
      }
      ms.removeEventListener('sourceopen', this.onmso);
      ms.removeEventListener('sourceended', this.onmse);
      ms.removeEventListener('sourceclose', this.onmsc);

      // Detach properly the MediaSource from the HTMLMediaElement as
      // suggested in https://github.com/w3c/media-source/issues/53.
      if (this.media) {
        URL.revokeObjectURL(this.media.src);
        this.media.removeAttribute('src');
        this.media.load();
      }

      this.mediaSource = null;
      this.media = null;
      this.pendingTracks = {};
      this.tracks = {};
      this.sourceBuffer = {};
      this.flushRange = [];
      this.segments = [];
      this.appended = 0;
    }
    this.onmso = this.onmse = this.onmsc = null;
    this.hls.trigger(__WEBPACK_IMPORTED_MODULE_0__events___default.a.MEDIA_DETACHED);
  }

  onMediaSourceOpen() {
    __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].log('media source opened');
    this.hls.trigger(__WEBPACK_IMPORTED_MODULE_0__events___default.a.MEDIA_ATTACHED, { media : this.media });
    let mediaSource = this.mediaSource;
    if (mediaSource) {
      // once received, don't listen anymore to sourceopen event
      mediaSource.removeEventListener('sourceopen', this.onmso);
    }
    this.checkPendingTracks();
  }

  checkPendingTracks() {
    // if any buffer codecs pending, check if we have enough to create sourceBuffers
    let pendingTracks = this.pendingTracks,
        pendingTracksNb = Object.keys(pendingTracks).length;
    // if any pending tracks and (if nb of pending tracks gt or equal than expected nb or if unknown expected nb)
    if (pendingTracksNb && (
        this.sourceBufferNb <= pendingTracksNb ||
        this.sourceBufferNb === 0)) {
      // ok, let's create them now !
      this.createSourceBuffers(pendingTracks);
      this.pendingTracks = {};
      // append any pending segments now !
      this.doAppending();
    }
  }

  onMediaSourceClose() {
    __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].log('media source closed');
  }

  onMediaSourceEnded() {
    __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].log('media source ended');
  }


  onSBUpdateEnd() {
    // update timestampOffset
    if (this.audioTimestampOffset) {
      let audioBuffer = this.sourceBuffer.audio;
      __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].warn('change mpeg audio timestamp offset from ' + audioBuffer.timestampOffset + ' to ' + this.audioTimestampOffset);
      audioBuffer.timestampOffset = this.audioTimestampOffset;
      delete this.audioTimestampOffset;
    }

    if (this._needsFlush) {
      this.doFlush();
    }

    if (this._needsEos) {
      this.checkEos();
    }
    this.appending = false;
    let parent = this.parent;
    // count nb of pending segments waiting for appending on this sourcebuffer
    let pending = this.segments.reduce( (counter, segment) => (segment.parent === parent) ? counter + 1 : counter , 0);
    this.hls.trigger(__WEBPACK_IMPORTED_MODULE_0__events___default.a.BUFFER_APPENDED, { parent : parent, pending : pending });

    // don't append in flushing mode
    if (!this._needsFlush) {
      this.doAppending();
    }

    this.updateMediaElementDuration();
  }

  onSBUpdateError(event) {
    __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].error('sourceBuffer error:', event);
    // according to http://www.w3.org/TR/media-source/#sourcebuffer-append-error
    // this error might not always be fatal (it is fatal if decode error is set, in that case
    // it will be followed by a mediaElement error ...)
    this.hls.trigger(__WEBPACK_IMPORTED_MODULE_0__events___default.a.ERROR, {type: __WEBPACK_IMPORTED_MODULE_3__errors__["b" /* ErrorTypes */].MEDIA_ERROR, details: __WEBPACK_IMPORTED_MODULE_3__errors__["a" /* ErrorDetails */].BUFFER_APPENDING_ERROR, fatal: false});
    // we don't need to do more than that, as accordin to the spec, updateend will be fired just after
  }

  onBufferReset() {
    var sourceBuffer = this.sourceBuffer;
    for(var type in sourceBuffer) {
      var sb = sourceBuffer[type];
      try {
        this.mediaSource.removeSourceBuffer(sb);
        sb.removeEventListener('updateend', this.onsbue);
        sb.removeEventListener('error', this.onsbe);
      } catch(err) {
      }
    }
    this.sourceBuffer = {};
    this.flushRange = [];
    this.segments = [];
    this.appended = 0;
  }

  onBufferCodecs(tracks) {
    // if source buffer(s) not created yet, appended buffer tracks in this.pendingTracks
    // if sourcebuffers already created, do nothing ...
    if (Object.keys(this.sourceBuffer).length === 0) {
      for (var trackName in tracks) { this.pendingTracks[trackName] = tracks[trackName]; }
      let mediaSource = this.mediaSource;
      if (mediaSource && mediaSource.readyState === 'open') {
        // try to create sourcebuffers if mediasource opened
        this.checkPendingTracks();
      }
    }
  }


  createSourceBuffers(tracks) {
    var sourceBuffer = this.sourceBuffer,mediaSource = this.mediaSource;

    for (let trackName in tracks) {
      if(!sourceBuffer[trackName]) {
        let track = tracks[trackName];
        // use levelCodec as first priority
        let codec = track.levelCodec || track.codec;
        let mimeType = `${track.container};codecs=${codec}`;
        __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].log(`creating sourceBuffer(${mimeType})`);
        try {
          let sb = sourceBuffer[trackName] = mediaSource.addSourceBuffer(mimeType);
          sb.addEventListener('updateend', this.onsbue);
          sb.addEventListener('error', this.onsbe);
          this.tracks[trackName] = {codec: codec, container: track.container};
          track.buffer = sb;
        } catch(err) {
          __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].error(`error while trying to add sourceBuffer:${err.message}`);
          this.hls.trigger(__WEBPACK_IMPORTED_MODULE_0__events___default.a.ERROR, {type: __WEBPACK_IMPORTED_MODULE_3__errors__["b" /* ErrorTypes */].MEDIA_ERROR, details: __WEBPACK_IMPORTED_MODULE_3__errors__["a" /* ErrorDetails */].BUFFER_ADD_CODEC_ERROR, fatal: false, err: err, mimeType : mimeType});
        }
      }
    }
    this.hls.trigger(__WEBPACK_IMPORTED_MODULE_0__events___default.a.BUFFER_CREATED, { tracks : tracks } );
  }

  onBufferAppending(data) {
    if (!this._needsFlush) {
      if (!this.segments) {
        this.segments = [ data ];
      } else {
        this.segments.push(data);
      }
      this.doAppending();
    }
  }

  onBufferAppendFail(data) {
    __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].error('sourceBuffer error:',data.event);
    // according to http://www.w3.org/TR/media-source/#sourcebuffer-append-error
    // this error might not always be fatal (it is fatal if decode error is set, in that case
    // it will be followed by a mediaElement error ...)
    this.hls.trigger(__WEBPACK_IMPORTED_MODULE_0__events___default.a.ERROR, {type: __WEBPACK_IMPORTED_MODULE_3__errors__["b" /* ErrorTypes */].MEDIA_ERROR, details: __WEBPACK_IMPORTED_MODULE_3__errors__["a" /* ErrorDetails */].BUFFER_APPENDING_ERROR, fatal: false});
  }

  // on BUFFER_EOS mark matching sourcebuffer(s) as ended and trigger checkEos()
  onBufferEos(data) {
    var sb = this.sourceBuffer;
    let dataType = data.type;
    for(let type in sb) {
      if (!dataType || type === dataType) {
        if (!sb[type].ended) {
          sb[type].ended = true;
          __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].log(`${type} sourceBuffer now EOS`);
        }
      }
    }
    this.checkEos();
  }

 // if all source buffers are marked as ended, signal endOfStream() to MediaSource.
 checkEos() {
    var sb = this.sourceBuffer, mediaSource = this.mediaSource;
    if (!mediaSource || mediaSource.readyState !== 'open') {
      this._needsEos = false;
      return;
    }
    for(let type in sb) {
      let sbobj = sb[type];
      if (!sbobj.ended) {
        return;
      }
      if(sbobj.updating) {
        this._needsEos = true;
        return;
      }
    }
    __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].log('all media data available, signal endOfStream() to MediaSource and stop loading fragment');
    //Notify the media element that it now has all of the media data
    try {
      mediaSource.endOfStream();
    } catch(e) {
      __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].warn('exception while calling mediaSource.endOfStream()');
    }
    this._needsEos = false;
 }


  onBufferFlushing(data) {
    this.flushRange.push({start: data.startOffset, end: data.endOffset, type : data.type});
    // attempt flush immediatly
    this.flushBufferCounter = 0;
    this.doFlush();
  }

  onLevelUpdated(event) {
    let details = event.details;
    if (details.fragments.length === 0) {
      return;
    }
    this._levelDuration = details.totalduration + details.fragments[0].start;
    this.updateMediaElementDuration();
  }

  // https://github.com/video-dev/hls.js/issues/355
  updateMediaElementDuration() {
    let media = this.media,
        mediaSource = this.mediaSource,
        sourceBuffer = this.sourceBuffer,
        levelDuration = this._levelDuration;
    if (levelDuration === null || !media || !mediaSource || !sourceBuffer || media.readyState === 0 || mediaSource.readyState !== 'open') {
      return;
    }
    for (let type in sourceBuffer) {
      if (sourceBuffer[type].updating) {
        // can't set duration whilst a buffer is updating
        return;
      }
    }
    if (this._msDuration === null) {
      // initialise to the value that the media source is reporting
      this._msDuration = mediaSource.duration;
    }
    let duration = media.duration;
    // levelDuration was the last value we set.
    // not using mediaSource.duration as the browser may tweak this value
    // only update mediasource duration if its value increase, this is to avoid
    // flushing already buffered portion when switching between quality level
    if ((levelDuration > this._msDuration && levelDuration > duration) || (duration === Infinity || isNaN(duration) )) {
      __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].log(`Updating mediasource duration to ${levelDuration.toFixed(3)}`);
      this._msDuration = mediaSource.duration = levelDuration;
    }
  }

  doFlush() {
    // loop through all buffer ranges to flush
    while(this.flushRange.length) {
      var range = this.flushRange[0];
      // flushBuffer will abort any buffer append in progress and flush Audio/Video Buffer
      if (this.flushBuffer(range.start, range.end, range.type)) {
        // range flushed, remove from flush array
        this.flushRange.shift();
        this.flushBufferCounter = 0;
      } else {
        this._needsFlush = true;
        // avoid looping, wait for SB update end to retrigger a flush
        return;
      }
    }
    if (this.flushRange.length === 0) {
      // everything flushed
      this._needsFlush = false;

      // let's recompute this.appended, which is used to avoid flush looping
      var appended = 0;
      var sourceBuffer = this.sourceBuffer;
      try {
        for (var type in sourceBuffer) {
          appended += sourceBuffer[type].buffered.length;
        }
      } catch(error) {
        // error could be thrown while accessing buffered, in case sourcebuffer has already been removed from MediaSource
        // this is harmess at this stage, catch this to avoid reporting an internal exception
        __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].error('error while accessing sourceBuffer.buffered');
      }
      this.appended = appended;
      this.hls.trigger(__WEBPACK_IMPORTED_MODULE_0__events___default.a.BUFFER_FLUSHED);
    }
  }

  doAppending() {
    var hls = this.hls, sourceBuffer = this.sourceBuffer, segments = this.segments;
    if (Object.keys(sourceBuffer).length) {
      if (this.media.error) {
        this.segments = [];
        __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].error('trying to append although a media error occured, flush segment and abort');
        return;
      }
      if (this.appending) {
        //logger.log(`sb appending in progress`);
        return;
      }
      if (segments && segments.length) {
        let segment = segments.shift();
        try {
          let type = segment.type, sb = sourceBuffer[type];
          if(sb) {
            if(!sb.updating) {
              // reset sourceBuffer ended flag before appending segment
              sb.ended = false;
              //logger.log(`appending ${segment.content} ${type} SB, size:${segment.data.length}, ${segment.parent}`);
              this.parent = segment.parent;
              sb.appendBuffer(segment.data);
              this.appendError = 0;
              this.appended++;
              this.appending = true;
            } else {
              segments.unshift(segment);
            }
          } else {
            // in case we don't have any source buffer matching with this segment type,
            // it means that Mediasource fails to create sourcebuffer
            // discard this segment, and trigger update end
            this.onSBUpdateEnd();
          }
        } catch(err) {
          // in case any error occured while appending, put back segment in segments table
          __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].error(`error while trying to append buffer:${err.message}`);
          segments.unshift(segment);
          var event = {type: __WEBPACK_IMPORTED_MODULE_3__errors__["b" /* ErrorTypes */].MEDIA_ERROR, parent : segment.parent};
          if(err.code !== 22) {
            if (this.appendError) {
              this.appendError++;
            } else {
              this.appendError = 1;
            }
            event.details = __WEBPACK_IMPORTED_MODULE_3__errors__["a" /* ErrorDetails */].BUFFER_APPEND_ERROR;
            /* with UHD content, we could get loop of quota exceeded error until
              browser is able to evict some data from sourcebuffer. retrying help recovering this
            */
            if (this.appendError > hls.config.appendErrorMaxRetry) {
              __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].log(`fail ${hls.config.appendErrorMaxRetry} times to append segment in sourceBuffer`);
              segments = [];
              event.fatal = true;
              hls.trigger(__WEBPACK_IMPORTED_MODULE_0__events___default.a.ERROR, event);
              return;
            } else {
              event.fatal = false;
              hls.trigger(__WEBPACK_IMPORTED_MODULE_0__events___default.a.ERROR, event);
            }
          } else {
            // QuotaExceededError: http://www.w3.org/TR/html5/infrastructure.html#quotaexceedederror
            // let's stop appending any segments, and report BUFFER_FULL_ERROR error
            this.segments = [];
            event.details = __WEBPACK_IMPORTED_MODULE_3__errors__["a" /* ErrorDetails */].BUFFER_FULL_ERROR;
            event.fatal = false;
            hls.trigger(__WEBPACK_IMPORTED_MODULE_0__events___default.a.ERROR,event);
            return;
          }
        }
      }
    }
  }

  /*
    flush specified buffered range,
    return true once range has been flushed.
    as sourceBuffer.remove() is asynchronous, flushBuffer will be retriggered on sourceBuffer update end
  */
  flushBuffer(startOffset, endOffset, typeIn) {
    var sb, i, bufStart, bufEnd, flushStart, flushEnd, sourceBuffer = this.sourceBuffer;
    if (Object.keys(sourceBuffer).length) {
      __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].log(`flushBuffer,pos/start/end: ${this.media.currentTime.toFixed(3)}/${startOffset}/${endOffset}`);
      // safeguard to avoid infinite looping : don't try to flush more than the nb of appended segments
      if (this.flushBufferCounter < this.appended) {
        for (var type in sourceBuffer) {
          // check if sourcebuffer type is defined (typeIn): if yes, let's only flush this one
          // if no, let's flush all sourcebuffers
          if (typeIn && type !== typeIn) {
            continue;
          }
          sb = sourceBuffer[type];
          // we are going to flush buffer, mark source buffer as 'not ended'
          sb.ended = false;
          if (!sb.updating) {
            try {
              for (i = 0; i < sb.buffered.length; i++) {
                bufStart = sb.buffered.start(i);
                bufEnd = sb.buffered.end(i);
                // workaround firefox not able to properly flush multiple buffered range.
                if (navigator.userAgent.toLowerCase().indexOf('firefox') !== -1 && endOffset === Number.POSITIVE_INFINITY) {
                  flushStart = startOffset;
                  flushEnd = endOffset;
                } else {
                  flushStart = Math.max(bufStart, startOffset);
                  flushEnd = Math.min(bufEnd, endOffset);
                }
                /* sometimes sourcebuffer.remove() does not flush
                   the exact expected time range.
                   to avoid rounding issues/infinite loop,
                   only flush buffer range of length greater than 500ms.
                */
                if (Math.min(flushEnd,bufEnd) - flushStart > 0.5 ) {
                  this.flushBufferCounter++;
                  __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].log(`flush ${type} [${flushStart},${flushEnd}], of [${bufStart},${bufEnd}], pos:${this.media.currentTime}`);
                  sb.remove(flushStart, flushEnd);
                  return false;
                }
              }
            } catch(e) {
              __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].warn('exception while accessing sourcebuffer, it might have been removed from MediaSource');
            }
          } else {
            //logger.log('abort ' + type + ' append in progress');
            // this will abort any appending in progress
            //sb.abort();
            __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].warn('cannot flush, sb updating in progress');
            return false;
          }
        }
      } else {
        __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].warn('abort flushing too many retries');
      }
      __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].log('buffer flushed');
    }
    // everything flushed !
    return true;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (BufferController);


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__events__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__events__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__event_handler__ = __webpack_require__(3);
/*
 * cap stream level to media size dimension controller
*/




class CapLevelController extends __WEBPACK_IMPORTED_MODULE_1__event_handler__["a" /* default */] {
	constructor(hls) {
    super(hls,
      __WEBPACK_IMPORTED_MODULE_0__events___default.a.FPS_DROP_LEVEL_CAPPING,
      __WEBPACK_IMPORTED_MODULE_0__events___default.a.MEDIA_ATTACHING,
      __WEBPACK_IMPORTED_MODULE_0__events___default.a.MANIFEST_PARSED);
	}

	destroy() {
    if (this.hls.config.capLevelToPlayerSize) {
      this.media = this.restrictedLevels = null;
      this.autoLevelCapping = Number.POSITIVE_INFINITY;
      if (this.timer) {
        this.timer = clearInterval(this.timer);
      }
    }
  }

  onFpsDropLevelCapping(data) {
	  // Don't add a restricted level more than once
    if (CapLevelController.isLevelAllowed(data.droppedLevel, this.restrictedLevels)) {
      this.restrictedLevels.push(data.droppedLevel);
    }
  }

	onMediaAttaching(data) {
    this.media = data.media instanceof HTMLVideoElement ? data.media : null;
  }

  onManifestParsed(data) {
    const hls = this.hls;
    this.restrictedLevels = [];
    if (hls.config.capLevelToPlayerSize) {
      this.autoLevelCapping = Number.POSITIVE_INFINITY;
      this.levels = data.levels;
      hls.firstLevel = this.getMaxLevel(data.firstLevel);
      clearInterval(this.timer);
      this.timer = setInterval(this.detectPlayerSize.bind(this), 1000);
      this.detectPlayerSize();
    }
  }

  detectPlayerSize() {
    if (this.media) {
      let levelsLength = this.levels ? this.levels.length : 0;
      if (levelsLength) {
        const hls = this.hls;
        hls.autoLevelCapping = this.getMaxLevel(levelsLength - 1);
        if (hls.autoLevelCapping > this.autoLevelCapping) {
          // if auto level capping has a higher value for the previous one, flush the buffer using nextLevelSwitch
          // usually happen when the user go to the fullscreen mode.
          hls.streamController.nextLevelSwitch();
        }
        this.autoLevelCapping = hls.autoLevelCapping;
      }
    }
  }

  /*
  * returns level should be the one with the dimensions equal or greater than the media (player) dimensions (so the video will be downscaled)
  */
  getMaxLevel(capLevelIndex) {
    if (!this.levels) {
      return -1;
    }

    const validLevels = this.levels.filter((level, index) =>
      CapLevelController.isLevelAllowed(index, this.restrictedLevels) && index <= capLevelIndex
    );

    return CapLevelController.getMaxLevelByMediaSize(validLevels, this.mediaWidth, this.mediaHeight);
  }

  get mediaWidth() {
    let width;
    const media = this.media;
    if (media) {
      width = media.width || media.clientWidth || media.offsetWidth;
      width *= CapLevelController.contentScaleFactor;
    }
    return width;
  }

  get mediaHeight() {
    let height;
    const media = this.media;
    if (media) {
      height = media.height || media.clientHeight || media.offsetHeight;
      height *= CapLevelController.contentScaleFactor;
    }
    return height;
  }

  static get contentScaleFactor() {
    let pixelRatio = 1;
    try {
      pixelRatio =  window.devicePixelRatio;
    } catch(e) {}
    return pixelRatio;
  }

  static isLevelAllowed(level, restrictedLevels = []) {
    return restrictedLevels.indexOf(level) === -1;
  }

  static getMaxLevelByMediaSize(levels, width, height) {
    if (!levels || (levels && !levels.length)) {
      return -1;
    }

    // Levels can have the same dimensions but differing bandwidths - since levels are ordered, we can look to the next
    // to determine whether we've chosen the greatest bandwidth for the media's dimensions
    const atGreatestBandiwdth = (curLevel, nextLevel) => {
      if (!nextLevel) {
        return true;
      }
      return curLevel.width !== nextLevel.width || curLevel.height !== nextLevel.height;
    };

    // If we run through the loop without breaking, the media's dimensions are greater than every level, so default to
    // the max level
    let maxLevelIndex = levels.length - 1;

    for (let i = 0; i < levels.length; i+= 1) {
      const level = levels[i];
      if ((level.width >= width || level.height >= height) && atGreatestBandiwdth(level, levels[i + 1])) {
        maxLevelIndex = i;
        break;
      }
    }

    return maxLevelIndex;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (CapLevelController);


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__events__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__events__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__event_handler__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_logger__ = __webpack_require__(0);
/*
 * FPS Controller
*/





class FPSController extends __WEBPACK_IMPORTED_MODULE_1__event_handler__["a" /* default */]{

  constructor(hls) {
    super(hls, __WEBPACK_IMPORTED_MODULE_0__events___default.a.MEDIA_ATTACHING);
  }

  destroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.isVideoPlaybackQualityAvailable = false;
  }

  onMediaAttaching(data) {
    const config = this.hls.config;
    if (config.capLevelOnFPSDrop) {
      const video = this.video = data.media instanceof HTMLVideoElement ? data.media : null;
      if (typeof video.getVideoPlaybackQuality === 'function') {
        this.isVideoPlaybackQualityAvailable = true;
      }
      clearInterval(this.timer);
      this.timer = setInterval(this.checkFPSInterval.bind(this), config.fpsDroppedMonitoringPeriod);
    }
  }

  checkFPS(video, decodedFrames, droppedFrames) {
    let currentTime = performance.now();
    if (decodedFrames) {
      if (this.lastTime) {
        let currentPeriod = currentTime - this.lastTime,
            currentDropped = droppedFrames - this.lastDroppedFrames,
            currentDecoded = decodedFrames - this.lastDecodedFrames,
            droppedFPS = 1000 * currentDropped / currentPeriod,
            hls = this.hls;
        hls.trigger(__WEBPACK_IMPORTED_MODULE_0__events___default.a.FPS_DROP, {currentDropped: currentDropped, currentDecoded: currentDecoded, totalDroppedFrames: droppedFrames});
        if (droppedFPS > 0) {
          //logger.log('checkFPS : droppedFPS/decodedFPS:' + droppedFPS/(1000 * currentDecoded / currentPeriod));
          if (currentDropped > hls.config.fpsDroppedMonitoringThreshold * currentDecoded) {
            let currentLevel = hls.currentLevel;
            __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].warn('drop FPS ratio greater than max allowed value for currentLevel: ' + currentLevel);
            if (currentLevel > 0 && (hls.autoLevelCapping === -1 || hls.autoLevelCapping >= currentLevel)) {
              currentLevel = currentLevel - 1;
              hls.trigger(__WEBPACK_IMPORTED_MODULE_0__events___default.a.FPS_DROP_LEVEL_CAPPING, {level: currentLevel, droppedLevel: hls.currentLevel});
              hls.autoLevelCapping = currentLevel;
              hls.streamController.nextLevelSwitch();
            }
          }
        }
      }
      this.lastTime = currentTime;
      this.lastDroppedFrames = droppedFrames;
      this.lastDecodedFrames = decodedFrames;
    }
  }

  checkFPSInterval() {
    const video = this.video;
    if (video) {
      if (this.isVideoPlaybackQualityAvailable) {
        let videoPlaybackQuality = video.getVideoPlaybackQuality();
        this.checkFPS(video, videoPlaybackQuality.totalVideoFrames, videoPlaybackQuality.droppedVideoFrames);
      } else {
        this.checkFPS(video, video.webkitDecodedFrameCount, video.webkitDroppedFrameCount);
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (FPSController);



/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_logger__ = __webpack_require__(0);
/**
 * XHR based logger
*/



class XhrLoader {

  constructor(config) {
    if (config && config.xhrSetup) {
      this.xhrSetup = config.xhrSetup;
    }
  }

  destroy() {
    this.abort();
    this.loader = null;
  }

  abort() {
    var loader = this.loader;
    if (loader && loader.readyState !== 4) {
      this.stats.aborted = true;
      loader.abort();
    }

    window.clearTimeout(this.requestTimeout);
    this.requestTimeout = null;
    window.clearTimeout(this.retryTimeout);
    this.retryTimeout = null;
  }

  load(context, config, callbacks) {
    this.context = context;
    this.config = config;
    this.callbacks = callbacks;
    this.stats = {trequest: performance.now(), retry: 0};
    this.retryDelay = config.retryDelay;
    this.loadInternal();
  }

  loadInternal() {
    var xhr, context = this.context;

    if (typeof XDomainRequest !== 'undefined') {
       xhr = this.loader = new XDomainRequest();
    } else {
       xhr = this.loader = new XMLHttpRequest();
    }
    let stats = this.stats;
    stats.tfirst = 0;
    stats.loaded = 0;
    const xhrSetup = this.xhrSetup;

    try {
      if (xhrSetup) {
        try {
          xhrSetup(xhr, context.url);
        } catch (e) {
          // fix xhrSetup: (xhr, url) => {xhr.setRequestHeader("Content-Language", "test");}
          // not working, as xhr.setRequestHeader expects xhr.readyState === OPEN
          xhr.open('GET', context.url, true);
          xhrSetup(xhr, context.url);
        }
      }
      if (!xhr.readyState) {
        xhr.open('GET', context.url, true);
      }
    } catch (e) {
      // IE11 throws an exception on xhr.open if attempting to access an HTTP resource over HTTPS
      this.callbacks.onError({ code : xhr.status, text: e.message }, context, xhr);
      return;
    }

    if (context.rangeEnd) {
      xhr.setRequestHeader('Range','bytes=' + context.rangeStart + '-' + (context.rangeEnd-1));
    }
    xhr.onreadystatechange = this.readystatechange.bind(this);
    xhr.onprogress = this.loadprogress.bind(this);
    xhr.responseType = context.responseType;

    // setup timeout before we perform request
    this.requestTimeout = window.setTimeout(this.loadtimeout.bind(this), this.config.timeout);
    xhr.send();
  }

  readystatechange(event) {
    var xhr = event.currentTarget,
        readyState = xhr.readyState,
        stats = this.stats,
        context = this.context,
        config = this.config;

    // don't proceed if xhr has been aborted
    if (stats.aborted) {
      return;
    }

    // >= HEADERS_RECEIVED
    if (readyState >=2) {
      // clear xhr timeout and rearm it if readyState less than 4
      window.clearTimeout(this.requestTimeout);
      if (stats.tfirst === 0) {
        stats.tfirst = Math.max(performance.now(), stats.trequest);
      }
      if (readyState === 4) {
        let status = xhr.status;
        // http status between 200 to 299 are all successful
        if (status >= 200 && status < 300)  {
          stats.tload = Math.max(stats.tfirst,performance.now());
          let data,len;
          if (context.responseType === 'arraybuffer') {
            data = xhr.response;
            len = data.byteLength;
          } else {
            data = xhr.responseText;
            len = data.length;
          }
          stats.loaded = stats.total = len;
          let response = { url : xhr.responseURL, data : data };
          this.callbacks.onSuccess(response, stats, context, xhr);
        } else {
            // if max nb of retries reached or if http status between 400 and 499 (such error cannot be recovered, retrying is useless), return error
          if (stats.retry >= config.maxRetry || (status >= 400 && status < 499)) {
            __WEBPACK_IMPORTED_MODULE_0__utils_logger__["b" /* logger */].error(`${status} while loading ${context.url}` );
            this.callbacks.onError({ code : status, text : xhr.statusText}, context, xhr);
          } else {
            // retry
            __WEBPACK_IMPORTED_MODULE_0__utils_logger__["b" /* logger */].warn(`${status} while loading ${context.url}, retrying in ${this.retryDelay}...`);
            // aborts and resets internal state
            this.destroy();
            // schedule retry
            this.retryTimeout = window.setTimeout(this.loadInternal.bind(this), this.retryDelay);
            // set exponential backoff
            this.retryDelay = Math.min(2 * this.retryDelay, config.maxRetryDelay);
            stats.retry++;
          }
        }
      } else {
        // readyState >= 2 AND readyState !==4 (readyState = HEADERS_RECEIVED || LOADING) rearm timeout as xhr not finished yet
        this.requestTimeout = window.setTimeout(this.loadtimeout.bind(this), config.timeout);
      }
    }
  }

  loadtimeout() {
    __WEBPACK_IMPORTED_MODULE_0__utils_logger__["b" /* logger */].warn(`timeout while loading ${this.context.url}` );
    this.callbacks.onTimeout(this.stats, this.context, null);
  }

  loadprogress(event) {
    var xhr = event.currentTarget,
        stats = this.stats;

    stats.loaded = event.loaded;
    if (event.lengthComputable) {
      stats.total = event.total;
    }
    let onProgress = this.callbacks.onProgress;
    if (onProgress) {
      // third arg is to provide on progress data
      onProgress(stats, this.context, null, xhr);
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (XhrLoader);


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__events__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__events__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__event_handler__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_logger__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__errors__ = __webpack_require__(2);
/*
 * audio track controller
*/






class AudioTrackController extends __WEBPACK_IMPORTED_MODULE_1__event_handler__["a" /* default */] {

  constructor(hls) {
    super(hls, __WEBPACK_IMPORTED_MODULE_0__events___default.a.MANIFEST_LOADING,
               __WEBPACK_IMPORTED_MODULE_0__events___default.a.MANIFEST_LOADED,
               __WEBPACK_IMPORTED_MODULE_0__events___default.a.AUDIO_TRACK_LOADED,
               __WEBPACK_IMPORTED_MODULE_0__events___default.a.ERROR);
    this.ticks = 0;
    this.ontick = this.tick.bind(this);
  }

  destroy() {
    this.cleanTimer();
    __WEBPACK_IMPORTED_MODULE_1__event_handler__["a" /* default */].prototype.destroy.call(this);
  }

  cleanTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  tick() {
    this.ticks++;
    if (this.ticks === 1) {
      this.doTick();
      if (this.ticks > 1) {
        setTimeout(this.tick, 1);
      }
      this.ticks = 0;
    }
  }

  doTick() {
    this.updateTrack(this.trackId);
  }

  onError(data) {
    if(data.fatal && data.type === __WEBPACK_IMPORTED_MODULE_3__errors__["b" /* ErrorTypes */].NETWORK_ERROR) {
      this.cleanTimer();
    }
  }

  onManifestLoading() {
    // reset audio tracks on manifest loading
    this.tracks = [];
    this.trackId = -1;
  }

  onManifestLoaded(data) {
    let tracks = data.audioTracks || [];
    let defaultFound = false;
    this.tracks = tracks;
    this.hls.trigger(__WEBPACK_IMPORTED_MODULE_0__events___default.a.AUDIO_TRACKS_UPDATED, {audioTracks : tracks});
    // loop through available audio tracks and autoselect default if needed
    let id = 0;
    tracks.forEach(track => {
      if(track.default && !defaultFound) {
        this.audioTrack = id;
        defaultFound = true;
        return;
      }
      id++;
    });
    if (defaultFound === false && tracks.length) {
      __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].log('no default audio track defined, use first audio track as default');
      this.audioTrack = 0;
    }
  }

  onAudioTrackLoaded(data) {
    if (data.id < this.tracks.length) {
      __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].log(`audioTrack ${data.id} loaded`);
      this.tracks[data.id].details = data.details;
      // check if current playlist is a live playlist
      if (data.details.live && !this.timer) {
        // if live playlist we will have to reload it periodically
        // set reload period to playlist target duration
        this.timer = setInterval(this.ontick, 1000 * data.details.targetduration);
      }
      if (!data.details.live && this.timer) {
        // playlist is not live and timer is armed : stopping it
        this.cleanTimer();
      }
    }
  }

  /** get alternate audio tracks list from playlist **/
  get audioTracks() {
    return this.tracks;
  }

  /** get index of the selected audio track (index in audio track lists) **/
  get audioTrack() {
   return this.trackId;
  }

  /** select an audio track, based on its index in audio track lists**/
  set audioTrack(audioTrackId) {
    if (this.trackId !== audioTrackId || this.tracks[audioTrackId].details === undefined) {
      this.setAudioTrackInternal(audioTrackId);
    }
  }

 setAudioTrackInternal(newId) {
    // check if level idx is valid
    if (newId >= 0 && newId < this.tracks.length) {
      // stopping live reloading timer if any
      this.cleanTimer();
      this.trackId = newId;
      __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].log(`switching to audioTrack ${newId}`);
      let audioTrack = this.tracks[newId],
          hls = this.hls,
          type = audioTrack.type,
          url = audioTrack.url,
          eventObj = {id: newId, type : type, url : url};
      // keep AUDIO_TRACK_SWITCH for legacy reason
      hls.trigger(__WEBPACK_IMPORTED_MODULE_0__events___default.a.AUDIO_TRACK_SWITCH, eventObj);
      hls.trigger(__WEBPACK_IMPORTED_MODULE_0__events___default.a.AUDIO_TRACK_SWITCHING, eventObj);
       // check if we need to load playlist for this audio Track
       let details = audioTrack.details;
      if (url && (details === undefined || details.live === true)) {
        // track not retrieved yet, or live playlist we need to (re)load it
        __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].log(`(re)loading playlist for audioTrack ${newId}`);
        hls.trigger(__WEBPACK_IMPORTED_MODULE_0__events___default.a.AUDIO_TRACK_LOADING, {url: url, id: newId});
      }
    }
  }

  updateTrack(newId) {
    // check if level idx is valid
    if (newId >= 0 && newId < this.tracks.length) {
      // stopping live reloading timer if any
      this.cleanTimer();
      this.trackId = newId;
      __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].log(`updating audioTrack ${newId}`);
      let audioTrack = this.tracks[newId], url = audioTrack.url;
       // check if we need to load playlist for this audio Track
       let details = audioTrack.details;
      if (url && (details === undefined || details.live === true)) {
        // track not retrieved yet, or live playlist we need to (re)load it
        __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].log(`(re)loading playlist for audioTrack ${newId}`);
        this.hls.trigger(__WEBPACK_IMPORTED_MODULE_0__events___default.a.AUDIO_TRACK_LOADING, {url: url, id: newId});
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (AudioTrackController);


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_binary_search__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_binary_search___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utils_binary_search__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_buffer_helper__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_buffer_helper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__helper_buffer_helper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__demux_demuxer__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__events__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__events__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__event_handler__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__helper_level_helper__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_timeRanges__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_timeRanges___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__utils_timeRanges__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__errors__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__utils_logger__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__utils_discontinuities__ = __webpack_require__(41);
/*
 * Audio Stream Controller
*/












const State = {
  STOPPED : 'STOPPED',
  STARTING : 'STARTING',
  IDLE : 'IDLE',
  PAUSED : 'PAUSED',
  KEY_LOADING : 'KEY_LOADING',
  FRAG_LOADING : 'FRAG_LOADING',
  FRAG_LOADING_WAITING_RETRY : 'FRAG_LOADING_WAITING_RETRY',
  WAITING_TRACK : 'WAITING_TRACK',
  PARSING : 'PARSING',
  PARSED : 'PARSED',
  BUFFER_FLUSHING : 'BUFFER_FLUSHING',
  ENDED : 'ENDED',
  ERROR : 'ERROR',
  WAITING_INIT_PTS : 'WAITING_INIT_PTS'
};

class AudioStreamController extends __WEBPACK_IMPORTED_MODULE_4__event_handler__["a" /* default */] {

  constructor(hls) {
    super(hls,
      __WEBPACK_IMPORTED_MODULE_3__events___default.a.MEDIA_ATTACHED,
      __WEBPACK_IMPORTED_MODULE_3__events___default.a.MEDIA_DETACHING,
      __WEBPACK_IMPORTED_MODULE_3__events___default.a.AUDIO_TRACKS_UPDATED,
      __WEBPACK_IMPORTED_MODULE_3__events___default.a.AUDIO_TRACK_SWITCHING,
      __WEBPACK_IMPORTED_MODULE_3__events___default.a.AUDIO_TRACK_LOADED,
      __WEBPACK_IMPORTED_MODULE_3__events___default.a.KEY_LOADED,
      __WEBPACK_IMPORTED_MODULE_3__events___default.a.FRAG_LOADED,
      __WEBPACK_IMPORTED_MODULE_3__events___default.a.FRAG_PARSING_INIT_SEGMENT,
      __WEBPACK_IMPORTED_MODULE_3__events___default.a.FRAG_PARSING_DATA,
      __WEBPACK_IMPORTED_MODULE_3__events___default.a.FRAG_PARSED,
      __WEBPACK_IMPORTED_MODULE_3__events___default.a.ERROR,
      __WEBPACK_IMPORTED_MODULE_3__events___default.a.BUFFER_CREATED,
      __WEBPACK_IMPORTED_MODULE_3__events___default.a.BUFFER_APPENDED,
      __WEBPACK_IMPORTED_MODULE_3__events___default.a.BUFFER_FLUSHED,
      __WEBPACK_IMPORTED_MODULE_3__events___default.a.INIT_PTS_FOUND);

    this.config = hls.config;
    this.audioCodecSwap = false;
    this.ticks = 0;
    this._state = State.STOPPED;
    this.ontick = this.tick.bind(this);
    this.initPTS=[];
    this.waitingFragment=null;
    this.videoTrackCC = null;
  }

  destroy() {
    this.stopLoad();
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    __WEBPACK_IMPORTED_MODULE_4__event_handler__["a" /* default */].prototype.destroy.call(this);
    this.state = State.STOPPED;
  }

  //Signal that video PTS was found
  onInitPtsFound(data) {
    var demuxerId=data.id, cc = data.frag.cc, initPTS = data.initPTS;
    if(demuxerId === 'main') {
      //Always update the new INIT PTS
      //Can change due level switch
      this.initPTS[cc] = initPTS;
      this.videoTrackCC = cc;
      __WEBPACK_IMPORTED_MODULE_8__utils_logger__["b" /* logger */].log(`InitPTS for cc:${cc} found from video track:${initPTS}`);

      //If we are waiting we need to demux/remux the waiting frag
      //With the new initPTS
      if (this.state === State.WAITING_INIT_PTS) {
        this.tick();
      }
    }
  }

  startLoad(startPosition) {
    if (this.tracks) {
      var lastCurrentTime = this.lastCurrentTime;
      this.stopLoad();
      if (!this.timer) {
        this.timer = setInterval(this.ontick, 100);
      }
      this.fragLoadError = 0;
      if (lastCurrentTime > 0 && startPosition === -1) {
        __WEBPACK_IMPORTED_MODULE_8__utils_logger__["b" /* logger */].log(`audio:override startPosition with lastCurrentTime @${lastCurrentTime.toFixed(3)}`);
        this.state = State.IDLE;
      } else {
        this.lastCurrentTime = this.startPosition ? this.startPosition : startPosition;
        this.state = State.STARTING;
      }
      this.nextLoadPosition = this.startPosition = this.lastCurrentTime;
      this.tick();
    } else {
      this.startPosition = startPosition;
      this.state = State.STOPPED;
    }
  }

  stopLoad() {
    var frag = this.fragCurrent;
    if (frag) {
      if (frag.loader) {
        frag.loader.abort();
      }
      this.fragCurrent = null;
    }
    this.fragPrevious = null;
    if (this.demuxer) {
      this.demuxer.destroy();
      this.demuxer = null;
    }
    this.state = State.STOPPED;
  }

  set state(nextState) {
    if (this.state !== nextState) {
      const previousState = this.state;
      this._state = nextState;
      __WEBPACK_IMPORTED_MODULE_8__utils_logger__["b" /* logger */].log(`audio stream:${previousState}->${nextState}`);
    }
  }

  get state() {
    return this._state;
  }

  tick() {
    this.ticks++;
    if (this.ticks === 1) {
      this.doTick();
      if (this.ticks > 1) {
        setTimeout(this.tick, 1);
      }
      this.ticks = 0;
    }
  }

  doTick() {
    var pos, track, trackDetails, hls = this.hls, config = hls.config;
    //logger.log('audioStream:' + this.state);
    switch(this.state) {
      case State.ERROR:
        //don't do anything in error state to avoid breaking further ...
      case State.PAUSED:
        //don't do anything in paused state either ...
      case State.BUFFER_FLUSHING:
        break;
      case State.STARTING:
        this.state = State.WAITING_TRACK;
        this.loadedmetadata = false;
        break;
      case State.IDLE:
        const tracks = this.tracks;
        // audio tracks not received => exit loop
        if (!tracks) {
          break;
        }
        // if video not attached AND
        // start fragment already requested OR start frag prefetch disable
        // exit loop
        // => if media not attached but start frag prefetch is enabled and start frag not requested yet, we will not exit loop
        if (!this.media &&
          (this.startFragRequested || !config.startFragPrefetch)) {
          break;
        }
        // determine next candidate fragment to be loaded, based on current position and
        //  end of buffer position
        // if we have not yet loaded any fragment, start loading from start position
        if (this.loadedmetadata) {
          pos = this.media.currentTime;
        } else {
          pos = this.nextLoadPosition;
          if (pos === undefined) {
            break;
          }
        }
        let media = this.mediaBuffer ? this.mediaBuffer : this.media,
            bufferInfo = __WEBPACK_IMPORTED_MODULE_1__helper_buffer_helper___default.a.bufferInfo(media,pos,config.maxBufferHole),
            bufferLen = bufferInfo.len,
            bufferEnd = bufferInfo.end,
            fragPrevious = this.fragPrevious,
            maxBufLen = config.maxMaxBufferLength,
            audioSwitch = this.audioSwitch,
            trackId = this.trackId;

        // if buffer length is less than maxBufLen try to load a new fragment
        if ((bufferLen < maxBufLen || audioSwitch) && trackId < tracks.length) {
          trackDetails = tracks[trackId].details;
          // if track info not retrieved yet, switch state and wait for track retrieval
          if (typeof trackDetails === 'undefined') {
            this.state = State.WAITING_TRACK;
            break;
          }

          // we just got done loading the final fragment, check if we need to finalize media stream
          if (!audioSwitch && !trackDetails.live && fragPrevious && fragPrevious.sn === trackDetails.endSN) {
              // if we are not seeking or if we are seeking but everything (almost) til the end is buffered, let's signal eos
              // we don't compare exactly media.duration === bufferInfo.end as there could be some subtle media duration difference when switching
              // between different renditions. using half frag duration should help cope with these cases.
              if (!this.media.seeking || (this.media.duration-bufferEnd) < fragPrevious.duration/2) {
              // Finalize the media stream
              this.hls.trigger(__WEBPACK_IMPORTED_MODULE_3__events___default.a.BUFFER_EOS,{ type : 'audio'});
              this.state = State.ENDED;
              break;
            }
          }

          // find fragment index, contiguous with end of buffer position
          let fragments = trackDetails.fragments,
              fragLen = fragments.length,
              start = fragments[0].start,
              end = fragments[fragLen-1].start + fragments[fragLen-1].duration,
              frag;

          // When switching audio track, reload audio as close as possible to currentTime
          if(audioSwitch){
            if (trackDetails.live && !trackDetails.PTSKnown) {
              __WEBPACK_IMPORTED_MODULE_8__utils_logger__["b" /* logger */].log(`switching audiotrack, live stream, unknown PTS,load first fragment`);
              bufferEnd = 0;
            } else {
              bufferEnd = pos;
              // if currentTime (pos) is less than alt audio playlist start time, it means that alt audio is ahead of currentTime
              if (trackDetails.PTSKnown && pos < start) {
                // if everything is buffered from pos to start or if audio buffer upfront, let's seek to start
                if (bufferInfo.end > start || bufferInfo.nextStart) {
                  __WEBPACK_IMPORTED_MODULE_8__utils_logger__["b" /* logger */].log('alt audio track ahead of main track, seek to start of alt audio track');
                  this.media.currentTime = start + 0.05;
                } else {
                  return;
                }
              }
            }
          }
          if (trackDetails.initSegment && !trackDetails.initSegment.data) {
              frag = trackDetails.initSegment;
           }
          // if bufferEnd before start of playlist, load first fragment
          else if (bufferEnd <= start) {
            frag = fragments[0];
            if (this.videoTrackCC !== null && frag.cc !== this.videoTrackCC) {
              // Ensure we find a fragment which matches the continuity of the video track
              frag = __WEBPACK_IMPORTED_MODULE_9__utils_discontinuities__["a" /* findFragWithCC */](fragments, this.videoTrackCC);
            }
            if (trackDetails.live && frag.loadIdx && frag.loadIdx === this.fragLoadIdx) {
              // we just loaded this first fragment, and we are still lagging behind the start of the live playlist
              // let's force seek to start
              const nextBuffered = bufferInfo.nextStart ? bufferInfo.nextStart : start;
              __WEBPACK_IMPORTED_MODULE_8__utils_logger__["b" /* logger */].log(`no alt audio available @currentTime:${this.media.currentTime}, seeking @${nextBuffered + 0.05}`);
              this.media.currentTime = nextBuffered + 0.05;
              return;
            }
          } else {
            let foundFrag;
            let maxFragLookUpTolerance = config.maxFragLookUpTolerance;
            const fragNext = fragPrevious ? fragments[fragPrevious.sn - fragments[0].sn + 1] : undefined;
            let fragmentWithinToleranceTest = (candidate) => {
              // offset should be within fragment boundary - config.maxFragLookUpTolerance
              // this is to cope with situations like
              // bufferEnd = 9.991
              // frag[Ø] : [0,10]
              // frag[1] : [10,20]
              // bufferEnd is within frag[0] range ... although what we are expecting is to return frag[1] here
              //              frag start               frag start+duration
              //                  |-----------------------------|
              //              <--->                         <--->
              //  ...--------><-----------------------------><---------....
              // previous frag         matching fragment         next frag
              //  return -1             return 0                 return 1
              //logger.log(`level/sn/start/end/bufEnd:${level}/${candidate.sn}/${candidate.start}/${(candidate.start+candidate.duration)}/${bufferEnd}`);
              // Set the lookup tolerance to be small enough to detect the current segment - ensures we don't skip over very small segments
              let candidateLookupTolerance = Math.min(maxFragLookUpTolerance, candidate.duration);
              if ((candidate.start + candidate.duration - candidateLookupTolerance) <= bufferEnd) {
                return 1;
              }// if maxFragLookUpTolerance will have negative value then don't return -1 for first element
              else if (candidate.start - candidateLookupTolerance > bufferEnd && candidate.start) {
                return -1;
              }
              return 0;
            };

            if (bufferEnd < end) {
              if (bufferEnd > end - maxFragLookUpTolerance) {
                maxFragLookUpTolerance = 0;
              }
              // Prefer the next fragment if it's within tolerance
              if (fragNext && !fragmentWithinToleranceTest(fragNext)) {
                foundFrag = fragNext;
              } else {
                foundFrag = __WEBPACK_IMPORTED_MODULE_0__utils_binary_search___default.a.search(fragments, fragmentWithinToleranceTest);
              }
            } else {
              // reach end of playlist
              foundFrag = fragments[fragLen-1];
            }
            if (foundFrag) {
              frag = foundFrag;
              start = foundFrag.start;
              //logger.log('find SN matching with pos:' +  bufferEnd + ':' + frag.sn);
              if (fragPrevious && frag.level === fragPrevious.level && frag.sn === fragPrevious.sn) {
                if (frag.sn < trackDetails.endSN) {
                  frag = fragments[frag.sn + 1 - trackDetails.startSN];
                  __WEBPACK_IMPORTED_MODULE_8__utils_logger__["b" /* logger */].log(`SN just loaded, load next one: ${frag.sn}`);
                } else {
                  frag = null;
                }
              }
            }
          }
          if(frag) {
            //logger.log('      loading frag ' + i +',pos/bufEnd:' + pos.toFixed(3) + '/' + bufferEnd.toFixed(3));
            if (frag.decryptdata && (frag.decryptdata.uri != null) && (frag.decryptdata.key == null)) {
              __WEBPACK_IMPORTED_MODULE_8__utils_logger__["b" /* logger */].log(`Loading key for ${frag.sn} of [${trackDetails.startSN} ,${trackDetails.endSN}],track ${trackId}`);
              this.state = State.KEY_LOADING;
              hls.trigger(__WEBPACK_IMPORTED_MODULE_3__events___default.a.KEY_LOADING, {frag: frag});
            } else {
              __WEBPACK_IMPORTED_MODULE_8__utils_logger__["b" /* logger */].log(`Loading ${frag.sn}, cc: ${frag.cc} of [${trackDetails.startSN} ,${trackDetails.endSN}],track ${trackId}, currentTime:${pos},bufferEnd:${bufferEnd.toFixed(3)}`);
              // ensure that we are not reloading the same fragments in loop ...
              if (this.fragLoadIdx !== undefined) {
                this.fragLoadIdx++;
              } else {
                this.fragLoadIdx = 0;
              }
              if (frag.loadCounter) {
                frag.loadCounter++;
                let maxThreshold = config.fragLoadingLoopThreshold;
                // if this frag has already been loaded 3 times, and if it has been reloaded recently
                if (frag.loadCounter > maxThreshold && (Math.abs(this.fragLoadIdx - frag.loadIdx) < maxThreshold)) {
                  hls.trigger(__WEBPACK_IMPORTED_MODULE_3__events___default.a.ERROR, {type: __WEBPACK_IMPORTED_MODULE_7__errors__["b" /* ErrorTypes */].MEDIA_ERROR, details: __WEBPACK_IMPORTED_MODULE_7__errors__["a" /* ErrorDetails */].FRAG_LOOP_LOADING_ERROR, fatal: false, frag: frag});
                  return;
                }
              } else {
                frag.loadCounter = 1;
              }
              frag.loadIdx = this.fragLoadIdx;
              this.fragCurrent = frag;
              this.startFragRequested = true;
              if (!isNaN(frag.sn)) {
                this.nextLoadPosition = frag.start + frag.duration;
              }
              hls.trigger(__WEBPACK_IMPORTED_MODULE_3__events___default.a.FRAG_LOADING, {frag: frag});
              this.state = State.FRAG_LOADING;
            }
          }
        }
        break;
      case State.WAITING_TRACK:
        track = this.tracks[this.trackId];
        // check if playlist is already loaded
        if (track && track.details) {
          this.state = State.IDLE;
        }
        break;
      case State.FRAG_LOADING_WAITING_RETRY:
        var now = performance.now();
        var retryDate = this.retryDate;
        media = this.media;
        var isSeeking = media && media.seeking;
        // if current time is gt than retryDate, or if media seeking let's switch to IDLE state to retry loading
        if(!retryDate || (now >= retryDate) || isSeeking) {
          __WEBPACK_IMPORTED_MODULE_8__utils_logger__["b" /* logger */].log(`audioStreamController: retryDate reached, switch back to IDLE state`);
          this.state = State.IDLE;
        }
        break;
      case State.WAITING_INIT_PTS:
        if (this.initPTS[this.videoTrackCC] === undefined) {
          break;
        }

        // Ensure we don't get stuck in the WAITING_INIT_PTS state if the waiting frag CC doesn't match any initPTS
        const waitingFrag = this.waitingFragment;
        if (waitingFrag) {
          const waitingFragCC = waitingFrag.frag.cc;
          if (this.videoTrackCC !== waitingFragCC) {
            __WEBPACK_IMPORTED_MODULE_8__utils_logger__["b" /* logger */].warn(`Waiting fragment CC (${waitingFragCC}) does not match video track CC (${this.videoTrackCC})`);
            this.waitingFragment = null;
            this.state = State.IDLE;
          } else {
            this.state = State.FRAG_LOADING;
            this.onFragLoaded(this.waitingFragment);
            this.waitingFragment = null;
          }
        } else {
          this.state = State.IDLE;
        }

        break;
      case State.STOPPED:
      case State.FRAG_LOADING:
      case State.PARSING:
      case State.PARSED:
      case State.ENDED:
        break;
      default:
        break;
    }
  }

  onMediaAttached(data) {
    var media = this.media = this.mediaBuffer = data.media;
    this.onvseeking = this.onMediaSeeking.bind(this);
    this.onvended = this.onMediaEnded.bind(this);
    media.addEventListener('seeking', this.onvseeking);
    media.addEventListener('ended', this.onvended);
    let config = this.config;
    if(this.tracks && config.autoStartLoad) {
      this.startLoad(config.startPosition);
    }
  }

  onMediaDetaching() {
    var media = this.media;
    if (media && media.ended) {
      __WEBPACK_IMPORTED_MODULE_8__utils_logger__["b" /* logger */].log('MSE detaching and video ended, reset startPosition');
      this.startPosition = this.lastCurrentTime = 0;
    }

    // reset fragment loading counter on MSE detaching to avoid reporting FRAG_LOOP_LOADING_ERROR after error recovery
    var tracks = this.tracks;
    if (tracks) {
      // reset fragment load counter
        tracks.forEach(track => {
          if(track.details) {
            track.details.fragments.forEach(fragment => {
              fragment.loadCounter = undefined;
            });
          }
      });
    }
    // remove video listeners
    if (media) {
      media.removeEventListener('seeking', this.onvseeking);
      media.removeEventListener('ended', this.onvended);
      this.onvseeking = this.onvseeked  = this.onvended = null;
    }
    this.media = this.mediaBuffer = null;
    this.loadedmetadata = false;
    this.stopLoad();
  }

  onMediaSeeking() {
    if (this.state === State.ENDED) {
        // switch to IDLE state to check for potential new fragment
        this.state = State.IDLE;
    }
    if (this.media) {
      this.lastCurrentTime = this.media.currentTime;
    }
    // avoid reporting fragment loop loading error in case user is seeking several times on same position
    if (this.fragLoadIdx !== undefined) {
      this.fragLoadIdx += 2 * this.config.fragLoadingLoopThreshold;
    }
    // tick to speed up processing
    this.tick();
  }

  onMediaEnded() {
    // reset startPosition and lastCurrentTime to restart playback @ stream beginning
    this.startPosition = this.lastCurrentTime = 0;
  }


  onAudioTracksUpdated(data) {
    __WEBPACK_IMPORTED_MODULE_8__utils_logger__["b" /* logger */].log('audio tracks updated');
    this.tracks = data.audioTracks;
  }

  onAudioTrackSwitching(data) {
    // if any URL found on new audio track, it is an alternate audio track
    var altAudio = !!data.url;
    this.trackId = data.id;

    this.fragCurrent = null;
    this.state = State.PAUSED;
    this.waitingFragment=null;
    // destroy useless demuxer when switching audio to main
    if (!altAudio) {
      if (this.demuxer) {
        this.demuxer.destroy();
        this.demuxer = null;
      }
    } else {
      // switching to audio track, start timer if not already started
      if (!this.timer) {
        this.timer = setInterval(this.ontick, 100);
      }
    }

    //should we switch tracks ?
    if(altAudio){
      this.audioSwitch = true;
      //main audio track are handled by stream-controller, just do something if switching to alt audio track
      this.state=State.IDLE;
      // increase fragment load Index to avoid frag loop loading error after buffer flush
      if (this.fragLoadIdx !== undefined) {
        this.fragLoadIdx += 2 * this.config.fragLoadingLoopThreshold;
      }
    }
    this.tick();
  }

  onAudioTrackLoaded(data) {
    var newDetails = data.details,
        trackId = data.id,
        track = this.tracks[trackId],
        duration = newDetails.totalduration,
        sliding = 0;

    __WEBPACK_IMPORTED_MODULE_8__utils_logger__["b" /* logger */].log(`track ${trackId} loaded [${newDetails.startSN},${newDetails.endSN}],duration:${duration}`);

    if (newDetails.live) {
      var curDetails = track.details;
      if (curDetails && newDetails.fragments.length > 0) {
        // we already have details for that level, merge them
        __WEBPACK_IMPORTED_MODULE_5__helper_level_helper__["default"].mergeDetails(curDetails,newDetails);
        sliding = newDetails.fragments[0].start;
        // TODO
        //this.liveSyncPosition = this.computeLivePosition(sliding, curDetails);
        if (newDetails.PTSKnown) {
          __WEBPACK_IMPORTED_MODULE_8__utils_logger__["b" /* logger */].log(`live audio playlist sliding:${sliding.toFixed(3)}`);
        } else {
          __WEBPACK_IMPORTED_MODULE_8__utils_logger__["b" /* logger */].log('live audio playlist - outdated PTS, unknown sliding');
        }
      } else {
        newDetails.PTSKnown = false;
        __WEBPACK_IMPORTED_MODULE_8__utils_logger__["b" /* logger */].log('live audio playlist - first load, unknown sliding');
      }
    } else {
      newDetails.PTSKnown = false;
    }
    track.details = newDetails;

    // compute start position
    if (!this.startFragRequested) {
    // compute start position if set to -1. use it straight away if value is defined
      if (this.startPosition === -1) {
        // first, check if start time offset has been set in playlist, if yes, use this value
        let startTimeOffset = newDetails.startTimeOffset;
        if(!isNaN(startTimeOffset)) {
          __WEBPACK_IMPORTED_MODULE_8__utils_logger__["b" /* logger */].log(`start time offset found in playlist, adjust startPosition to ${startTimeOffset}`);
          this.startPosition = startTimeOffset;
        } else {
          this.startPosition = 0;
        }
      }
      this.nextLoadPosition = this.startPosition;
    }
    // only switch batck to IDLE state if we were waiting for track to start downloading a new fragment
    if (this.state === State.WAITING_TRACK) {
      this.state = State.IDLE;
    }
    //trigger handler right now
    this.tick();
  }

  onKeyLoaded() {
    if (this.state === State.KEY_LOADING) {
      this.state = State.IDLE;
      this.tick();
    }
  }

  onFragLoaded(data) {
    var fragCurrent = this.fragCurrent,
        fragLoaded = data.frag;
    if (this.state === State.FRAG_LOADING &&
        fragCurrent &&
        fragLoaded.type === 'audio' &&
        fragLoaded.level === fragCurrent.level &&
        fragLoaded.sn === fragCurrent.sn) {
        var track = this.tracks[this.trackId],
            details = track.details,
            duration = details.totalduration,
            trackId = fragCurrent.level,
            sn = fragCurrent.sn,
            cc = fragCurrent.cc,
            audioCodec = this.config.defaultAudioCodec || track.audioCodec || 'mp4a.40.2',
            stats = this.stats = data.stats;
      if (sn === 'initSegment') {
        this.state = State.IDLE;

        stats.tparsed = stats.tbuffered = performance.now();
        details.initSegment.data = data.payload;
        this.hls.trigger(__WEBPACK_IMPORTED_MODULE_3__events___default.a.FRAG_BUFFERED, {stats: stats, frag: fragCurrent, id : 'audio'});
        this.tick();
      } else {
        this.state = State.PARSING;
        // transmux the MPEG-TS data to ISO-BMFF segments
        this.appended = false;
        if(!this.demuxer) {
          this.demuxer = new __WEBPACK_IMPORTED_MODULE_2__demux_demuxer__["a" /* default */](this.hls,'audio');
        }
        //Check if we have video initPTS
        // If not we need to wait for it
        let initPTS = this.initPTS[cc];
        let initSegmentData = details.initSegment ? details.initSegment.data : [];
        if (details.initSegment || initPTS !== undefined) {
          this.pendingBuffering = true;
          __WEBPACK_IMPORTED_MODULE_8__utils_logger__["b" /* logger */].log(`Demuxing ${sn} of [${details.startSN} ,${details.endSN}],track ${trackId}`);
          // time Offset is accurate if level PTS is known, or if playlist is not sliding (not live)
          let accurateTimeOffset = false; //details.PTSKnown || !details.live;
          this.demuxer.push(data.payload, initSegmentData, audioCodec, null, fragCurrent, duration, accurateTimeOffset, initPTS);
        } else {
          __WEBPACK_IMPORTED_MODULE_8__utils_logger__["b" /* logger */].log(`unknown video PTS for continuity counter ${cc}, waiting for video PTS before demuxing audio frag ${sn} of [${details.startSN} ,${details.endSN}],track ${trackId}`);
          this.waitingFragment=data;
          this.state=State.WAITING_INIT_PTS;
        }
      }
    }
    this.fragLoadError = 0;
  }

  onFragParsingInitSegment(data) {
    const fragCurrent = this.fragCurrent;
    const fragNew = data.frag;
    if (fragCurrent &&
        data.id === 'audio' &&
        fragNew.sn === fragCurrent.sn &&
        fragNew.level === fragCurrent.level &&
        this.state === State.PARSING) {
      let tracks = data.tracks, track;

      // delete any video track found on audio demuxer
      if (tracks.video) {
        delete tracks.video;
      }

      // include levelCodec in audio and video tracks
      track = tracks.audio;
      if(track) {
        track.levelCodec = track.codec;
        track.id = data.id;
        this.hls.trigger(__WEBPACK_IMPORTED_MODULE_3__events___default.a.BUFFER_CODECS,tracks);
        __WEBPACK_IMPORTED_MODULE_8__utils_logger__["b" /* logger */].log(`audio track:audio,container:${track.container},codecs[level/parsed]=[${track.levelCodec}/${track.codec}]`);
        let initSegment = track.initSegment;
        if (initSegment) {
          let appendObj = {type: 'audio', data: initSegment, parent : 'audio',content : 'initSegment'};
          if (this.audioSwitch) {
            this.pendingData = [appendObj];
          } else {
            this.appended = true;
            // arm pending Buffering flag before appending a segment
            this.pendingBuffering = true;
            this.hls.trigger(__WEBPACK_IMPORTED_MODULE_3__events___default.a.BUFFER_APPENDING, appendObj);
          }
        }
        //trigger handler right now
        this.tick();
      }
    }
  }

  onFragParsingData(data) {
    const fragCurrent = this.fragCurrent;
    const fragNew = data.frag;
    if (fragCurrent &&
        data.id === 'audio' &&
        data.type === 'audio' &&
        fragNew.sn === fragCurrent.sn &&
        fragNew.level === fragCurrent.level &&
        this.state === State.PARSING) {
      let trackId= this.trackId,
          track = this.tracks[trackId],
          hls = this.hls;

      if (isNaN(data.endPTS)) {
        data.endPTS = data.startPTS + fragCurrent.duration;
        data.endDTS = data.startDTS + fragCurrent.duration;
      }

      __WEBPACK_IMPORTED_MODULE_8__utils_logger__["b" /* logger */].log(`parsed ${data.type},PTS:[${data.startPTS.toFixed(3)},${data.endPTS.toFixed(3)}],DTS:[${data.startDTS.toFixed(3)}/${data.endDTS.toFixed(3)}],nb:${data.nb}`);
      __WEBPACK_IMPORTED_MODULE_5__helper_level_helper__["default"].updateFragPTSDTS(track.details,fragCurrent,data.startPTS,data.endPTS);

      let audioSwitch = this.audioSwitch, media = this.media, appendOnBufferFlush = false;
      //Only flush audio from old audio tracks when PTS is known on new audio track
      if(audioSwitch && media) {
        if (media.readyState) {
          let currentTime = media.currentTime;
          __WEBPACK_IMPORTED_MODULE_8__utils_logger__["b" /* logger */].log('switching audio track : currentTime:'+ currentTime);
          if (currentTime >= data.startPTS) {
            __WEBPACK_IMPORTED_MODULE_8__utils_logger__["b" /* logger */].log('switching audio track : flushing all audio');
            this.state = State.BUFFER_FLUSHING;
            hls.trigger(__WEBPACK_IMPORTED_MODULE_3__events___default.a.BUFFER_FLUSHING, {startOffset: 0 , endOffset: Number.POSITIVE_INFINITY, type : 'audio'});
            appendOnBufferFlush = true;
            //Lets announce that the initial audio track switch flush occur
            this.audioSwitch = false;
            hls.trigger(__WEBPACK_IMPORTED_MODULE_3__events___default.a.AUDIO_TRACK_SWITCHED, {id : trackId});
          }
        } else {
          //Lets announce that the initial audio track switch flush occur
          this.audioSwitch=false;
          hls.trigger(__WEBPACK_IMPORTED_MODULE_3__events___default.a.AUDIO_TRACK_SWITCHED, {id : trackId});
        }
      }


      let pendingData = this.pendingData;
      if(!this.audioSwitch) {
        [data.data1, data.data2].forEach(buffer => {
          if (buffer && buffer.length) {
            pendingData.push({type: data.type, data: buffer, parent : 'audio',content : 'data'});
          }
        });
      if (!appendOnBufferFlush && pendingData.length) {
          pendingData.forEach(appendObj => {
            // only append in PARSING state (rationale is that an appending error could happen synchronously on first segment appending)
            // in that case it is useless to append following segments
            if (this.state === State.PARSING) {
              // arm pending Buffering flag before appending a segment
              this.pendingBuffering = true;
              this.hls.trigger(__WEBPACK_IMPORTED_MODULE_3__events___default.a.BUFFER_APPENDING, appendObj);
            }
          });
          this.pendingData = [];
          this.appended = true;
        }
      }
      //trigger handler right now
      this.tick();
    }
  }

  onFragParsed(data) {
    const fragCurrent = this.fragCurrent;
    const fragNew = data.frag;
    if (fragCurrent &&
        data.id === 'audio' &&
        fragNew.sn === fragCurrent.sn &&
        fragNew.level === fragCurrent.level &&
        this.state === State.PARSING) {
      this.stats.tparsed = performance.now();
      this.state = State.PARSED;
      this._checkAppendedParsed();
    }
  }


  onBufferCreated(data) {
    let audioTrack = data.tracks.audio;
    if (audioTrack) {
      this.mediaBuffer = audioTrack.buffer;
      this.loadedmetadata = true;
    }
  }

  onBufferAppended(data) {
    if (data.parent === 'audio') {
      const state = this.state;
      if (state === State.PARSING || state === State.PARSED) {
        // check if all buffers have been appended
        this.pendingBuffering = (data.pending > 0);
        this._checkAppendedParsed();
      }
    }
  }

  _checkAppendedParsed() {
    //trigger handler right now
    if (this.state === State.PARSED && (!this.appended || !this.pendingBuffering))   {
      let frag = this.fragCurrent, stats = this.stats, hls = this.hls;
      if (frag) {
        this.fragPrevious = frag;
        stats.tbuffered = performance.now();
        hls.trigger(__WEBPACK_IMPORTED_MODULE_3__events___default.a.FRAG_BUFFERED, {stats: stats, frag: frag, id : 'audio'});
        let media = this.mediaBuffer ? this.mediaBuffer : this.media;
        __WEBPACK_IMPORTED_MODULE_8__utils_logger__["b" /* logger */].log(`audio buffered : ${__WEBPACK_IMPORTED_MODULE_6__utils_timeRanges___default.a.toString(media.buffered)}`);
        if (this.audioSwitch && this.appended) {
          this.audioSwitch = false;
          hls.trigger(__WEBPACK_IMPORTED_MODULE_3__events___default.a.AUDIO_TRACK_SWITCHED, {id : this.trackId});
        }
        this.state = State.IDLE;
      }
      this.tick();
    }
  }

  onError(data) {
    let frag = data.frag;
    // don't handle frag error not related to audio fragment
    if (frag && frag.type !== 'audio') {
      return;
    }
    switch(data.details) {
      case __WEBPACK_IMPORTED_MODULE_7__errors__["a" /* ErrorDetails */].FRAG_LOAD_ERROR:
      case __WEBPACK_IMPORTED_MODULE_7__errors__["a" /* ErrorDetails */].FRAG_LOAD_TIMEOUT:
        if(!data.fatal) {
          var loadError = this.fragLoadError;
          if(loadError) {
            loadError++;
          } else {
            loadError=1;
          }
          let config = this.config;
          if (loadError <= config.fragLoadingMaxRetry) {
            this.fragLoadError = loadError;
            // reset load counter to avoid frag loop loading error
            frag.loadCounter = 0;
            // exponential backoff capped to config.fragLoadingMaxRetryTimeout
            var delay = Math.min(Math.pow(2,loadError-1)*config.fragLoadingRetryDelay,config.fragLoadingMaxRetryTimeout);
            __WEBPACK_IMPORTED_MODULE_8__utils_logger__["b" /* logger */].warn(`audioStreamController: frag loading failed, retry in ${delay} ms`);
            this.retryDate = performance.now() + delay;
            // retry loading state
            this.state = State.FRAG_LOADING_WAITING_RETRY;
          } else {
            __WEBPACK_IMPORTED_MODULE_8__utils_logger__["b" /* logger */].error(`audioStreamController: ${data.details} reaches max retry, redispatch as fatal ...`);
            // switch error to fatal
            data.fatal = true;
            this.state = State.ERROR;
          }
        }
        break;
      case __WEBPACK_IMPORTED_MODULE_7__errors__["a" /* ErrorDetails */].FRAG_LOOP_LOADING_ERROR:
      case __WEBPACK_IMPORTED_MODULE_7__errors__["a" /* ErrorDetails */].AUDIO_TRACK_LOAD_ERROR:
      case __WEBPACK_IMPORTED_MODULE_7__errors__["a" /* ErrorDetails */].AUDIO_TRACK_LOAD_TIMEOUT:
      case __WEBPACK_IMPORTED_MODULE_7__errors__["a" /* ErrorDetails */].KEY_LOAD_ERROR:
      case __WEBPACK_IMPORTED_MODULE_7__errors__["a" /* ErrorDetails */].KEY_LOAD_TIMEOUT:
        //  when in ERROR state, don't switch back to IDLE state in case a non-fatal error is received
        if(this.state !== State.ERROR) {
            // if fatal error, stop processing, otherwise move to IDLE to retry loading
            this.state = data.fatal ? State.ERROR : State.IDLE;
            __WEBPACK_IMPORTED_MODULE_8__utils_logger__["b" /* logger */].warn(`audioStreamController: ${data.details} while loading frag,switch to ${this.state} state ...`);
        }
        break;
      case __WEBPACK_IMPORTED_MODULE_7__errors__["a" /* ErrorDetails */].BUFFER_FULL_ERROR:
        // if in appending state
        if (data.parent === 'audio' && (this.state === State.PARSING || this.state === State.PARSED)) {
          const media = this.mediaBuffer,
                currentTime = this.media.currentTime,
                mediaBuffered = media && __WEBPACK_IMPORTED_MODULE_1__helper_buffer_helper___default.a.isBuffered(media,currentTime) && __WEBPACK_IMPORTED_MODULE_1__helper_buffer_helper___default.a.isBuffered(media,currentTime+0.5);
          // reduce max buf len if current position is buffered
          if (mediaBuffered) {
            const config = this.config;
            if(config.maxMaxBufferLength >= config.maxBufferLength) {
              // reduce max buffer length as it might be too high. we do this to avoid loop flushing ...
              config.maxMaxBufferLength/=2;
              __WEBPACK_IMPORTED_MODULE_8__utils_logger__["b" /* logger */].warn(`audio:reduce max buffer length to ${config.maxMaxBufferLength}s`);
              // increase fragment load Index to avoid frag loop loading error after buffer flush
              this.fragLoadIdx += 2 * config.fragLoadingLoopThreshold;
            }
            this.state = State.IDLE;
          } else {
            // current position is not buffered, but browser is still complaining about buffer full error
            // this happens on IE/Edge, refer to https://github.com/video-dev/hls.js/pull/708
            // in that case flush the whole audio buffer to recover
            __WEBPACK_IMPORTED_MODULE_8__utils_logger__["b" /* logger */].warn('buffer full error also media.currentTime is not buffered, flush audio buffer');
            this.fragCurrent = null;
            // flush everything
            this.state = State.BUFFER_FLUSHING;
            this.hls.trigger(__WEBPACK_IMPORTED_MODULE_3__events___default.a.BUFFER_FLUSHING, {startOffset: 0 , endOffset: Number.POSITIVE_INFINITY, type : 'audio'});
          }
        }
        break;
      default:
        break;
    }
  }

  onBufferFlushed() {
    let pendingData = this.pendingData;
    if (pendingData && pendingData.length) {
      __WEBPACK_IMPORTED_MODULE_8__utils_logger__["b" /* logger */].log('appending pending audio data on Buffer Flushed');
      pendingData.forEach(appendObj => {
        this.hls.trigger(__WEBPACK_IMPORTED_MODULE_3__events___default.a.BUFFER_APPENDING, appendObj);
      });
      this.appended = true;
      this.pendingData = [];
      this.state = State.PARSED;
    } else {
      // move to IDLE once flush complete. this should trigger new fragment loading
      this.state = State.IDLE;
      // reset reference to frag
      this.fragPrevious = null;
      this.tick();
    }
  }
}
/* harmony default export */ __webpack_exports__["a"] = (AudioStreamController);



/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__events__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__events__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__demux_demuxer_inline__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__demux_demuxer_worker__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_logger__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__errors__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_events__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_events__);







class Demuxer {

  constructor(hls, id) {
    this.hls = hls;
    this.id = id;
    // observer setup
    const observer = this.observer = new __WEBPACK_IMPORTED_MODULE_5_events___default.a();
    const config = hls.config;
    observer.trigger = function trigger (event, ...data) {
      observer.emit(event, event, ...data);
    };

    observer.off = function off (event, ...data) {
      observer.removeListener(event, ...data);
    };

    var forwardMessage = function(ev,data) {
      data = data || {};
      data.frag = this.frag;
      data.id = this.id;
      hls.trigger(ev,data);
    }.bind(this);

    // forward events to main thread
    observer.on(__WEBPACK_IMPORTED_MODULE_0__events___default.a.FRAG_DECRYPTED, forwardMessage);
    observer.on(__WEBPACK_IMPORTED_MODULE_0__events___default.a.FRAG_PARSING_INIT_SEGMENT, forwardMessage);
    observer.on(__WEBPACK_IMPORTED_MODULE_0__events___default.a.FRAG_PARSING_DATA, forwardMessage);
    observer.on(__WEBPACK_IMPORTED_MODULE_0__events___default.a.FRAG_PARSED, forwardMessage);
    observer.on(__WEBPACK_IMPORTED_MODULE_0__events___default.a.ERROR, forwardMessage);
    observer.on(__WEBPACK_IMPORTED_MODULE_0__events___default.a.FRAG_PARSING_METADATA, forwardMessage);
    observer.on(__WEBPACK_IMPORTED_MODULE_0__events___default.a.FRAG_PARSING_USERDATA, forwardMessage);
    observer.on(__WEBPACK_IMPORTED_MODULE_0__events___default.a.INIT_PTS_FOUND, forwardMessage);

    const typeSupported = {
      mp4 : MediaSource.isTypeSupported('video/mp4'),
      mpeg: MediaSource.isTypeSupported('audio/mpeg'),
      mp3: MediaSource.isTypeSupported('audio/mp4; codecs="mp3"')
    };
    // navigator.vendor is not always available in Web Worker
    // refer to https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/navigator
    const vendor = navigator.vendor;
    if (config.enableWorker && (typeof(Worker) !== 'undefined')) {
        __WEBPACK_IMPORTED_MODULE_3__utils_logger__["b" /* logger */].log('demuxing in webworker');
        let w;
        try {
          let work = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"webworkify\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
          w = this.w = work(__WEBPACK_IMPORTED_MODULE_2__demux_demuxer_worker__["a" /* default */]);
          this.onwmsg = this.onWorkerMessage.bind(this);
          w.addEventListener('message', this.onwmsg);
          w.onerror = function(event) { hls.trigger(__WEBPACK_IMPORTED_MODULE_0__events___default.a.ERROR, {type: __WEBPACK_IMPORTED_MODULE_4__errors__["b" /* ErrorTypes */].OTHER_ERROR, details: __WEBPACK_IMPORTED_MODULE_4__errors__["a" /* ErrorDetails */].INTERNAL_EXCEPTION, fatal: true, event : 'demuxerWorker', err : { message : event.message + ' (' + event.filename + ':' + event.lineno + ')' }});};
          w.postMessage({cmd: 'init', typeSupported : typeSupported, vendor : vendor, id : id, config: JSON.stringify(config)});
        } catch(err) {
          __WEBPACK_IMPORTED_MODULE_3__utils_logger__["b" /* logger */].error('error while initializing DemuxerWorker, fallback on DemuxerInline');
          if (w) {
            // revoke the Object URL that was used to create demuxer worker, so as not to leak it
            URL.revokeObjectURL(w.objectURL);
          }
          this.demuxer = new __WEBPACK_IMPORTED_MODULE_1__demux_demuxer_inline__["a" /* default */](observer,typeSupported,config,vendor);
          this.w = undefined;
        }
      } else {
        this.demuxer = new __WEBPACK_IMPORTED_MODULE_1__demux_demuxer_inline__["a" /* default */](observer,typeSupported,config, vendor);
      }
  }

  destroy() {
    let w = this.w;
    if (w) {
      w.removeEventListener('message', this.onwmsg);
      w.terminate();
      this.w = null;
    } else {
      let demuxer = this.demuxer;
      if (demuxer) {
        demuxer.destroy();
        this.demuxer = null;
      }
    }
    let observer = this.observer;
    if (observer) {
      observer.removeAllListeners();
      this.observer = null;
    }
  }

  push(data, initSegment, audioCodec, videoCodec, frag, duration,accurateTimeOffset,defaultInitPTS) {
    const w = this.w;
    const timeOffset = !isNaN(frag.startDTS) ? frag.startDTS  : frag.start;
    const decryptdata = frag.decryptdata;
    const lastFrag = this.frag;
    const discontinuity = !(lastFrag && (frag.cc === lastFrag.cc));
    const trackSwitch = !(lastFrag && (frag.level === lastFrag.level));
    const nextSN = lastFrag && (frag.sn === (lastFrag.sn+1));
    const contiguous = !trackSwitch && nextSN;
    if (discontinuity) {
      __WEBPACK_IMPORTED_MODULE_3__utils_logger__["b" /* logger */].log(`${this.id}:discontinuity detected`);
    }
    if (trackSwitch) {
      __WEBPACK_IMPORTED_MODULE_3__utils_logger__["b" /* logger */].log(`${this.id}:switch detected`);
    }
    this.frag = frag;
    if (w) {
      // post fragment payload as transferable objects (no copy)
      w.postMessage({cmd: 'demux', data, decryptdata, initSegment, audioCodec, videoCodec, timeOffset, discontinuity, trackSwitch, contiguous, duration, accurateTimeOffset,defaultInitPTS}, [data]);
    } else {
      let demuxer = this.demuxer;
      if (demuxer) {
        demuxer.push(data, decryptdata, initSegment, audioCodec, videoCodec, timeOffset, discontinuity, trackSwitch, contiguous, duration, accurateTimeOffset,defaultInitPTS);
      }
    }
  }

  onWorkerMessage(ev) {
    let data = ev.data,
        hls = this.hls;
    //console.log('onWorkerMessage:' + data.event);
    switch(data.event) {
      case 'init':
        // revoke the Object URL that was used to create demuxer worker, so as not to leak it
        URL.revokeObjectURL(this.w.objectURL);
        break;
      // special case for FRAG_PARSING_DATA: data1 and data2 are transferable objects
      case __WEBPACK_IMPORTED_MODULE_0__events___default.a.FRAG_PARSING_DATA:
        data.data.data1 = new Uint8Array(data.data1);
        if (data.data2) {
          data.data.data2 = new Uint8Array(data.data2);
        }
        /* falls through */
      default:
        data.data = data.data || {};
        data.data.frag = this.frag;
        data.data.id = this.id;
        hls.trigger(data.event, data.data);
        break;
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Demuxer);



/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class AESCrypto {
  constructor(subtle,iv) {
    this.subtle = subtle;
    this.aesIV = iv;
  }

  decrypt(data, key) {
    return this.subtle.decrypt({name: 'AES-CBC', iv: this.aesIV}, key, data);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AESCrypto;



/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class FastAESKey {
  constructor(subtle,key) {
    this.subtle = subtle;
    this.key = key;
  }

  expandKey() {
    return this.subtle.importKey('raw', this.key, {name: 'AES-CBC'}, false, ['encrypt', 'decrypt']);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (FastAESKey);


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class AESDecryptor {
  constructor() {
    // Static after running initTable
    this.rcon = [0x0, 0x1, 0x2, 0x4, 0x8, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];
    this.subMix = [new Uint32Array(256),new Uint32Array(256),new Uint32Array(256),new Uint32Array(256)];
    this.invSubMix = [new Uint32Array(256),new Uint32Array(256),new Uint32Array(256),new Uint32Array(256)];
    this.sBox = new Uint32Array(256);
    this.invSBox = new Uint32Array(256);

    // Changes during runtime
    this.key = new Uint32Array(0);

    this.initTable();
  }

  // Using view.getUint32() also swaps the byte order.
  uint8ArrayToUint32Array_(arrayBuffer) {
    let view = new DataView(arrayBuffer);
    let newArray = new Uint32Array(4);
    for (let i = 0; i < 4; i++) {
      newArray[i] = view.getUint32(i * 4);
    }
    return newArray;
  }

  initTable() {
    let sBox = this.sBox;
    let invSBox = this.invSBox;
    let subMix = this.subMix;
    let subMix0 = subMix[0];
    let subMix1 = subMix[1];
    let subMix2 = subMix[2];
    let subMix3 = subMix[3];
    let invSubMix  = this.invSubMix;
    let invSubMix0 = invSubMix[0];
    let invSubMix1 = invSubMix[1];
    let invSubMix2 = invSubMix[2];
    let invSubMix3 = invSubMix[3];

    let d = new Uint32Array(256);
    let x = 0;
    let xi = 0;
    let i = 0;
    for (i = 0; i < 256; i++) {
      if (i < 128) {
        d[i] = i << 1;
      } else {
        d[i] = (i << 1) ^ 0x11b;
      }
    }

    for (i = 0; i < 256; i++) {
      let sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4);
      sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63;
      sBox[x] = sx;
      invSBox[sx] = x;

      // Compute multiplication
      let x2 = d[x];
      let x4 = d[x2];
      let x8 = d[x4];

      // Compute sub/invSub bytes, mix columns tables
      let t = (d[sx] * 0x101) ^ (sx * 0x1010100);
      subMix0[x] = (t << 24) | (t >>> 8);
      subMix1[x] = (t << 16) | (t >>> 16);
      subMix2[x] = (t << 8) | (t >>> 24);
      subMix3[x] = t;

      // Compute inv sub bytes, inv mix columns tables
      t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100);
      invSubMix0[sx] = (t << 24) | (t >>> 8);
      invSubMix1[sx] = (t << 16) | (t >>> 16);
      invSubMix2[sx] = (t << 8) | (t >>> 24);
      invSubMix3[sx] = t;

      // Compute next counter
      if (!x) {
        x = xi = 1;
      } else {
        x = x2 ^ d[d[d[x8 ^ x2]]];
        xi ^= d[d[xi]];
      }
    }
  }

  expandKey(keyBuffer) {
    // convert keyBuffer to Uint32Array
    let key = this.uint8ArrayToUint32Array_(keyBuffer);
    let sameKey = true;
    let offset = 0;

    while (offset < key.length && sameKey) {
      sameKey = (key[offset] === this.key[offset]);
      offset++;
    }

    if (sameKey) {
      return;
    }

    this.key = key;
    let keySize = this.keySize = key.length;

    if (keySize !== 4 && keySize !== 6 && keySize !== 8) {
      throw new Error('Invalid aes key size=' + keySize);
    }

    let ksRows = this.ksRows = (keySize + 6 + 1) * 4;
    let ksRow;
    let invKsRow;

    let keySchedule = this.keySchedule = new Uint32Array(ksRows);
    let invKeySchedule = this.invKeySchedule = new Uint32Array(ksRows);
    let sbox = this.sBox;
    let rcon = this.rcon;

    let invSubMix  = this.invSubMix;
    let invSubMix0 = invSubMix[0];
    let invSubMix1 = invSubMix[1];
    let invSubMix2 = invSubMix[2];
    let invSubMix3 = invSubMix[3];

    let prev;
    let t;

    for (ksRow = 0; ksRow < ksRows; ksRow++) {
      if (ksRow < keySize) {
        prev = keySchedule[ksRow] = key[ksRow];
        continue;
      }
      t = prev;

      if (ksRow % keySize === 0) {
        // Rot word
        t = (t << 8) | (t >>> 24);

        // Sub word
        t = (sbox[t >>> 24] << 24) | (sbox[(t >>> 16) & 0xff] << 16) | (sbox[(t >>> 8) & 0xff] << 8) | sbox[t & 0xff];

        // Mix Rcon
        t ^= rcon[(ksRow / keySize) | 0] << 24;
      } else if (keySize > 6 && ksRow % keySize === 4)  {
        // Sub word
        t = (sbox[t >>> 24] << 24) | (sbox[(t >>> 16) & 0xff] << 16) | (sbox[(t >>> 8) & 0xff] << 8) | sbox[t & 0xff];
      }

      keySchedule[ksRow] = prev = (keySchedule[ksRow - keySize] ^ t) >>> 0;
    }

    for (invKsRow = 0; invKsRow < ksRows; invKsRow++) {
      ksRow = ksRows - invKsRow;
      if (invKsRow & 3) {
        t = keySchedule[ksRow];
      } else {
        t = keySchedule[ksRow - 4];
      }

      if (invKsRow < 4 || ksRow <= 4) {
        invKeySchedule[invKsRow] = t;
      } else {
        invKeySchedule[invKsRow] = invSubMix0[sbox[t >>> 24]] ^ invSubMix1[sbox[(t >>> 16) & 0xff]] ^ invSubMix2[sbox[(t >>> 8) & 0xff]] ^ invSubMix3[sbox[t & 0xff]];
      }

      invKeySchedule[invKsRow] = invKeySchedule[invKsRow] >>> 0;
    }
  }

  // Adding this as a method greatly improves performance.
  networkToHostOrderSwap(word) {
    return (word << 24) | ((word & 0xff00) << 8) | ((word & 0xff0000) >> 8) | (word >>> 24);
  }

  decrypt(inputArrayBuffer, offset, aesIV) {
    let nRounds = this.keySize + 6;
    let invKeySchedule = this.invKeySchedule;
    let invSBOX = this.invSBox;

    let invSubMix  = this.invSubMix;
    let invSubMix0 = invSubMix[0];
    let invSubMix1 = invSubMix[1];
    let invSubMix2 = invSubMix[2];
    let invSubMix3 = invSubMix[3];

    let initVector = this.uint8ArrayToUint32Array_(aesIV);
    let initVector0 = initVector[0];
    let initVector1 = initVector[1];
    let initVector2 = initVector[2];
    let initVector3 = initVector[3];

    let inputInt32 = new Int32Array(inputArrayBuffer);
    let outputInt32 = new Int32Array(inputInt32.length);

    let t0, t1, t2, t3;
    let s0, s1, s2, s3;
    let inputWords0, inputWords1, inputWords2, inputWords3;

    var ksRow, i;
    let swapWord = this.networkToHostOrderSwap;

    while (offset < inputInt32.length) {
      inputWords0 = swapWord(inputInt32[offset]);
      inputWords1 = swapWord(inputInt32[offset + 1]);
      inputWords2 = swapWord(inputInt32[offset + 2]);
      inputWords3 = swapWord(inputInt32[offset + 3]);

      s0 = inputWords0 ^ invKeySchedule[0];
      s1 = inputWords3 ^ invKeySchedule[1];
      s2 = inputWords2 ^ invKeySchedule[2];
      s3 = inputWords1 ^ invKeySchedule[3];

      ksRow = 4;

      // Iterate through the rounds of decryption
      for (i = 1; i < nRounds; i++) {
        t0 = invSubMix0[s0 >>> 24] ^ invSubMix1[(s1 >> 16) & 0xff] ^ invSubMix2[(s2 >> 8) & 0xff] ^ invSubMix3[s3 & 0xff] ^ invKeySchedule[ksRow];
        t1 = invSubMix0[s1 >>> 24] ^ invSubMix1[(s2 >> 16) & 0xff] ^ invSubMix2[(s3 >> 8) & 0xff] ^ invSubMix3[s0 & 0xff] ^ invKeySchedule[ksRow + 1];
        t2 = invSubMix0[s2 >>> 24] ^ invSubMix1[(s3 >> 16) & 0xff] ^ invSubMix2[(s0 >> 8) & 0xff] ^ invSubMix3[s1 & 0xff] ^ invKeySchedule[ksRow + 2];
        t3 = invSubMix0[s3 >>> 24] ^ invSubMix1[(s0 >> 16) & 0xff] ^ invSubMix2[(s1 >> 8) & 0xff] ^ invSubMix3[s2 & 0xff] ^ invKeySchedule[ksRow + 3];
        // Update state
        s0 = t0;
        s1 = t1;
        s2 = t2;
        s3 = t3;

        ksRow = ksRow + 4;
      }

      // Shift rows, sub bytes, add round key
      t0 = ((invSBOX[s0 >>> 24] << 24) ^ (invSBOX[(s1 >> 16) & 0xff] << 16) ^ (invSBOX[(s2 >> 8) & 0xff] << 8) ^ invSBOX[s3 & 0xff]) ^ invKeySchedule[ksRow];
      t1 = ((invSBOX[s1 >>> 24] << 24) ^ (invSBOX[(s2 >> 16) & 0xff] << 16) ^ (invSBOX[(s3 >> 8) & 0xff] << 8) ^ invSBOX[s0 & 0xff]) ^ invKeySchedule[ksRow + 1];
      t2 = ((invSBOX[s2 >>> 24] << 24) ^ (invSBOX[(s3 >> 16) & 0xff] << 16) ^ (invSBOX[(s0 >> 8) & 0xff] << 8) ^ invSBOX[s1 & 0xff]) ^ invKeySchedule[ksRow + 2];
      t3 = ((invSBOX[s3 >>> 24] << 24) ^ (invSBOX[(s0 >> 16) & 0xff] << 16) ^ (invSBOX[(s1 >> 8) & 0xff] << 8) ^ invSBOX[s2 & 0xff]) ^ invKeySchedule[ksRow + 3];
      ksRow = ksRow + 3;

      // Write
      outputInt32[offset] = swapWord(t0 ^ initVector0);
      outputInt32[offset + 1] = swapWord(t3 ^ initVector1);
      outputInt32[offset + 2] = swapWord(t2 ^ initVector2);
      outputInt32[offset + 3] = swapWord(t1 ^ initVector3);

      // reset initVector to last 4 unsigned int
      initVector0 = inputWords0;
      initVector1 = inputWords1;
      initVector2 = inputWords2;
      initVector3 = inputWords3;

      offset = offset + 4;
    }

    return outputInt32.buffer;
  }

  destroy() {
    this.key = undefined;
    this.keySize = undefined;
    this.ksRows = undefined;

    this.sBox = undefined;
    this.invSBox = undefined;
    this.subMix = undefined;
    this.invSubMix = undefined;
    this.keySchedule = undefined;
    this.invKeySchedule = undefined;

    this.rcon = undefined;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (AESDecryptor);


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__adts__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_logger__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__demux_id3__ = __webpack_require__(10);
/**
 * AAC demuxer
 */




class AACDemuxer {

  constructor(observer, remuxer, config) {
    this.observer = observer;
    this.config = config;
    this.remuxer = remuxer;
  }

  resetInitSegment(initSegment, audioCodec, videoCodec, duration) {
    this._audioTrack = { container: 'audio/adts', type: 'audio', id: -1, sequenceNumber: 0, isAAC: true, samples: [], len: 0, manifestCodec: audioCodec, duration: duration, inputTimeScale: 90000 };
  }

  resetTimeStamp() {
  }

  static probe(data) {
    // check if data contains ID3 timestamp and ADTS sync word
    var offset, length;
    let id3Data = __WEBPACK_IMPORTED_MODULE_2__demux_id3__["a" /* default */].getID3Data(data, 0);
    if (id3Data && __WEBPACK_IMPORTED_MODULE_2__demux_id3__["a" /* default */].getTimeStamp(id3Data) !== undefined) {
      // Look for ADTS header | 1111 1111 | 1111 X00X | where X can be either 0 or 1
      // Layer bits (position 14 and 15) in header should be always 0 for ADTS
      // More info https://wiki.multimedia.cx/index.php?title=ADTS
      for (offset = id3Data.length, length = Math.min(data.length - 1, offset + 100); offset < length; offset++) {
        if (__WEBPACK_IMPORTED_MODULE_0__adts__["default"].probe(data, offset)) {
          __WEBPACK_IMPORTED_MODULE_1__utils_logger__["b" /* logger */].log('ADTS sync word found !');
          return true;
        }
      }
    }
    return false;
  }

  // feed incoming data to the front of the parsing pipeline
  append(data, timeOffset, contiguous, accurateTimeOffset) {
    var track = this._audioTrack,
      id3Data = __WEBPACK_IMPORTED_MODULE_2__demux_id3__["a" /* default */].getID3Data(data, 0),
      pts = 90 * __WEBPACK_IMPORTED_MODULE_2__demux_id3__["a" /* default */].getTimeStamp(id3Data),
      frameIndex = 0,
      stamp = pts,
      length = data.length,
      offset = id3Data.length;

    let id3Samples = [{ pts: stamp, dts: stamp, data: id3Data }];

    while (offset < length - 1) {
      if (__WEBPACK_IMPORTED_MODULE_0__adts__["default"].isHeader(data, offset) && (offset + 5) < length) {
        __WEBPACK_IMPORTED_MODULE_0__adts__["default"].initTrackConfig(track, this.observer, data, offset, track.manifestCodec);
        var frame = __WEBPACK_IMPORTED_MODULE_0__adts__["default"].appendFrame(track, data, offset, pts, frameIndex);
        if (frame) {
          offset += frame.length;
          stamp = frame.sample.pts;
          frameIndex++;
        } else {
          __WEBPACK_IMPORTED_MODULE_1__utils_logger__["b" /* logger */].log('Unable to parse AAC frame');
          break;
        }
      } else if (__WEBPACK_IMPORTED_MODULE_2__demux_id3__["a" /* default */].isHeader(data, offset)) {
        id3Data = __WEBPACK_IMPORTED_MODULE_2__demux_id3__["a" /* default */].getID3Data(data, offset);
        id3Samples.push({ pts: stamp, dts: stamp, data: id3Data });
        offset += id3Data.length;
      } else {
        //nothing found, keep looking
        offset++;
      }
    }

    this.remuxer.remux(track,
      { samples: [] },
      { samples: id3Samples, inputTimeScale: 90000 },
      { samples: [] },
      timeOffset,
      contiguous,
      accurateTimeOffset);
  }

  destroy() {
  }

}

/* harmony default export */ __webpack_exports__["a"] = (AACDemuxer);


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__events__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__events__);
/**
 * MP4 demuxer
 */
//import {logger} from '../utils/logger';


const UINT32_MAX = Math.pow(2, 32) - 1;

 class MP4Demuxer {

  constructor(observer, remuxer) {
    this.observer = observer;
    this.remuxer = remuxer;
  }

  resetTimeStamp(initPTS) {
    this.initPTS = initPTS;
  }

  resetInitSegment(initSegment,audioCodec,videoCodec, duration) {
    //jshint unused:false
    if (initSegment && initSegment.byteLength) {
      const initData = this.initData = MP4Demuxer.parseInitSegment(initSegment);
      var tracks = {};
      if (initData.audio) {
        tracks.audio = { container : 'audio/mp4', codec : audioCodec, initSegment : duration ? initSegment : null };
      }
      if (initData.video) {
        tracks.video = { container : 'video/mp4', codec : videoCodec, initSegment : duration ? initSegment : null };
      }
      this.observer.trigger(__WEBPACK_IMPORTED_MODULE_0__events___default.a.FRAG_PARSING_INIT_SEGMENT,{ tracks : tracks });
    } else {
      if (audioCodec) {
        this.audioCodec = audioCodec;
      }
      if (videoCodec) {
        this.videoCodec = videoCodec;
      }
    }
  }

  static probe(data) {
    if (data.length >= 8) {
      const dataType = MP4Demuxer.bin2str(data.subarray(4,8));
      return (['moof','ftyp','styp'].indexOf(dataType) >= 0);
    }
    return false;
  }


  static bin2str(buffer) {
    return String.fromCharCode.apply(null, buffer);
  }

  static readUint32(buffer, offset) {
    if (buffer.data) {
      offset += buffer.start;
      buffer = buffer.data;
    }

    const val = buffer[offset] << 24 |
                buffer[offset + 1] << 16 |
                buffer[offset + 2] << 8 |
                buffer[offset + 3];
    return val < 0 ? 4294967296 + val : val;
  }

  static writeUint32(buffer, offset, value) {
    if (buffer.data) {
      offset += buffer.start;
      buffer = buffer.data;
    }
    buffer[offset] = value >> 24;
    buffer[offset+1] = (value >> 16) & 0xff;
    buffer[offset+2] = (value >> 8) & 0xff;
    buffer[offset+3] = value & 0xff;
  }


  // Find the data for a box specified by its path
  static findBox(data,path) {
    var results = [],
        i, size, type, end, subresults, start, endbox;

    if (data.data) {
      start = data.start;
      end = data.end;
      data = data.data;
    } else {
      start = 0;
      end = data.byteLength;
    }

    if (!path.length) {
      // short-circuit the search for empty paths
      return null;
    }

    for (i = start; i < end;) {
      size = MP4Demuxer.readUint32(data, i);
      type = MP4Demuxer.bin2str(data.subarray(i + 4, i + 8));
      endbox = size > 1 ? i + size : end;

      if (type === path[0]) {

        if (path.length === 1) {
          // this is the end of the path and we've found the box we were
          // looking for
          results.push({ data : data, start : i + 8, end : endbox});
        } else {
          // recursively search for the next box along the path
          subresults = MP4Demuxer.findBox({ data : data, start : i +8, end : endbox }, path.slice(1));
          if (subresults.length) {
            results = results.concat(subresults);
          }
        }
      }
      i = endbox;
    }

    // we've finished searching all of data
    return results;
  }



/**
 * Parses an MP4 initialization segment and extracts stream type and
 * timescale values for any declared tracks. Timescale values indicate the
 * number of clock ticks per second to assume for time-based values
 * elsewhere in the MP4.
 *
 * To determine the start time of an MP4, you need two pieces of
 * information: the timescale unit and the earliest base media decode
 * time. Multiple timescales can be specified within an MP4 but the
 * base media decode time is always expressed in the timescale from
 * the media header box for the track:
 * ```
 * moov > trak > mdia > mdhd.timescale
 * moov > trak > mdia > hdlr
 * ```
 * @param init {Uint8Array} the bytes of the init segment
 * @return {object} a hash of track type to timescale values or null if
 * the init segment is malformed.
 */
  static parseInitSegment(initSegment) {
    var result = [];
    var traks = MP4Demuxer.findBox(initSegment, ['moov', 'trak']);

    traks.forEach(trak => {
      const tkhd = MP4Demuxer.findBox(trak, ['tkhd'])[0];
      if (tkhd) {
        let version = tkhd.data[tkhd.start];
        let index = version === 0 ? 12 : 20;
        let trackId = MP4Demuxer.readUint32(tkhd, index);

        const mdhd = MP4Demuxer.findBox(trak, ['mdia', 'mdhd'])[0];
        if (mdhd) {
          version = mdhd.data[mdhd.start];
          index = version === 0 ? 12 : 20;
          const timescale = MP4Demuxer.readUint32(mdhd, index);

          const hdlr = MP4Demuxer.findBox(trak, ['mdia', 'hdlr'])[0];
          if (hdlr) {
            const hdlrType = MP4Demuxer.bin2str(hdlr.data.subarray(hdlr.start+8, hdlr.start+12));
            let type = { 'soun' : 'audio', 'vide' : 'video'}[hdlrType];
            if (type) {
              result[trackId] = { timescale : timescale , type : type};
              result[type] = { timescale : timescale , id : trackId};
            }
          }
        }
      }
    });
    return result;
  }


/**
 * Determine the base media decode start time, in seconds, for an MP4
 * fragment. If multiple fragments are specified, the earliest time is
 * returned.
 *
 * The base media decode time can be parsed from track fragment
 * metadata:
 * ```
 * moof > traf > tfdt.baseMediaDecodeTime
 * ```
 * It requires the timescale value from the mdhd to interpret.
 *
 * @param timescale {object} a hash of track ids to timescale values.
 * @return {number} the earliest base media decode start time for the
 * fragment, in seconds
 */
static getStartDTS(initData, fragment) {
  var trafs, baseTimes, result;

  // we need info from two childrend of each track fragment box
  trafs = MP4Demuxer.findBox(fragment, ['moof', 'traf']);

  // determine the start times for each track
  baseTimes = [].concat.apply([], trafs.map(function(traf) {
    return MP4Demuxer.findBox(traf, ['tfhd']).map(function(tfhd) {
      var id, scale, baseTime;

      // get the track id from the tfhd
      id = MP4Demuxer.readUint32(tfhd, 4);
      // assume a 90kHz clock if no timescale was specified
      scale = initData[id].timescale || 90e3;

      // get the base media decode time from the tfdt
      baseTime = MP4Demuxer.findBox(traf, ['tfdt']).map(function(tfdt) {
        var version, result;

        version = tfdt.data[tfdt.start];
        result = MP4Demuxer.readUint32(tfdt, 4);
        if (version ===  1) {
          result *= Math.pow(2, 32);

          result += MP4Demuxer.readUint32(tfdt, 8);
        }
        return result;
      })[0];
      baseTime = baseTime || Infinity;

      // convert base time to seconds
      return baseTime / scale;
    });
  }));

  // return the minimum
  result = Math.min.apply(null, baseTimes);
  return isFinite(result) ? result : 0;
}




static offsetStartDTS(initData,fragment,timeOffset) {
  MP4Demuxer.findBox(fragment, ['moof', 'traf']).map(function(traf) {
    return MP4Demuxer.findBox(traf, ['tfhd']).map(function(tfhd) {
      // get the track id from the tfhd
      var id = MP4Demuxer.readUint32(tfhd, 4);
      // assume a 90kHz clock if no timescale was specified
      var timescale = initData[id].timescale || 90e3;

      // get the base media decode time from the tfdt
      MP4Demuxer.findBox(traf, ['tfdt']).map(function(tfdt) {
        var version = tfdt.data[tfdt.start];
        var baseMediaDecodeTime = MP4Demuxer.readUint32(tfdt, 4);
        if (version === 0) {
          MP4Demuxer.writeUint32(tfdt, 4, baseMediaDecodeTime - timeOffset*timescale);
        } else {
          baseMediaDecodeTime *= Math.pow(2, 32);
          baseMediaDecodeTime += MP4Demuxer.readUint32(tfdt, 8);
          baseMediaDecodeTime -= timeOffset*timescale;
          const upper = Math.floor(baseMediaDecodeTime / (UINT32_MAX + 1));
          const lower = Math.floor(baseMediaDecodeTime % (UINT32_MAX + 1));
          MP4Demuxer.writeUint32(tfdt, 4, upper);
          MP4Demuxer.writeUint32(tfdt, 8, lower);
        }
      });
    });
  });
}

  // feed incoming data to the front of the parsing pipeline
  append(data, timeOffset,contiguous,accurateTimeOffset) {
    let initData = this.initData;
    if(!initData) {
      this.resetInitSegment(data,this.audioCodec,this.videoCodec);
      initData = this.initData;
    }
    let startDTS, initPTS = this.initPTS;
    if (initPTS === undefined) {
      let startDTS = MP4Demuxer.getStartDTS(initData,data);
      this.initPTS = initPTS = startDTS - timeOffset;
      this.observer.trigger(__WEBPACK_IMPORTED_MODULE_0__events___default.a.INIT_PTS_FOUND, { initPTS: initPTS});
    }
    MP4Demuxer.offsetStartDTS(initData,data,initPTS);
    startDTS = MP4Demuxer.getStartDTS(initData,data);
    this.remuxer.remux(initData.audio, initData.video, null, null, startDTS, contiguous,accurateTimeOffset,data);
  }

  destroy() {
  }

}

/* harmony default export */ __webpack_exports__["a"] = (MP4Demuxer);


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__adts__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mpegaudio__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mpegaudio___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__mpegaudio__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__events__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__events__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__exp_golomb__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sample_aes__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_logger__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__errors__ = __webpack_require__(2);
/**
 * highly optimized TS demuxer:
 * parse PAT, PMT
 * extract PES packet from audio and video PIDs
 * extract AVC/H264 NAL units and AAC/ADTS samples from PES packet
 * trigger the remuxer upon parsing completion
 * it also tries to workaround as best as it can audio codec switch (HE-AAC to AAC and vice versa), without having to restart the MediaSource.
 * it also controls the remuxing process :
 * upon discontinuity or level switch detection, it will also notifies the remuxer so that it can reset its state.
*/

 
 
 
 
 
// import Hex from '../utils/hex';
 
 

 class TSDemuxer {

  constructor(observer, remuxer, config, typeSupported) {
    this.observer = observer;
    this.config = config;
    this.typeSupported = typeSupported;
    this.remuxer = remuxer;
    this.sampleAes = null;
  }

  setDecryptData(decryptdata) {
    if ((decryptdata != null) && (decryptdata.key != null) && (decryptdata.method === 'SAMPLE-AES')) {
      this.sampleAes = new __WEBPACK_IMPORTED_MODULE_4__sample_aes__["a" /* default */](this.observer, this.config, decryptdata, this.discardEPB);
    } else {
      this.sampleAes = null;
    }
  }

  static probe(data) {
    // a TS fragment should contain at least 3 TS packets, a PAT, a PMT, and one PID, each starting with 0x47
    if (data.length >= 3*188 && data[0] === 0x47 && data[188] === 0x47 && data[2*188] === 0x47) {
      return true;
    } else {
      return false;
    }
  }

  resetInitSegment(initSegment,audioCodec,videoCodec, duration) {
    this.pmtParsed = false;
    this._pmtId = -1;
    this._avcTrack = {container : 'video/mp2t', type: 'video', id :-1, inputTimeScale : 90000, sequenceNumber: 0, samples : [], len : 0, dropped : 0};
    this._audioTrack = {container : 'video/mp2t', type: 'audio', id :-1, inputTimeScale : 90000, duration: duration, sequenceNumber: 0, samples : [], len : 0, isAAC: true};
    this._id3Track = {type: 'id3', id :-1, inputTimeScale : 90000, sequenceNumber: 0, samples : [], len : 0};
    this._txtTrack = {type: 'text', id: -1, inputTimeScale : 90000, sequenceNumber: 0, samples : [], len : 0};
    // flush any partial content
    this.aacOverFlow = null;
    this.aacLastPTS = null;
    this.avcSample = null;
    this.audioCodec = audioCodec;
    this.videoCodec = videoCodec;
    this._duration = duration;
  }

  resetTimeStamp() {
  }

  // feed incoming data to the front of the parsing pipeline
  append(data, timeOffset, contiguous,accurateTimeOffset) {
    var start, len = data.length, stt, pid, atf, offset,pes,
        unknownPIDs = false;
    this.contiguous = contiguous;
    var pmtParsed = this.pmtParsed,
        avcTrack = this._avcTrack,
        audioTrack = this._audioTrack,
        id3Track = this._id3Track,
        avcId = avcTrack.id,
        audioId = audioTrack.id,
        id3Id = id3Track.id,
        pmtId = this._pmtId,
        avcData = avcTrack.pesData,
        audioData = audioTrack.pesData,
        id3Data = id3Track.pesData,
        parsePAT = this._parsePAT,
        parsePMT = this._parsePMT,
        parsePES = this._parsePES,
        parseAVCPES = this._parseAVCPES.bind(this),
        parseAACPES = this._parseAACPES.bind(this),
        parseMPEGPES = this._parseMPEGPES.bind(this),
        parseID3PES  = this._parseID3PES.bind(this);

    // don't parse last TS packet if incomplete
    len -= len % 188;
    // loop through TS packets
    for (start = 0; start < len; start += 188) {
      if (data[start] === 0x47) {
        stt = !!(data[start + 1] & 0x40);
        // pid is a 13-bit field starting at the last bit of TS[1]
        pid = ((data[start + 1] & 0x1f) << 8) + data[start + 2];
        atf = (data[start + 3] & 0x30) >> 4;
        // if an adaption field is present, its length is specified by the fifth byte of the TS packet header.
        if (atf > 1) {
          offset = start + 5 + data[start + 4];
          // continue if there is only adaptation field
          if (offset === (start + 188)) {
            continue;
          }
        } else {
          offset = start + 4;
        }
        switch(pid) {
          case avcId:
            if (stt) {
              if (avcData && (pes = parsePES(avcData))) {
                parseAVCPES(pes,false);
              }
              avcData = {data: [], size: 0};
            }
            if (avcData) {
              avcData.data.push(data.subarray(offset, start + 188));
              avcData.size += start + 188 - offset;
            }
            break;
          case audioId:
            if (stt) {
              if (audioData && (pes = parsePES(audioData))) {
                if (audioTrack.isAAC) {
                  parseAACPES(pes);
                } else {
                  parseMPEGPES(pes);
                }
              }
              audioData = {data: [], size: 0};
            }
            if (audioData) {
              audioData.data.push(data.subarray(offset, start + 188));
              audioData.size += start + 188 - offset;
            }
            break;
          case id3Id:
            if (stt) {
              if (id3Data && (pes = parsePES(id3Data))) {
                parseID3PES(pes);
              }
              id3Data = {data: [], size: 0};
            }
            if (id3Data) {
              id3Data.data.push(data.subarray(offset, start + 188));
              id3Data.size += start + 188 - offset;
            }
            break;
          case 0:
            if (stt) {
              offset += data[offset] + 1;
            }
            pmtId = this._pmtId = parsePAT(data, offset);
            break;
          case pmtId:
            if (stt) {
              offset += data[offset] + 1;
            }
            let parsedPIDs = parsePMT(data, offset, this.typeSupported.mpeg === true || this.typeSupported.mp3 === true, this.sampleAes != null);

            // only update track id if track PID found while parsing PMT
            // this is to avoid resetting the PID to -1 in case
            // track PID transiently disappears from the stream
            // this could happen in case of transient missing audio samples for example
            avcId = parsedPIDs.avc;
            if (avcId > 0) {
              avcTrack.id = avcId;
            }
            audioId = parsedPIDs.audio;
            if (audioId > 0) {
              audioTrack.id = audioId;
              audioTrack.isAAC = parsedPIDs.isAAC;
            }
            id3Id = parsedPIDs.id3;
            if (id3Id > 0) {
              id3Track.id = id3Id;
            }
            if (unknownPIDs && !pmtParsed) {
              __WEBPACK_IMPORTED_MODULE_5__utils_logger__["b" /* logger */].log('reparse from beginning');
              unknownPIDs = false;
              // we set it to -188, the += 188 in the for loop will reset start to 0
              start = -188;
            }
            pmtParsed = this.pmtParsed = true;
            break;
          case 17:
          case 0x1fff:
            break;
          default:
            unknownPIDs = true;
            break;
        }
      } else {
        this.observer.trigger(__WEBPACK_IMPORTED_MODULE_2__events___default.a.ERROR, {type : __WEBPACK_IMPORTED_MODULE_6__errors__["b" /* ErrorTypes */].MEDIA_ERROR, details: __WEBPACK_IMPORTED_MODULE_6__errors__["a" /* ErrorDetails */].FRAG_PARSING_ERROR, fatal: false, reason: 'TS packet did not start with 0x47'});
      }
    }
    // try to parse last PES packets
    if (avcData && (pes = parsePES(avcData))) {
      parseAVCPES(pes,true);
      avcTrack.pesData = null;
    } else {
      // either avcData null or PES truncated, keep it for next frag parsing
      avcTrack.pesData = avcData;
    }

    if (audioData && (pes = parsePES(audioData))) {
      if (audioTrack.isAAC) {
        parseAACPES(pes);
      } else {
        parseMPEGPES(pes);
      }
      audioTrack.pesData = null;
    } else {
      if (audioData && audioData.size) {
        __WEBPACK_IMPORTED_MODULE_5__utils_logger__["b" /* logger */].log('last AAC PES packet truncated,might overlap between fragments');
      }
     // either audioData null or PES truncated, keep it for next frag parsing
      audioTrack.pesData = audioData;
    }

    if (id3Data && (pes = parsePES(id3Data))) {
      parseID3PES(pes);
      id3Track.pesData = null;
    } else {
      // either id3Data null or PES truncated, keep it for next frag parsing
      id3Track.pesData = id3Data;
    }

    if (this.sampleAes == null) {
      this.remuxer.remux(audioTrack, avcTrack, id3Track, this._txtTrack, timeOffset, contiguous, accurateTimeOffset);
    } else {
      this.decryptAndRemux(audioTrack, avcTrack, id3Track, this._txtTrack, timeOffset, contiguous, accurateTimeOffset);
    }
  }

  decryptAndRemux(audioTrack, videoTrack, id3Track, textTrack, timeOffset, contiguous, accurateTimeOffset) {
    if (audioTrack.samples && audioTrack.isAAC) {
      let localthis = this;
      this.sampleAes.decryptAacSamples(audioTrack.samples, 0, function() {
        localthis.decryptAndRemuxAvc(audioTrack, videoTrack, id3Track, textTrack, timeOffset, contiguous, accurateTimeOffset);
      });
    } else {
      this.decryptAndRemuxAvc(audioTrack, videoTrack, id3Track, textTrack, timeOffset, contiguous, accurateTimeOffset);
    }
  }

  decryptAndRemuxAvc(audioTrack, videoTrack, id3Track, textTrack, timeOffset, contiguous, accurateTimeOffset) {
    if (videoTrack.samples) {
      let localthis = this;
      this.sampleAes.decryptAvcSamples(videoTrack.samples, 0, 0, function () {
        localthis.remuxer.remux(audioTrack, videoTrack, id3Track, textTrack, timeOffset, contiguous, accurateTimeOffset);
      });
    } else {
      this.remuxer.remux(audioTrack, videoTrack, id3Track, textTrack, timeOffset, contiguous, accurateTimeOffset);
    }
  }

  destroy() {
    this._initPTS = this._initDTS = undefined;
    this._duration = 0;
  }

  _parsePAT(data, offset) {
    // skip the PSI header and parse the first PMT entry
    return (data[offset + 10] & 0x1F) << 8 | data[offset + 11];
    //logger.log('PMT PID:'  + this._pmtId);
  }

  _parsePMT(data, offset, mpegSupported, isSampleAes) {
    var sectionLength, tableEnd, programInfoLength, pid, result = { audio : -1, avc : -1, id3 : -1, isAAC : true};
    sectionLength = (data[offset + 1] & 0x0f) << 8 | data[offset + 2];
    tableEnd = offset + 3 + sectionLength - 4;
    // to determine where the table is, we have to figure out how
    // long the program info descriptors are
    programInfoLength = (data[offset + 10] & 0x0f) << 8 | data[offset + 11];
    // advance the offset to the first entry in the mapping table
    offset += 12 + programInfoLength;
    while (offset < tableEnd) {
      pid = (data[offset + 1] & 0x1F) << 8 | data[offset + 2];
      switch(data[offset]) {
        case 0xcf:     // SAMPLE-AES AAC
          if (!isSampleAes) {
            __WEBPACK_IMPORTED_MODULE_5__utils_logger__["b" /* logger */].log('unkown stream type:'  + data[offset]);
            break;
          }
          /* falls through */

        // ISO/IEC 13818-7 ADTS AAC (MPEG-2 lower bit-rate audio)
        case 0x0f:
          //logger.log('AAC PID:'  + pid);
          if (result.audio === -1) {
            result.audio = pid;
          }
          break;

        // Packetized metadata (ID3)
        case 0x15:
          //logger.log('ID3 PID:'  + pid);
          if (result.id3 === -1) {
            result.id3 = pid;
          }
          break;

        case 0xdb:     // SAMPLE-AES AVC
          if (!isSampleAes) {
            __WEBPACK_IMPORTED_MODULE_5__utils_logger__["b" /* logger */].log('unkown stream type:'  + data[offset]);
            break;
          }
          /* falls through */

        // ITU-T Rec. H.264 and ISO/IEC 14496-10 (lower bit-rate video)
        case 0x1b:
          //logger.log('AVC PID:'  + pid);
          if (result.avc === -1) {
            result.avc = pid;
          }
          break;

        // ISO/IEC 11172-3 (MPEG-1 audio)
        // or ISO/IEC 13818-3 (MPEG-2 halved sample rate audio)
        case 0x03:
        case 0x04:
          //logger.log('MPEG PID:'  + pid);
          if (!mpegSupported) {
            __WEBPACK_IMPORTED_MODULE_5__utils_logger__["b" /* logger */].log('MPEG audio found, not supported in this browser for now');
          } else if (result.audio === -1) {
            result.audio = pid;
            result.isAAC = false;
          }
          break;

        case 0x24:
          __WEBPACK_IMPORTED_MODULE_5__utils_logger__["b" /* logger */].warn('HEVC stream type found, not supported for now');
          break;

        default:
          __WEBPACK_IMPORTED_MODULE_5__utils_logger__["b" /* logger */].log('unkown stream type:'  + data[offset]);
          break;
      }
      // move to the next table entry
      // skip past the elementary stream descriptors, if present
      offset += ((data[offset + 3] & 0x0F) << 8 | data[offset + 4]) + 5;
    }
    return result;
  }

  _parsePES(stream) {
    var i = 0, frag, pesFlags, pesPrefix, pesLen, pesHdrLen, pesData, pesPts, pesDts, payloadStartOffset, data = stream.data;
    // safety check
    if (!stream || stream.size === 0) {
      return null;
    }

    // we might need up to 19 bytes to read PES header
    // if first chunk of data is less than 19 bytes, let's merge it with following ones until we get 19 bytes
    // usually only one merge is needed (and this is rare ...)
    while(data[0].length < 19 && data.length > 1) {
      let newData = new Uint8Array(data[0].length + data[1].length);
      newData.set(data[0]);
      newData.set(data[1], data[0].length);
      data[0] = newData;
      data.splice(1,1);
    }
    //retrieve PTS/DTS from first fragment
    frag = data[0];
    pesPrefix = (frag[0] << 16) + (frag[1] << 8) + frag[2];
    if (pesPrefix === 1) {
      pesLen = (frag[4] << 8) + frag[5];
      // if PES parsed length is not zero and greater than total received length, stop parsing. PES might be truncated
      // minus 6 : PES header size
      if (pesLen && pesLen > stream.size - 6) {
        return null;
      }
      pesFlags = frag[7];
      if (pesFlags & 0xC0) {
        /* PES header described here : http://dvd.sourceforge.net/dvdinfo/pes-hdr.html
            as PTS / DTS is 33 bit we cannot use bitwise operator in JS,
            as Bitwise operators treat their operands as a sequence of 32 bits */
        pesPts = (frag[9] & 0x0E) * 536870912 +// 1 << 29
          (frag[10] & 0xFF) * 4194304 +// 1 << 22
          (frag[11] & 0xFE) * 16384 +// 1 << 14
          (frag[12] & 0xFF) * 128 +// 1 << 7
          (frag[13] & 0xFE) / 2;
          // check if greater than 2^32 -1
          if (pesPts > 4294967295) {
            // decrement 2^33
            pesPts -= 8589934592;
          }
        if (pesFlags & 0x40) {
          pesDts = (frag[14] & 0x0E ) * 536870912 +// 1 << 29
            (frag[15] & 0xFF ) * 4194304 +// 1 << 22
            (frag[16] & 0xFE ) * 16384 +// 1 << 14
            (frag[17] & 0xFF ) * 128 +// 1 << 7
            (frag[18] & 0xFE ) / 2;
          // check if greater than 2^32 -1
          if (pesDts > 4294967295) {
            // decrement 2^33
            pesDts -= 8589934592;
          }
          if (pesPts - pesDts > 60*90000) {
            __WEBPACK_IMPORTED_MODULE_5__utils_logger__["b" /* logger */].warn(`${Math.round((pesPts - pesDts)/90000)}s delta between PTS and DTS, align them`);
            pesPts = pesDts;
          }
        } else {
          pesDts = pesPts;
        }
      }
      pesHdrLen = frag[8];
      // 9 bytes : 6 bytes for PES header + 3 bytes for PES extension
      payloadStartOffset = pesHdrLen + 9;

      stream.size -= payloadStartOffset;
      //reassemble PES packet
      pesData = new Uint8Array(stream.size);
      for( let j = 0, dataLen = data.length; j < dataLen ; j++) {
        frag = data[j];
        let len = frag.byteLength;
        if (payloadStartOffset) {
          if (payloadStartOffset > len) {
            // trim full frag if PES header bigger than frag
            payloadStartOffset-=len;
            continue;
          } else {
            // trim partial frag if PES header smaller than frag
            frag = frag.subarray(payloadStartOffset);
            len-=payloadStartOffset;
            payloadStartOffset = 0;
          }
        }
        pesData.set(frag, i);
        i+=len;
      }
      if (pesLen) {
        // payload size : remove PES header + PES extension
        pesLen -= pesHdrLen+3;
      }
      return {data: pesData, pts: pesPts, dts: pesDts, len: pesLen};
    } else {
      return null;
    }
  }

  pushAccesUnit(avcSample,avcTrack) {
    if (avcSample.units.length && avcSample.frame) {
      const samples = avcTrack.samples;
      const nbSamples = samples.length;
      // only push AVC sample if starting with a keyframe is not mandatory OR
      //    if keyframe already found in this fragment OR
      //       keyframe found in last fragment (track.sps) AND
      //          samples already appended (we already found a keyframe in this fragment) OR fragment is contiguous
      if (!this.config.forceKeyFrameOnDiscontinuity ||
          avcSample.key === true ||
          (avcTrack.sps && (nbSamples || this.contiguous))) {
        avcSample.id = nbSamples;
        samples.push(avcSample);
      } else {
        // dropped samples, track it
        avcTrack.dropped++;
      }
    }
    if(avcSample.debug.length) {
      __WEBPACK_IMPORTED_MODULE_5__utils_logger__["b" /* logger */].log(avcSample.pts + '/' + avcSample.dts + ':' + avcSample.debug);
    }
  }

  _parseAVCPES(pes,last) {
    //logger.log('parse new PES');
    var track = this._avcTrack,
        units = this._parseAVCNALu(pes.data),
        debug = false,
        expGolombDecoder,
        avcSample = this.avcSample,
        push,
        spsfound = false,
        i,
        pushAccesUnit = this.pushAccesUnit.bind(this),
        createAVCSample = function(key,pts,dts,debug) {
          return { key : key, pts : pts, dts : dts, units : [], debug : debug};
        };
    //free pes.data to save up some memory
    pes.data = null;

    // if new NAL units found and last sample still there, let's push ...
    // this helps parsing streams with missing AUD
    if (avcSample && units.length) {
      pushAccesUnit(avcSample,track);
      avcSample = this.avcSample = createAVCSample(false,pes.pts,pes.dts,'');
    }

    units.forEach(unit => {
      switch(unit.type) {
        //NDR
         case 1:
           push = true;
           if(debug && avcSample) {
            avcSample.debug += 'NDR ';
           }
           avcSample.frame = true;
           let data = unit.data;
           // only check slice type to detect KF in case SPS found in same packet (any keyframe is preceded by SPS ...)
           if (spsfound && data.length > 4) {
             // retrieve slice type by parsing beginning of NAL unit (follow H264 spec, slice_header definition) to detect keyframe embedded in NDR
             let sliceType = new __WEBPACK_IMPORTED_MODULE_3__exp_golomb__["a" /* default */](data).readSliceType();
             // 2 : I slice, 4 : SI slice, 7 : I slice, 9: SI slice
             // SI slice : A slice that is coded using intra prediction only and using quantisation of the prediction samples.
             // An SI slice can be coded such that its decoded samples can be constructed identically to an SP slice.
             // I slice: A slice that is not an SI slice that is decoded using intra prediction only.
             //if (sliceType === 2 || sliceType === 7) {
             if (sliceType === 2 || sliceType === 4 || sliceType === 7 || sliceType === 9) {
                avcSample.key = true;
             }
           }
           break;
        //IDR
        case 5:
          push = true;
          // handle PES not starting with AUD
          if (!avcSample) {
            avcSample = this.avcSample = createAVCSample(true,pes.pts,pes.dts,'');
          }
          if(debug) {
            avcSample.debug += 'IDR ';
          }
          avcSample.key = true;
          avcSample.frame = true;
          break;
        //SEI
        case 6:
          push = true;
          if(debug && avcSample) {
            avcSample.debug += 'SEI ';
          }
          expGolombDecoder = new __WEBPACK_IMPORTED_MODULE_3__exp_golomb__["a" /* default */](this.discardEPB(unit.data));

          // skip frameType
          expGolombDecoder.readUByte();

          var payloadType = 0;
          var payloadSize = 0;
          var endOfCaptions = false;
          var b = 0;

          while (!endOfCaptions && expGolombDecoder.bytesAvailable > 1) {
            payloadType = 0;
            do {
                b = expGolombDecoder.readUByte();
                payloadType += b;
            } while (b === 0xFF);

            // Parse payload size.
            payloadSize = 0;
            do {
                b = expGolombDecoder.readUByte();
                payloadSize += b;
            } while (b === 0xFF);

            // TODO: there can be more than one payload in an SEI packet...
            // TODO: need to read type and size in a while loop to get them all
            if (payloadType === 4 && expGolombDecoder.bytesAvailable !== 0) {

              endOfCaptions = true;

              var countryCode = expGolombDecoder.readUByte();

              if (countryCode === 181) {
                var providerCode = expGolombDecoder.readUShort();

                if (providerCode === 49) {
                  var userStructure = expGolombDecoder.readUInt();

                  if (userStructure === 0x47413934) {
                    var userDataType = expGolombDecoder.readUByte();

                    // Raw CEA-608 bytes wrapped in CEA-708 packet
                    if (userDataType === 3) {
                      var firstByte = expGolombDecoder.readUByte();
                      var secondByte = expGolombDecoder.readUByte();

                      var totalCCs = 31 & firstByte;
                      var byteArray = [firstByte, secondByte];

                      for (i = 0; i < totalCCs; i++) {
                        // 3 bytes per CC
                        byteArray.push(expGolombDecoder.readUByte());
                        byteArray.push(expGolombDecoder.readUByte());
                        byteArray.push(expGolombDecoder.readUByte());
                      }

                      this._insertSampleInOrder(this._txtTrack.samples, { type: 3, pts: pes.pts, bytes: byteArray });
                    }
                  }
                }
              }
            }
            else if (payloadSize < expGolombDecoder.bytesAvailable)
            {
              for (i = 0; i<payloadSize; i++)
              {
                expGolombDecoder.readUByte();
              }
            }
          }
          break;
        //SPS
        case 7:
          push = true;
          spsfound = true;
          if(debug && avcSample) {
            avcSample.debug += 'SPS ';
          }
          if(!track.sps) {
            expGolombDecoder = new __WEBPACK_IMPORTED_MODULE_3__exp_golomb__["a" /* default */](unit.data);
            var config = expGolombDecoder.readSPS();
            track.width = config.width;
            track.height = config.height;
            track.pixelRatio = config.pixelRatio;
            track.sps = [unit.data];
            track.duration = this._duration;
            var codecarray = unit.data.subarray(1, 4);
            var codecstring = 'avc1.';
            for (i = 0; i < 3; i++) {
              var h = codecarray[i].toString(16);
              if (h.length < 2) {
                h = '0' + h;
              }
              codecstring += h;
            }
            track.codec = codecstring;
          }
          break;
        //PPS
        case 8:
          push = true;
          if(debug && avcSample) {
            avcSample.debug += 'PPS ';
          }
          if (!track.pps) {
            track.pps = [unit.data];
          }
          break;
        // AUD
        case 9:
          push = false;
          if (avcSample) {
            pushAccesUnit(avcSample,track);
          }
          avcSample = this.avcSample = createAVCSample(false,pes.pts,pes.dts,debug ? 'AUD ': '');
          break;
        // Filler Data
        case 12:
          push = false;
          break;
        default:
          push = false;
          if (avcSample) {
            avcSample.debug += 'unknown NAL ' + unit.type + ' ';
          }
          break;
      }
      if(avcSample && push) {
        let units = avcSample.units;
        units.push(unit);
      }
    });
    // if last PES packet, push samples
    if (last && avcSample) {
      pushAccesUnit(avcSample,track);
      this.avcSample = null;
    }
  }

  _insertSampleInOrder(arr, data) {
    var len = arr.length;
    if (len > 0) {
      if (data.pts >= arr[len-1].pts)
      {
        arr.push(data);
      }
      else {
        for (var pos = len - 1; pos >= 0; pos--) {
          if (data.pts < arr[pos].pts) {
            arr.splice(pos, 0, data);
            break;
          }
        }
      }
    }
    else {
      arr.push(data);
    }
  }

  _getLastNalUnit() {
    let avcSample = this.avcSample, lastUnit;
    // try to fallback to previous sample if current one is empty
    if (!avcSample || avcSample.units.length === 0) {
      let track = this._avcTrack, samples = track.samples;
      avcSample = samples[samples.length-1];
    }
    if (avcSample) {
      let units = avcSample.units;
      lastUnit = units[units.length - 1];
    }
    return lastUnit;
  }

  _parseAVCNALu(array) {
    var i = 0, len = array.byteLength, value, overflow, track = this._avcTrack, state = track.naluState || 0, lastState = state;
    var units = [], unit, unitType, lastUnitStart = -1, lastUnitType;
    //logger.log('PES:' + Hex.hexDump(array));

    if (state === -1) {
    // special use case where we found 3 or 4-byte start codes exactly at the end of previous PES packet
      lastUnitStart = 0;
      // NALu type is value read from offset 0
      lastUnitType = array[0] & 0x1f;
      state = 0;
      i = 1;
    }

    while (i < len) {
      value = array[i++];
      // optimization. state 0 and 1 are the predominant case. let's handle them outside of the switch/case
      if (!state) {
        state = value ? 0 : 1;
        continue;
      }
      if (state === 1) {
        state = value ? 0 : 2;
        continue;
      }
      // here we have state either equal to 2 or 3
      if(!value) {
        state = 3;
      } else if (value === 1) {
        if (lastUnitStart >=0) {
          unit = {data: array.subarray(lastUnitStart, i - state - 1), type: lastUnitType};
          //logger.log('pushing NALU, type/size:' + unit.type + '/' + unit.data.byteLength);
          units.push(unit);
        } else {
          // lastUnitStart is undefined => this is the first start code found in this PES packet
          // first check if start code delimiter is overlapping between 2 PES packets,
          // ie it started in last packet (lastState not zero)
          // and ended at the beginning of this PES packet (i <= 4 - lastState)
          let lastUnit = this._getLastNalUnit();
          if (lastUnit) {
            if(lastState &&  (i <= 4 - lastState)) {
              // start delimiter overlapping between PES packets
              // strip start delimiter bytes from the end of last NAL unit
                // check if lastUnit had a state different from zero
              if (lastUnit.state) {
                // strip last bytes
                lastUnit.data = lastUnit.data.subarray(0,lastUnit.data.byteLength - lastState);
              }
            }
            // If NAL units are not starting right at the beginning of the PES packet, push preceding data into previous NAL unit.
            overflow  = i - state - 1;
            if (overflow > 0) {
              //logger.log('first NALU found with overflow:' + overflow);
              let tmp = new Uint8Array(lastUnit.data.byteLength + overflow);
              tmp.set(lastUnit.data, 0);
              tmp.set(array.subarray(0, overflow), lastUnit.data.byteLength);
              lastUnit.data = tmp;
            }
          }
        }
        // check if we can read unit type
        if (i < len) {
          unitType = array[i] & 0x1f;
          //logger.log('find NALU @ offset:' + i + ',type:' + unitType);
          lastUnitStart = i;
          lastUnitType = unitType;
          state = 0;
        } else {
          // not enough byte to read unit type. let's read it on next PES parsing
          state = -1;
        }
      } else {
        state = 0;
      }
    }
    if (lastUnitStart >=0 && state >=0) {
      unit = {data: array.subarray(lastUnitStart, len), type: lastUnitType, state : state};
      units.push(unit);
      //logger.log('pushing NALU, type/size/state:' + unit.type + '/' + unit.data.byteLength + '/' + state);
    }
    // no NALu found
    if (units.length === 0) {
      // append pes.data to previous NAL unit
      let  lastUnit = this._getLastNalUnit();
      if (lastUnit) {
        let tmp = new Uint8Array(lastUnit.data.byteLength + array.byteLength);
        tmp.set(lastUnit.data, 0);
        tmp.set(array, lastUnit.data.byteLength);
        lastUnit.data = tmp;
      }
    }
    track.naluState = state;
    return units;
  }

  /**
   * remove Emulation Prevention bytes from a RBSP
   */
  discardEPB(data) {
    var length = data.byteLength,
        EPBPositions = [],
        i = 1,
        newLength, newData;

    // Find all `Emulation Prevention Bytes`
    while (i < length - 2) {
      if (data[i] === 0 &&
          data[i + 1] === 0 &&
          data[i + 2] === 0x03) {
        EPBPositions.push(i + 2);
        i += 2;
      } else {
        i++;
      }
    }

    // If no Emulation Prevention Bytes were found just return the original
    // array
    if (EPBPositions.length === 0) {
      return data;
    }

    // Create a new array to hold the NAL unit data
    newLength = length - EPBPositions.length;
    newData = new Uint8Array(newLength);
    var sourceIndex = 0;

    for (i = 0; i < newLength; sourceIndex++, i++) {
      if (sourceIndex === EPBPositions[0]) {
        // Skip this byte
        sourceIndex++;
        // Remove this position index
        EPBPositions.shift();
      }
      newData[i] = data[sourceIndex];
    }
    return newData;
  }

  _parseAACPES(pes) {
    var track = this._audioTrack,
        data = pes.data,
        pts = pes.pts,
        startOffset = 0,
        aacOverFlow = this.aacOverFlow,
        aacLastPTS = this.aacLastPTS,
        frameDuration, frameIndex, offset, stamp, len;
    if (aacOverFlow) {
      var tmp = new Uint8Array(aacOverFlow.byteLength + data.byteLength);
      tmp.set(aacOverFlow, 0);
      tmp.set(data, aacOverFlow.byteLength);
      //logger.log(`AAC: append overflowing ${aacOverFlow.byteLength} bytes to beginning of new PES`);
      data = tmp;
    }
    // look for ADTS header (0xFFFx)
    for (offset = startOffset, len = data.length; offset < len - 1; offset++) {
      if (__WEBPACK_IMPORTED_MODULE_0__adts__["default"].isHeader(data, offset)) {
        break;
      }
    }
    // if ADTS header does not start straight from the beginning of the PES payload, raise an error
    if (offset) {
      var reason, fatal;
      if (offset < len - 1) {
        reason = `AAC PES did not start with ADTS header,offset:${offset}`;
        fatal = false;
      } else {
        reason = 'no ADTS header found in AAC PES';
        fatal = true;
      }
      __WEBPACK_IMPORTED_MODULE_5__utils_logger__["b" /* logger */].warn(`parsing error:${reason}`);
      this.observer.trigger(__WEBPACK_IMPORTED_MODULE_2__events___default.a.ERROR, {type: __WEBPACK_IMPORTED_MODULE_6__errors__["b" /* ErrorTypes */].MEDIA_ERROR, details: __WEBPACK_IMPORTED_MODULE_6__errors__["a" /* ErrorDetails */].FRAG_PARSING_ERROR, fatal: fatal, reason: reason});
      if (fatal) {
        return;
      }
    }

    __WEBPACK_IMPORTED_MODULE_0__adts__["default"].initTrackConfig(track, this.observer, data, offset, this.audioCodec);
    frameIndex = 0;
    frameDuration = __WEBPACK_IMPORTED_MODULE_0__adts__["default"].getFrameDuration(track.samplerate);

    // if last AAC frame is overflowing, we should ensure timestamps are contiguous:
    // first sample PTS should be equal to last sample PTS + frameDuration
    if(aacOverFlow && aacLastPTS) {
      var newPTS = aacLastPTS+frameDuration;
      if(Math.abs(newPTS-pts) > 1) {
        __WEBPACK_IMPORTED_MODULE_5__utils_logger__["b" /* logger */].log(`AAC: align PTS for overlapping frames by ${Math.round((newPTS-pts)/90)}`);
        pts=newPTS;
      }
    }

    //scan for aac samples
    while (offset < len) {
      if (__WEBPACK_IMPORTED_MODULE_0__adts__["default"].isHeader(data, offset) && (offset + 5) < len) {
        var frame = __WEBPACK_IMPORTED_MODULE_0__adts__["default"].appendFrame(track, data, offset, pts, frameIndex);
        if (frame) {
          //logger.log(`${Math.round(frame.sample.pts)} : AAC`);
          offset += frame.length;
          stamp = frame.sample.pts;
          frameIndex++;
        } else {
          //logger.log('Unable to parse AAC frame');
          break;
        }
      } else {
        //nothing found, keep looking
        offset++;
      }
    }

    if (offset < len) {
      aacOverFlow = data.subarray(offset, len);
      //logger.log(`AAC: overflow detected:${len-offset}`);
    } else {
      aacOverFlow = null;
    }
    this.aacOverFlow = aacOverFlow;
    this.aacLastPTS = stamp;
  }

  _parseMPEGPES(pes) {
    var data = pes.data;
    var length = data.length;
    var frameIndex = 0;
    var offset = 0;
    var pts = pes.pts;

    while (offset < length) {
      if (__WEBPACK_IMPORTED_MODULE_1__mpegaudio___default.a.isHeader(data, offset)) {
        var frame = __WEBPACK_IMPORTED_MODULE_1__mpegaudio___default.a.appendFrame(this._audioTrack, data, offset, pts, frameIndex);
        if (frame) {
          offset += frame.length;
          frameIndex++;
        } else {
          //logger.log('Unable to parse Mpeg audio frame');
          break;
        }
      } else {
        //nothing found, keep looking
        offset++;
      }
    }
  }

  _parseID3PES(pes) {
    this._id3Track.samples.push(pes);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (TSDemuxer);


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_logger__ = __webpack_require__(0);
/**
 * Parser for exponential Golomb codes, a variable-bitwidth number encoding scheme used by h264.
*/



class ExpGolomb {

  constructor(data) {
    this.data = data;
    // the number of bytes left to examine in this.data
    this.bytesAvailable = data.byteLength;
    // the current word being examined
    this.word = 0; // :uint
    // the number of bits left to examine in the current word
    this.bitsAvailable = 0; // :uint
  }

  // ():void
  loadWord() {
    var
      data = this.data,
      bytesAvailable = this.bytesAvailable,
      position = data.byteLength - bytesAvailable,
      workingBytes = new Uint8Array(4),
      availableBytes = Math.min(4, bytesAvailable);
    if (availableBytes === 0) {
      throw new Error('no bytes available');
    }
    workingBytes.set(data.subarray(position, position + availableBytes));
    this.word = new DataView(workingBytes.buffer).getUint32(0);
    // track the amount of this.data that has been processed
    this.bitsAvailable = availableBytes * 8;
    this.bytesAvailable -= availableBytes;
  }

  // (count:int):void
  skipBits(count) {
    var skipBytes; // :int
    if (this.bitsAvailable > count) {
      this.word <<= count;
      this.bitsAvailable -= count;
    } else {
      count -= this.bitsAvailable;
      skipBytes = count >> 3;
      count -= (skipBytes >> 3);
      this.bytesAvailable -= skipBytes;
      this.loadWord();
      this.word <<= count;
      this.bitsAvailable -= count;
    }
  }

  // (size:int):uint
  readBits(size) {
    var
      bits = Math.min(this.bitsAvailable, size), // :uint
      valu = this.word >>> (32 - bits); // :uint
    if (size > 32) {
      __WEBPACK_IMPORTED_MODULE_0__utils_logger__["b" /* logger */].error('Cannot read more than 32 bits at a time');
    }
    this.bitsAvailable -= bits;
    if (this.bitsAvailable > 0) {
      this.word <<= bits;
    } else if (this.bytesAvailable > 0) {
      this.loadWord();
    }
    bits = size - bits;
    if (bits > 0 && this.bitsAvailable) {
      return valu << bits | this.readBits(bits);
    } else {
      return valu;
    }
  }

  // ():uint
  skipLZ() {
    var leadingZeroCount; // :uint
    for (leadingZeroCount = 0; leadingZeroCount < this.bitsAvailable; ++leadingZeroCount) {
      if (0 !== (this.word & (0x80000000 >>> leadingZeroCount))) {
        // the first bit of working word is 1
        this.word <<= leadingZeroCount;
        this.bitsAvailable -= leadingZeroCount;
        return leadingZeroCount;
      }
    }
    // we exhausted word and still have not found a 1
    this.loadWord();
    return leadingZeroCount + this.skipLZ();
  }

  // ():void
  skipUEG() {
    this.skipBits(1 + this.skipLZ());
  }

  // ():void
  skipEG() {
    this.skipBits(1 + this.skipLZ());
  }

  // ():uint
  readUEG() {
    var clz = this.skipLZ(); // :uint
    return this.readBits(clz + 1) - 1;
  }

  // ():int
  readEG() {
    var valu = this.readUEG(); // :int
    if (0x01 & valu) {
      // the number is odd if the low order bit is set
      return (1 + valu) >>> 1; // add 1 to make it even, and divide by 2
    } else {
      return -1 * (valu >>> 1); // divide by two then make it negative
    }
  }

  // Some convenience functions
  // :Boolean
  readBoolean() {
    return 1 === this.readBits(1);
  }

  // ():int
  readUByte() {
    return this.readBits(8);
  }

  // ():int
  readUShort() {
    return this.readBits(16);
  }
    // ():int
  readUInt() {
    return this.readBits(32);
  }

  /**
   * Advance the ExpGolomb decoder past a scaling list. The scaling
   * list is optionally transmitted as part of a sequence parameter
   * set and is not relevant to transmuxing.
   * @param count {number} the number of entries in this scaling list
   * @see Recommendation ITU-T H.264, Section 7.3.2.1.1.1
   */
  skipScalingList(count) {
    var
      lastScale = 8,
      nextScale = 8,
      j,
      deltaScale;
    for (j = 0; j < count; j++) {
      if (nextScale !== 0) {
        deltaScale = this.readEG();
        nextScale = (lastScale + deltaScale + 256) % 256;
      }
      lastScale = (nextScale === 0) ? lastScale : nextScale;
    }
  }

  /**
   * Read a sequence parameter set and return some interesting video
   * properties. A sequence parameter set is the H264 metadata that
   * describes the properties of upcoming video frames.
   * @param data {Uint8Array} the bytes of a sequence parameter set
   * @return {object} an object with configuration parsed from the
   * sequence parameter set, including the dimensions of the
   * associated video frames.
   */
  readSPS() {
    var
      frameCropLeftOffset = 0,
      frameCropRightOffset = 0,
      frameCropTopOffset = 0,
      frameCropBottomOffset = 0,
      profileIdc,profileCompat,levelIdc,
      numRefFramesInPicOrderCntCycle, picWidthInMbsMinus1,
      picHeightInMapUnitsMinus1,
      frameMbsOnlyFlag,
      scalingListCount,
      i,
      readUByte = this.readUByte.bind(this),
      readBits = this.readBits.bind(this),
      readUEG = this.readUEG.bind(this),
      readBoolean = this.readBoolean.bind(this),
      skipBits = this.skipBits.bind(this),
      skipEG = this.skipEG.bind(this),
      skipUEG = this.skipUEG.bind(this),
      skipScalingList = this.skipScalingList.bind(this);

    readUByte();
    profileIdc = readUByte(); // profile_idc
    profileCompat = readBits(5); // constraint_set[0-4]_flag, u(5)
    skipBits(3); // reserved_zero_3bits u(3),
    levelIdc = readUByte(); //level_idc u(8)
    skipUEG(); // seq_parameter_set_id
    // some profiles have more optional data we don't need
    if (profileIdc === 100 ||
        profileIdc === 110 ||
        profileIdc === 122 ||
        profileIdc === 244 ||
        profileIdc === 44  ||
        profileIdc === 83  ||
        profileIdc === 86  ||
        profileIdc === 118 ||
        profileIdc === 128) {
      var chromaFormatIdc = readUEG();
      if (chromaFormatIdc === 3) {
        skipBits(1); // separate_colour_plane_flag
      }
      skipUEG(); // bit_depth_luma_minus8
      skipUEG(); // bit_depth_chroma_minus8
      skipBits(1); // qpprime_y_zero_transform_bypass_flag
      if (readBoolean()) { // seq_scaling_matrix_present_flag
        scalingListCount = (chromaFormatIdc !== 3) ? 8 : 12;
        for (i = 0; i < scalingListCount; i++) {
          if (readBoolean()) { // seq_scaling_list_present_flag[ i ]
            if (i < 6) {
              skipScalingList(16);
            } else {
              skipScalingList(64);
            }
          }
        }
      }
    }
    skipUEG(); // log2_max_frame_num_minus4
    var picOrderCntType = readUEG();
    if (picOrderCntType === 0) {
      readUEG(); //log2_max_pic_order_cnt_lsb_minus4
    } else if (picOrderCntType === 1) {
      skipBits(1); // delta_pic_order_always_zero_flag
      skipEG(); // offset_for_non_ref_pic
      skipEG(); // offset_for_top_to_bottom_field
      numRefFramesInPicOrderCntCycle = readUEG();
      for(i = 0; i < numRefFramesInPicOrderCntCycle; i++) {
        skipEG(); // offset_for_ref_frame[ i ]
      }
    }
    skipUEG(); // max_num_ref_frames
    skipBits(1); // gaps_in_frame_num_value_allowed_flag
    picWidthInMbsMinus1 = readUEG();
    picHeightInMapUnitsMinus1 = readUEG();
    frameMbsOnlyFlag = readBits(1);
    if (frameMbsOnlyFlag === 0) {
      skipBits(1); // mb_adaptive_frame_field_flag
    }
    skipBits(1); // direct_8x8_inference_flag
    if (readBoolean()) { // frame_cropping_flag
      frameCropLeftOffset = readUEG();
      frameCropRightOffset = readUEG();
      frameCropTopOffset = readUEG();
      frameCropBottomOffset = readUEG();
    }
    let pixelRatio = [1,1];
    if (readBoolean()) {
      // vui_parameters_present_flag
      if (readBoolean()) {
        // aspect_ratio_info_present_flag
        const aspectRatioIdc = readUByte();
        switch (aspectRatioIdc) {
          case 1: pixelRatio = [1,1]; break;
          case 2: pixelRatio = [12,11]; break;
          case 3: pixelRatio = [10,11]; break;
          case 4: pixelRatio = [16,11]; break;
          case 5: pixelRatio = [40,33]; break;
          case 6: pixelRatio = [24,11]; break;
          case 7: pixelRatio = [20,11]; break;
          case 8: pixelRatio = [32,11]; break;
          case 9: pixelRatio = [80,33]; break;
          case 10: pixelRatio = [18,11]; break;
          case 11: pixelRatio = [15,11]; break;
          case 12: pixelRatio = [64,33]; break;
          case 13: pixelRatio = [160,99]; break;
          case 14: pixelRatio = [4,3]; break;
          case 15: pixelRatio = [3,2]; break;
          case 16: pixelRatio = [2,1]; break;
          case 255: {
            pixelRatio = [readUByte() << 8 | readUByte(), readUByte() << 8 | readUByte()];
            break;
          }
        }
      }
    }
    return {
      width: Math.ceil((((picWidthInMbsMinus1 + 1) * 16) - frameCropLeftOffset * 2 - frameCropRightOffset * 2)),
      height: ((2 - frameMbsOnlyFlag) * (picHeightInMapUnitsMinus1 + 1) * 16) - ((frameMbsOnlyFlag? 2 : 4) * (frameCropTopOffset + frameCropBottomOffset)),
      pixelRatio : pixelRatio
    };
  }

  readSliceType() {
    // skip NALu type
    this.readUByte();
    // discard first_mb_in_slice
    this.readUEG();
    // return slice_type
    return this.readUEG();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (ExpGolomb);


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__crypt_decrypter__ = __webpack_require__(8);
/**
 * SAMPLE-AES decrypter
*/

 

 class SampleAesDecrypter {

  constructor(observer, config, decryptdata, discardEPB) {
    this.decryptdata = decryptdata;
    this.discardEPB = discardEPB;
    this.decrypter = new __WEBPACK_IMPORTED_MODULE_0__crypt_decrypter__["a" /* default */](observer, config);
  }

  decryptBuffer(encryptedData, callback) {
    this.decrypter.decrypt(encryptedData, this.decryptdata.key.buffer, this.decryptdata.iv.buffer, callback);
  }

  // AAC - encrypt all full 16 bytes blocks starting from offset 16
  decryptAacSample(samples, sampleIndex, callback, sync) {
    let curUnit = samples[sampleIndex].unit;
    let encryptedData = curUnit.subarray(16, curUnit.length - curUnit.length % 16);
    let encryptedBuffer = encryptedData.buffer.slice(
       encryptedData.byteOffset,
       encryptedData.byteOffset + encryptedData.length);

    let localthis = this;
    this.decryptBuffer(encryptedBuffer, function (decryptedData) {
      decryptedData = new Uint8Array(decryptedData);
      curUnit.set(decryptedData, 16);

      if (!sync) {
        localthis.decryptAacSamples(samples, sampleIndex + 1, callback);
      }
    });
  }

  decryptAacSamples(samples, sampleIndex, callback) {
    for (;; sampleIndex++) {
      if (sampleIndex >= samples.length) {
        callback();
        return;
      }

      if (samples[sampleIndex].unit.length < 32) {
        continue;
      }

      let sync = this.decrypter.isSync();

      this.decryptAacSample(samples, sampleIndex, callback, sync);

      if (!sync) {
        return;
      }
    }
  }

  // AVC - encrypt one 16 bytes block out of ten, starting from offset 32
  getAvcEncryptedData(decodedData) {
    let encryptedDataLen = Math.floor((decodedData.length - 48) / 160) * 16 + 16;
    let encryptedData = new Int8Array(encryptedDataLen);
    let outputPos = 0;
    for (let inputPos = 32; inputPos <= decodedData.length - 16; inputPos += 160, outputPos += 16) {
      encryptedData.set(decodedData.subarray(inputPos, inputPos + 16), outputPos);
    }
    return encryptedData;
  }

  getAvcDecryptedUnit(decodedData, decryptedData) {
    decryptedData = new Uint8Array(decryptedData);
    let inputPos = 0;
    for (let outputPos = 32; outputPos <= decodedData.length - 16; outputPos += 160, inputPos += 16) {
      decodedData.set(decryptedData.subarray(inputPos, inputPos + 16), outputPos);
    }
    return decodedData;
  }

  decryptAvcSample(samples, sampleIndex, unitIndex, callback, curUnit, sync) {
    let decodedData = this.discardEPB(curUnit.data);
    let encryptedData = this.getAvcEncryptedData(decodedData);
    let localthis = this;

    this.decryptBuffer(encryptedData.buffer, function (decryptedData) {
      curUnit.data = localthis.getAvcDecryptedUnit(decodedData, decryptedData);

      if (!sync) {
        localthis.decryptAvcSamples(samples, sampleIndex, unitIndex + 1, callback);
      }
    });
  }

  decryptAvcSamples(samples, sampleIndex, unitIndex, callback) {
    for (;; sampleIndex++, unitIndex = 0) {
      if (sampleIndex >= samples.length) {
        callback();
        return;
      }

      let curUnits = samples[sampleIndex].units;
      for (;; unitIndex++) {
        if (unitIndex >= curUnits.length) {
          break;
        }

        let curUnit = curUnits[unitIndex];
        if (curUnit.length <= 48 || (curUnit.type !== 1 && curUnit.type !== 5)) {
          continue;
        }

        let sync = this.decrypter.isSync();

        this.decryptAvcSample(samples, sampleIndex, unitIndex, callback, curUnit, sync);

        if (!sync) {
          return;
        }
      }
    }
  }
 }

 /* harmony default export */ __webpack_exports__["a"] = (SampleAesDecrypter);


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__demux_id3__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_logger__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mpegaudio__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mpegaudio___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__mpegaudio__);
/**
 * MP3 demuxer
 */




class MP3Demuxer {

  constructor(observer, remuxer, config) {
    this.observer = observer;
    this.config = config;
    this.remuxer = remuxer;
  }

  resetInitSegment(initSegment, audioCodec, videoCodec, duration) {
    this._audioTrack = { container: 'audio/mpeg', type: 'audio', id: -1, sequenceNumber: 0, isAAC: false, samples: [], len: 0, manifestCodec: audioCodec, duration: duration, inputTimeScale: 90000 };
  }

  resetTimeStamp() {
  }

  static probe(data) {
    // check if data contains ID3 timestamp and MPEG sync word
    var offset, length;
    let id3Data = __WEBPACK_IMPORTED_MODULE_0__demux_id3__["a" /* default */].getID3Data(data, 0);
    if (id3Data && __WEBPACK_IMPORTED_MODULE_0__demux_id3__["a" /* default */].getTimeStamp(id3Data) !== undefined) {
      // Look for MPEG header | 1111 1111 | 111X XYZX | where X can be either 0 or 1 and Y or Z should be 1
      // Layer bits (position 14 and 15) in header should be always different from 0 (Layer I or Layer II or Layer III)
      // More info http://www.mp3-tech.org/programmer/frame_header.html
      for (offset = id3Data.length, length = Math.min(data.length - 1, offset + 100); offset < length; offset++) {
        if (__WEBPACK_IMPORTED_MODULE_2__mpegaudio___default.a.probe(data, offset)) {
          __WEBPACK_IMPORTED_MODULE_1__utils_logger__["b" /* logger */].log('MPEG Audio sync word found !');
          return true;
        }
      }
    }
    return false;
  }

  // feed incoming data to the front of the parsing pipeline
  append(data, timeOffset, contiguous, accurateTimeOffset) {
    let id3Data = __WEBPACK_IMPORTED_MODULE_0__demux_id3__["a" /* default */].getID3Data(data, 0);
    let pts = 90 * __WEBPACK_IMPORTED_MODULE_0__demux_id3__["a" /* default */].getTimeStamp(id3Data);
    var offset = id3Data.length;
    var length = data.length;
    var frameIndex = 0, stamp = 0;
    var track = this._audioTrack;

    let id3Samples = [{ pts: pts, dts: pts, data: id3Data }];

    while (offset < length) {
      if (__WEBPACK_IMPORTED_MODULE_2__mpegaudio___default.a.isHeader(data, offset)) {
        var frame = __WEBPACK_IMPORTED_MODULE_2__mpegaudio___default.a.appendFrame(track, data, offset, pts, frameIndex);
        if (frame) {
          offset += frame.length;
          stamp = frame.sample.pts;
          frameIndex++;
        } else {
          //logger.log('Unable to parse Mpeg audio frame');
          break;
        }
      } else if (__WEBPACK_IMPORTED_MODULE_0__demux_id3__["a" /* default */].isHeader(data, offset)) {
        id3Data = __WEBPACK_IMPORTED_MODULE_0__demux_id3__["a" /* default */].getID3Data(data, offset);
        id3Samples.push({ pts: stamp, dts: stamp, data: id3Data });
        offset += id3Data.length;
      } else {
        //nothing found, keep looking
        offset++;
      }
    }

    this.remuxer.remux(track,
      { samples: [] },
      { samples: id3Samples, inputTimeScale: 90000 },
      { samples: [] },
      timeOffset,
      contiguous,
      accurateTimeOffset);
  }

  destroy() {
  }
}

/* harmony default export */ __webpack_exports__["a"] = (MP3Demuxer);


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_aac__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__events__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__events__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_logger__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__remux_mp4_generator__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__errors__ = __webpack_require__(2);
 /**
 * fMP4 remuxer
*/








// 10 seconds
const MAX_SILENT_FRAME_DURATION = 10 * 1000;

class MP4Remuxer {
  constructor(observer, config, typeSupported, vendor) {
    this.observer = observer;
    this.config = config;
    this.typeSupported = typeSupported;
    const userAgent = navigator.userAgent;
    this.isSafari = vendor && vendor.indexOf('Apple') > -1 && userAgent && !userAgent.match('CriOS');
    this.ISGenerated = false;
  }

  destroy() {
  }

  resetTimeStamp(defaultTimeStamp) {
    this._initPTS = this._initDTS = defaultTimeStamp;
  }

  resetInitSegment() {
    this.ISGenerated = false;
  }

  remux(audioTrack,videoTrack,id3Track,textTrack,timeOffset, contiguous,accurateTimeOffset) {
    // generate Init Segment if needed
    if (!this.ISGenerated) {
      this.generateIS(audioTrack,videoTrack,timeOffset);
    } else {
      if (accurateTimeOffset) {
        // check timestamp consistency. it there is more than 10s gap between expected PTS/DTS, recompute initPTS/DTS
        const refPTS = this._initPTS;
        const ptsNormalize = this._PTSNormalize;
        const timeScale = audioTrack.inputTimeScale || videoTrack.inputTimeScale;
        let initPTS = Infinity, initDTS = Infinity;
        let samples = audioTrack.samples;
        if (samples.length) {
           initPTS = initDTS = ptsNormalize(samples[0].pts - timeScale * timeOffset, refPTS);
        }
        samples = videoTrack.samples;
        if (samples.length) {
          let sample = samples[0];
           initPTS = Math.min(initPTS,ptsNormalize(sample.pts - timeScale * timeOffset, refPTS));
           initDTS = Math.min(initDTS,ptsNormalize(sample.dts - timeScale * timeOffset, refPTS));
        }
        if (initPTS !== Infinity) {
          const initPTSDelta = refPTS - initPTS;
          if (Math.abs(initPTSDelta) > 10 * timeScale) {
            __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].warn(`timestamp inconsistency, ${(initPTSDelta/timeScale).toFixed(3)}s delta against expected value: missing discontinuity ? reset initPTS/initDTS`);
            this._initPTS = initPTS;
            this._initDTS = initDTS;
            this.observer.trigger(__WEBPACK_IMPORTED_MODULE_1__events___default.a.INIT_PTS_FOUND, { initPTS: initPTS});
          }
        }
      }
    }

    if (this.ISGenerated) {
      // Purposefully remuxing audio before video, so that remuxVideo can use nextAudioPts, which is
      // calculated in remuxAudio.
      //logger.log('nb AAC samples:' + audioTrack.samples.length);
      if (audioTrack.samples.length) {
        // if initSegment was generated without video samples, regenerate it again
        if (!audioTrack.timescale) {
          __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].warn('regenerate InitSegment as audio detected');
          this.generateIS(audioTrack,videoTrack,timeOffset);
        }
        let audioData = this.remuxAudio(audioTrack,timeOffset,contiguous,accurateTimeOffset);
        //logger.log('nb AVC samples:' + videoTrack.samples.length);
        if (videoTrack.samples.length) {
          let audioTrackLength;
          if (audioData) {
            audioTrackLength = audioData.endPTS - audioData.startPTS;
          }
          // if initSegment was generated without video samples, regenerate it again
          if (!videoTrack.timescale) {
            __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].warn('regenerate InitSegment as video detected');
            this.generateIS(audioTrack,videoTrack,timeOffset);
          }
          this.remuxVideo(videoTrack,timeOffset,contiguous,audioTrackLength, accurateTimeOffset);
        }
      } else {
        let videoData;
        //logger.log('nb AVC samples:' + videoTrack.samples.length);
        if (videoTrack.samples.length) {
          videoData = this.remuxVideo(videoTrack,timeOffset,contiguous, accurateTimeOffset);
        }
        if (videoData && audioTrack.codec) {
          this.remuxEmptyAudio(audioTrack, timeOffset, contiguous, videoData);
        }
      }
    }
    //logger.log('nb ID3 samples:' + audioTrack.samples.length);
    if (id3Track.samples.length) {
      this.remuxID3(id3Track,timeOffset);
    }
    //logger.log('nb ID3 samples:' + audioTrack.samples.length);
    if (textTrack.samples.length) {
      this.remuxText(textTrack,timeOffset);
    }
    //notify end of parsing
    this.observer.trigger(__WEBPACK_IMPORTED_MODULE_1__events___default.a.FRAG_PARSED);
  }

  generateIS(audioTrack,videoTrack,timeOffset) {
    var observer = this.observer,
        audioSamples = audioTrack.samples,
        videoSamples = videoTrack.samples,
        typeSupported = this.typeSupported,
        container = 'audio/mp4',
        tracks = {},
        data = { tracks : tracks },
        computePTSDTS = (this._initPTS === undefined),
        initPTS, initDTS;

    if (computePTSDTS) {
      initPTS = initDTS = Infinity;
    }
    if (audioTrack.config && audioSamples.length) {
      // let's use audio sampling rate as MP4 time scale.
      // rationale is that there is a integer nb of audio frames per audio sample (1024 for AAC)
      // using audio sampling rate here helps having an integer MP4 frame duration
      // this avoids potential rounding issue and AV sync issue
      audioTrack.timescale = audioTrack.samplerate;
      __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].log (`audio sampling rate : ${audioTrack.samplerate}`);
      if (!audioTrack.isAAC) {
        if (typeSupported.mpeg) { // Chrome and Safari
          container = 'audio/mpeg';
          audioTrack.codec = '';
        } else if (typeSupported.mp3) { // Firefox
          audioTrack.codec = 'mp3';
        }
      }
      tracks.audio = {
        container : container,
        codec :  audioTrack.codec,
        initSegment : !audioTrack.isAAC && typeSupported.mpeg ? new Uint8Array() : __WEBPACK_IMPORTED_MODULE_3__remux_mp4_generator__["a" /* default */].initSegment([audioTrack]),
        metadata : {
          channelCount : audioTrack.channelCount
        }
      };
      if (computePTSDTS) {
        // remember first PTS of this demuxing context. for audio, PTS = DTS
        initPTS = initDTS = audioSamples[0].pts - audioTrack.inputTimeScale * timeOffset;
      }
    }

    if (videoTrack.sps && videoTrack.pps && videoSamples.length) {
      // let's use input time scale as MP4 video timescale
      // we use input time scale straight away to avoid rounding issues on frame duration / cts computation
      const inputTimeScale = videoTrack.inputTimeScale;
      videoTrack.timescale = inputTimeScale;
      tracks.video = {
        container : 'video/mp4',
        codec :  videoTrack.codec,
        initSegment : __WEBPACK_IMPORTED_MODULE_3__remux_mp4_generator__["a" /* default */].initSegment([videoTrack]),
        metadata : {
          width : videoTrack.width,
          height : videoTrack.height
        }
      };
      if (computePTSDTS) {
        initPTS = Math.min(initPTS,videoSamples[0].pts - inputTimeScale * timeOffset);
        initDTS = Math.min(initDTS,videoSamples[0].dts - inputTimeScale * timeOffset);
        this.observer.trigger(__WEBPACK_IMPORTED_MODULE_1__events___default.a.INIT_PTS_FOUND, { initPTS: initPTS});
      }
    }

    if(Object.keys(tracks).length) {
      observer.trigger(__WEBPACK_IMPORTED_MODULE_1__events___default.a.FRAG_PARSING_INIT_SEGMENT,data);
      this.ISGenerated = true;
      if (computePTSDTS) {
        this._initPTS = initPTS;
        this._initDTS = initDTS;
      }
    } else {
      observer.trigger(__WEBPACK_IMPORTED_MODULE_1__events___default.a.ERROR, {type : __WEBPACK_IMPORTED_MODULE_4__errors__["b" /* ErrorTypes */].MEDIA_ERROR, details: __WEBPACK_IMPORTED_MODULE_4__errors__["a" /* ErrorDetails */].FRAG_PARSING_ERROR, fatal: false, reason: 'no audio/video samples found'});
    }
  }

  remuxVideo(track, timeOffset, contiguous, audioTrackLength, accurateTimeOffset) {
    var offset = 8,
        timeScale = track.timescale,
        mp4SampleDuration,
        mdat, moof,
        firstPTS, firstDTS,
        nextDTS,
        lastPTS, lastDTS,
        inputSamples = track.samples,
        outputSamples = [],
        nbSamples = inputSamples.length,
        ptsNormalize = this._PTSNormalize,
        initDTS = this._initDTS;

  // for (let i = 0; i < track.samples.length; i++) {
  //   let avcSample = track.samples[i];
  //   let units = avcSample.units;
  //   let unitsString = '';
  //   for (let j = 0; j < units.length ; j++) {
  //     unitsString += units[j].type + ',';
  //     if (units[j].data.length < 500) {
  //       unitsString += Hex.hexDump(units[j].data);
  //     }
  //   }
  //   logger.log(avcSample.pts + '/' + avcSample.dts + ',' + unitsString + avcSample.units.length);
  // }

    // if parsed fragment is contiguous with last one, let's use last DTS value as reference
    let nextAvcDts = this.nextAvcDts;

    const isSafari = this.isSafari;

    // Safari does not like overlapping DTS on consecutive fragments. let's use nextAvcDts to overcome this if fragments are consecutive
    if (isSafari) {
      // also consider consecutive fragments as being contiguous (even if a level switch occurs),
      // for sake of clarity:
      // consecutive fragments are frags with
      //  - less than 100ms gaps between new time offset (if accurate) and next expected PTS OR
      //  - less than 200 ms PTS gaps (timeScale/5)
      contiguous |= (inputSamples.length && nextAvcDts &&
                     ((accurateTimeOffset && Math.abs(timeOffset-nextAvcDts/timeScale) < 0.1) ||
                      Math.abs((inputSamples[0].pts-nextAvcDts-initDTS)) < timeScale/5)
                      );
    }

    if (!contiguous) {
      // if not contiguous, let's use target timeOffset
      nextAvcDts = timeOffset*timeScale;
    }

  // PTS is coded on 33bits, and can loop from -2^32 to 2^32
  // ptsNormalize will make PTS/DTS value monotonic, we use last known DTS value as reference value
    inputSamples.forEach(function(sample) {
      sample.pts = ptsNormalize(sample.pts-initDTS, nextAvcDts);
      sample.dts = ptsNormalize(sample.dts-initDTS, nextAvcDts);
    });

    // sort video samples by DTS then PTS then demux id order
    inputSamples.sort(function(a, b) {
      const deltadts = a.dts - b.dts;
      const deltapts = a.pts - b.pts;
      return deltadts ? deltadts : deltapts ? deltapts : (a.id - b.id);
    });

    // handle broken streams with PTS < DTS, tolerance up 200ms (18000 in 90kHz timescale)
    let PTSDTSshift = inputSamples.reduce( (prev, curr) => Math.max(Math.min(prev,curr.pts-curr.dts),-18000),0);
    if (PTSDTSshift < 0) {
      __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].warn(`PTS < DTS detected in video samples, shifting DTS by ${Math.round(PTSDTSshift/90)} ms to overcome this issue`);
      for (let i = 0; i < inputSamples.length; i++) {
        inputSamples[i].dts += PTSDTSshift;
      }
    }

    // compute first DTS and last DTS, normalize them against reference value
    let sample = inputSamples[0];
    firstDTS =  Math.max(sample.dts,0);
    firstPTS =  Math.max(sample.pts,0);

    // check timestamp continuity accross consecutive fragments (this is to remove inter-fragment gap/hole)
    let delta = Math.round((firstDTS - nextAvcDts) / 90);
    // if fragment are contiguous, detect hole/overlapping between fragments
    if (contiguous) {
      if (delta) {
        if (delta > 1) {
          __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].log(`AVC:${delta} ms hole between fragments detected,filling it`);
        } else if (delta < -1) {
          __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].log(`AVC:${(-delta)} ms overlapping between fragments detected`);
        }
        // remove hole/gap : set DTS to next expected DTS
        firstDTS = nextAvcDts;
        inputSamples[0].dts = firstDTS;
        // offset PTS as well, ensure that PTS is smaller or equal than new DTS
        firstPTS = Math.max(firstPTS - delta, nextAvcDts);
        inputSamples[0].pts = firstPTS;
        __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].log(`Video/PTS/DTS adjusted: ${Math.round(firstPTS/90)}/${Math.round(firstDTS/90)},delta:${delta} ms`);
      }
    }
    nextDTS = firstDTS;

    // compute lastPTS/lastDTS
    sample = inputSamples[inputSamples.length-1];
    lastDTS =  Math.max(sample.dts,0);
    lastPTS =  Math.max(sample.pts,0,lastDTS);

      // on Safari let's signal the same sample duration for all samples
      // sample duration (as expected by trun MP4 boxes), should be the delta between sample DTS
      // set this constant duration as being the avg delta between consecutive DTS.
    if (isSafari) {
      mp4SampleDuration = Math.round((lastDTS-firstDTS)/(inputSamples.length-1));
    }

    let nbNalu = 0, naluLen = 0;
    for (let i = 0 ; i < nbSamples; i++) {
      // compute total/avc sample length and nb of NAL units
      let sample = inputSamples[i], units = sample.units, nbUnits = units.length, sampleLen = 0;
      for (let j = 0; j < nbUnits; j++) {
        sampleLen += units[j].data.length;
      }
      naluLen += sampleLen;
      nbNalu += nbUnits;
      sample.length = sampleLen;

      // normalize PTS/DTS
      if (isSafari) {
        // sample DTS is computed using a constant decoding offset (mp4SampleDuration) between samples
        sample.dts = firstDTS + i*mp4SampleDuration;
      } else {
        // ensure sample monotonic DTS
        sample.dts = Math.max(sample.dts,firstDTS);
      }
      // ensure that computed value is greater or equal than sample DTS
      sample.pts = Math.max(sample.pts , sample.dts);
    }

    /* concatenate the video data and construct the mdat in place
      (need 8 more bytes to fill length and mpdat type) */
    let mdatSize = naluLen + (4 * nbNalu) + 8;
    try {
      mdat = new Uint8Array(mdatSize);
    } catch(err) {
      this.observer.trigger(__WEBPACK_IMPORTED_MODULE_1__events___default.a.ERROR, {type : __WEBPACK_IMPORTED_MODULE_4__errors__["b" /* ErrorTypes */].MUX_ERROR, details: __WEBPACK_IMPORTED_MODULE_4__errors__["a" /* ErrorDetails */].REMUX_ALLOC_ERROR, fatal: false, bytes : mdatSize, reason: `fail allocating video mdat ${mdatSize}`});
      return;
    }
    let view = new DataView(mdat.buffer);
    view.setUint32(0, mdatSize);
    mdat.set(__WEBPACK_IMPORTED_MODULE_3__remux_mp4_generator__["a" /* default */].types.mdat, 4);

    for (let i = 0 ; i < nbSamples; i++) {
      let avcSample = inputSamples[i],
          avcSampleUnits = avcSample.units,
          mp4SampleLength = 0,
          compositionTimeOffset;
      // convert NALU bitstream to MP4 format (prepend NALU with size field)
      for(let j = 0, nbUnits = avcSampleUnits.length; j < nbUnits ; j++) {
        let unit = avcSampleUnits[j],
            unitData = unit.data,
            unitDataLen = unit.data.byteLength;
        view.setUint32(offset, unitDataLen);
        offset += 4;
        mdat.set(unitData, offset);
        offset += unitDataLen;
        mp4SampleLength += 4 + unitDataLen;
      }

      if(!isSafari) {
        // expected sample duration is the Decoding Timestamp diff of consecutive samples
        if (i < nbSamples - 1) {
          mp4SampleDuration = inputSamples[i+1].dts - avcSample.dts;
        } else {
          let config = this.config,
              lastFrameDuration = avcSample.dts - inputSamples[i > 0 ? i-1 : i].dts;
          if (config.stretchShortVideoTrack) {
            // In some cases, a segment's audio track duration may exceed the video track duration.
            // Since we've already remuxed audio, and we know how long the audio track is, we look to
            // see if the delta to the next segment is longer than the minimum of maxBufferHole and
            // maxSeekHole. If so, playback would potentially get stuck, so we artificially inflate
            // the duration of the last frame to minimize any potential gap between segments.
            let maxBufferHole = config.maxBufferHole,
                maxSeekHole = config.maxSeekHole,
                gapTolerance = Math.floor(Math.min(maxBufferHole, maxSeekHole) * timeScale),
                deltaToFrameEnd = (audioTrackLength ? firstPTS + audioTrackLength * timeScale : this.nextAudioPts) - avcSample.pts;
            if (deltaToFrameEnd > gapTolerance) {
              // We subtract lastFrameDuration from deltaToFrameEnd to try to prevent any video
              // frame overlap. maxBufferHole/maxSeekHole should be >> lastFrameDuration anyway.
              mp4SampleDuration = deltaToFrameEnd - lastFrameDuration;
              if (mp4SampleDuration < 0) {
                mp4SampleDuration = lastFrameDuration;
              }
              __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].log(`It is approximately ${deltaToFrameEnd/90} ms to the next segment; using duration ${mp4SampleDuration/90} ms for the last video frame.`);
            } else {
              mp4SampleDuration = lastFrameDuration;
            }
          } else {
            mp4SampleDuration = lastFrameDuration;
          }
        }
        compositionTimeOffset = Math.round(avcSample.pts - avcSample.dts);
      } else {
        compositionTimeOffset = Math.max(0,mp4SampleDuration*Math.round((avcSample.pts - avcSample.dts)/mp4SampleDuration));
      }


      //console.log('PTS/DTS/initDTS/normPTS/normDTS/relative PTS : ${avcSample.pts}/${avcSample.dts}/${initDTS}/${ptsnorm}/${dtsnorm}/${(avcSample.pts/4294967296).toFixed(3)}');
      outputSamples.push({
        size: mp4SampleLength,
         // constant duration
        duration: mp4SampleDuration,
        cts: compositionTimeOffset,
        flags: {
          isLeading: 0,
          isDependedOn: 0,
          hasRedundancy: 0,
          degradPrio: 0,
          dependsOn : avcSample.key ? 2 : 1,
          isNonSync : avcSample.key ? 0 : 1
        }
      });
    }
    // next AVC sample DTS should be equal to last sample DTS + last sample duration (in PES timescale)
    this.nextAvcDts = lastDTS + mp4SampleDuration;
    let dropped = track.dropped;
    track.len = 0;
    track.nbNalu = 0;
    track.dropped = 0;
    if(outputSamples.length && navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
      let flags = outputSamples[0].flags;
    // chrome workaround, mark first sample as being a Random Access Point to avoid sourcebuffer append issue
    // https://code.google.com/p/chromium/issues/detail?id=229412
      flags.dependsOn = 2;
      flags.isNonSync = 0;
    }
    track.samples = outputSamples;
    moof = __WEBPACK_IMPORTED_MODULE_3__remux_mp4_generator__["a" /* default */].moof(track.sequenceNumber++, firstDTS , track);
    track.samples = [];

    let data = {
      data1: moof,
      data2: mdat,
      startPTS: firstPTS / timeScale,
      endPTS: (lastPTS +  mp4SampleDuration) / timeScale,
      startDTS: firstDTS / timeScale,
      endDTS: this.nextAvcDts / timeScale,
      type: 'video',
      nb: outputSamples.length,
      dropped : dropped
    };
    this.observer.trigger(__WEBPACK_IMPORTED_MODULE_1__events___default.a.FRAG_PARSING_DATA, data);
    return data;
  }

  remuxAudio(track, timeOffset, contiguous,accurateTimeOffset) {
    const inputTimeScale = track.inputTimeScale,
          mp4timeScale = track.timescale,
          scaleFactor = inputTimeScale/mp4timeScale,
          mp4SampleDuration = track.isAAC ? 1024 : 1152,
          inputSampleDuration = mp4SampleDuration * scaleFactor,
          ptsNormalize = this._PTSNormalize,
          initDTS = this._initDTS,
          rawMPEG = !track.isAAC && this.typeSupported.mpeg;

    var offset,
        mp4Sample,
        fillFrame,
        mdat, moof,
        firstPTS, lastPTS,
        inputSamples = track.samples,
        outputSamples = [],
        nextAudioPts = this.nextAudioPts;

    // for audio samples, also consider consecutive fragments as being contiguous (even if a level switch occurs),
    // for sake of clarity:
    // consecutive fragments are frags with
    //  - less than 100ms gaps between new time offset (if accurate) and next expected PTS OR
    //  - less than 20 audio frames distance
    // contiguous fragments are consecutive fragments from same quality level (same level, new SN = old SN + 1)
    // this helps ensuring audio continuity
    // and this also avoids audio glitches/cut when switching quality, or reporting wrong duration on first audio frame
    contiguous |= (inputSamples.length && nextAudioPts &&
                   ((accurateTimeOffset && Math.abs(timeOffset-nextAudioPts/inputTimeScale) < 0.1) ||
                    Math.abs((inputSamples[0].pts-nextAudioPts-initDTS)) < 20*inputSampleDuration)
                    );

    if (!contiguous) {
      // if fragments are not contiguous, let's use timeOffset to compute next Audio PTS
      nextAudioPts = timeOffset*inputTimeScale;
    }

    // compute normalized PTS
    inputSamples.forEach(function(sample) {
      sample.pts = sample.dts = ptsNormalize(sample.pts - initDTS, nextAudioPts);
    });

    // sort based on normalized PTS (this is to avoid sorting issues in case timestamp
    // reloop in the middle of our samples array)
    inputSamples.sort(function(a, b) {
      return a.pts - b.pts;
    });

    // If the audio track is missing samples, the frames seem to get "left-shifted" within the
    // resulting mp4 segment, causing sync issues and leaving gaps at the end of the audio segment.
    // In an effort to prevent this from happening, we inject frames here where there are gaps.
    // When possible, we inject a silent frame; when that's not possible, we duplicate the last
    // frame.

    // only inject/drop audio frames in case time offset is accurate
    if (accurateTimeOffset && track.isAAC) {
      for (let i = 0, nextPts = nextAudioPts; i < inputSamples.length; ) {
        // First, let's see how far off this frame is from where we expect it to be
        var sample = inputSamples[i], delta;
        let pts = sample.pts;
        delta = pts - nextPts;

        const duration = Math.abs(1000*delta/inputTimeScale);

        // If we're overlapping by more than a duration, drop this sample
        if (delta <= -inputSampleDuration) {
          __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].warn(`Dropping 1 audio frame @ ${(nextPts/inputTimeScale).toFixed(3)}s due to ${duration} ms overlap.`);
          inputSamples.splice(i, 1);
          track.len -= sample.unit.length;
          // Don't touch nextPtsNorm or i
        }

        // Insert missing frames if:
        // 1: We're more than one frame away
        // 2: Not more than MAX_SILENT_FRAME_DURATION away
        // 3: currentTime (aka nextPtsNorm) is not 0
        else if (delta >= inputSampleDuration && duration < MAX_SILENT_FRAME_DURATION && nextPts) {
          var missing = Math.round(delta / inputSampleDuration);
          __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].warn(`Injecting ${missing} audio frame @ ${(nextPts/inputTimeScale).toFixed(3)}s due to ${Math.round(1000*delta/inputTimeScale)} ms gap.`);
          for (var j = 0; j < missing; j++) {
            let newStamp = Math.max(nextPts,0);
            fillFrame = __WEBPACK_IMPORTED_MODULE_0__helper_aac__["a" /* default */].getSilentFrame(track.manifestCodec || track.codec,track.channelCount);
            if (!fillFrame) {
              __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].log('Unable to get silent frame for given audio codec; duplicating last frame instead.');
              fillFrame = sample.unit.subarray();
            }
            inputSamples.splice(i, 0, {unit: fillFrame, pts: newStamp, dts: newStamp});
            track.len += fillFrame.length;
            nextPts += inputSampleDuration;
            i++;
          }

          // Adjust sample to next expected pts
          sample.pts = sample.dts = nextPts;
          nextPts += inputSampleDuration;
          i++;
        } else {
        // Otherwise, just adjust pts
          if (Math.abs(delta) > (0.1 * inputSampleDuration)) {
            //logger.log(`Invalid frame delta ${Math.round(delta + inputSampleDuration)} at PTS ${Math.round(pts / 90)} (should be ${Math.round(inputSampleDuration)}).`);
          }
          sample.pts = sample.dts = nextPts;
          nextPts += inputSampleDuration;
          i++;
        }
      }
    }


    for (let j =0 , nbSamples = inputSamples.length; j < nbSamples ; j++) {
      let audioSample = inputSamples[j];
      let unit = audioSample.unit;
      let pts = audioSample.pts;
      //logger.log(`Audio/PTS:${Math.round(pts/90)}`);
      // if not first sample
      if (lastPTS !== undefined) {
        mp4Sample.duration = Math.round((pts - lastPTS) / scaleFactor);
      } else {
        let delta = Math.round(1000 * (pts - nextAudioPts) / inputTimeScale),
            numMissingFrames = 0;
        // if fragment are contiguous, detect hole/overlapping between fragments
        // contiguous fragments are consecutive fragments from same quality level (same level, new SN = old SN + 1)
        if (contiguous && track.isAAC) {
          // log delta
          if (delta) {
            if (delta > 0 && delta < MAX_SILENT_FRAME_DURATION) {
              numMissingFrames = Math.round((pts - nextAudioPts) / inputSampleDuration);
              __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].log(`${delta} ms hole between AAC samples detected,filling it`);
              if (numMissingFrames > 0) {
                fillFrame = __WEBPACK_IMPORTED_MODULE_0__helper_aac__["a" /* default */].getSilentFrame(track.manifestCodec || track.codec,track.channelCount);
                if (!fillFrame) {
                  fillFrame = unit.subarray();
                }
                track.len += numMissingFrames * fillFrame.length;
              }
              // if we have frame overlap, overlapping for more than half a frame duraion
            } else if (delta < -12) {
              // drop overlapping audio frames... browser will deal with it
              __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].log(`drop overlapping AAC sample, expected/parsed/delta:${(nextAudioPts/inputTimeScale).toFixed(3)}s/${(pts/inputTimeScale).toFixed(3)}s/${(-delta)}ms`);
              track.len -= unit.byteLength;
              continue;
            }
            // set PTS/DTS to expected PTS/DTS
            pts = nextAudioPts;
          }
        }
        // remember first PTS of our audioSamples, ensure value is positive
        firstPTS = Math.max(0, pts);
        if(track.len > 0) {
          /* concatenate the audio data and construct the mdat in place
            (need 8 more bytes to fill length and mdat type) */
          let mdatSize = rawMPEG ? track.len : track.len + 8;
          offset = rawMPEG ? 0 : 8;
          try {
            mdat = new Uint8Array(mdatSize);
          } catch(err) {
            this.observer.trigger(__WEBPACK_IMPORTED_MODULE_1__events___default.a.ERROR, {type : __WEBPACK_IMPORTED_MODULE_4__errors__["b" /* ErrorTypes */].MUX_ERROR, details: __WEBPACK_IMPORTED_MODULE_4__errors__["a" /* ErrorDetails */].REMUX_ALLOC_ERROR, fatal: false, bytes : mdatSize, reason: `fail allocating audio mdat ${mdatSize}`});
            return;
          }
          if (!rawMPEG) {
            const view = new DataView(mdat.buffer);
            view.setUint32(0, mdatSize);
            mdat.set(__WEBPACK_IMPORTED_MODULE_3__remux_mp4_generator__["a" /* default */].types.mdat, 4);
          }
        } else {
          // no audio samples
          return;
        }
        for (let i = 0; i < numMissingFrames; i++) {
          fillFrame = __WEBPACK_IMPORTED_MODULE_0__helper_aac__["a" /* default */].getSilentFrame(track.manifestCodec || track.codec,track.channelCount);
          if (!fillFrame) {
            __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].log('Unable to get silent frame for given audio codec; duplicating this frame instead.');
            fillFrame = unit.subarray();
          }
          mdat.set(fillFrame, offset);
          offset += fillFrame.byteLength;
          mp4Sample = {
            size: fillFrame.byteLength,
            cts: 0,
            duration: 1024,
            flags: {
              isLeading: 0,
              isDependedOn: 0,
              hasRedundancy: 0,
              degradPrio: 0,
              dependsOn: 1,
            }
          };
          outputSamples.push(mp4Sample);
        }
      }
      mdat.set(unit, offset);
      let unitLen = unit.byteLength;
      offset += unitLen;
      //console.log('PTS/DTS/initDTS/normPTS/normDTS/relative PTS : ${audioSample.pts}/${audioSample.dts}/${initDTS}/${ptsnorm}/${dtsnorm}/${(audioSample.pts/4294967296).toFixed(3)}');
      mp4Sample = {
        size: unitLen,
        cts: 0,
        duration: 0,
        flags: {
          isLeading: 0,
          isDependedOn: 0,
          hasRedundancy: 0,
          degradPrio: 0,
          dependsOn: 1,
        }
      };
      outputSamples.push(mp4Sample);
      lastPTS = pts;
    }
    var lastSampleDuration = 0;
    var nbSamples = outputSamples.length;
    //set last sample duration as being identical to previous sample
    if (nbSamples >= 2) {
      lastSampleDuration = outputSamples[nbSamples - 2].duration;
      mp4Sample.duration = lastSampleDuration;
    }
    if (nbSamples) {
      // next audio sample PTS should be equal to last sample PTS + duration
      this.nextAudioPts = nextAudioPts = lastPTS + scaleFactor * lastSampleDuration;
      //logger.log('Audio/PTS/PTSend:' + audioSample.pts.toFixed(0) + '/' + this.nextAacDts.toFixed(0));
      track.len = 0;
      track.samples = outputSamples;
      if (rawMPEG) {
        moof = new Uint8Array();
      } else {
        moof = __WEBPACK_IMPORTED_MODULE_3__remux_mp4_generator__["a" /* default */].moof(track.sequenceNumber++, firstPTS / scaleFactor, track);
      }
      track.samples = [];
      const start = firstPTS / inputTimeScale;
      const end = nextAudioPts / inputTimeScale;
      const audioData = {
        data1: moof,
        data2: mdat,
        startPTS: start,
        endPTS: end,
        startDTS: start,
        endDTS: end,
        type: 'audio',
        nb: nbSamples
      };
      this.observer.trigger(__WEBPACK_IMPORTED_MODULE_1__events___default.a.FRAG_PARSING_DATA, audioData);
      return audioData;
    }
    return null;
  }

  remuxEmptyAudio(track, timeOffset, contiguous, videoData) {
    let inputTimeScale = track.inputTimeScale,
        mp4timeScale = track.samplerate ? track.samplerate : inputTimeScale,
        scaleFactor = inputTimeScale/mp4timeScale,
        nextAudioPts = this.nextAudioPts,

        // sync with video's timestamp
        startDTS = (nextAudioPts !== undefined ? nextAudioPts : videoData.startDTS * inputTimeScale) + this._initDTS,
        endDTS = videoData.endDTS * inputTimeScale + this._initDTS,
        // one sample's duration value
        sampleDuration = 1024,
        frameDuration = scaleFactor * sampleDuration,

        // samples count of this segment's duration
        nbSamples = Math.ceil((endDTS - startDTS) / frameDuration),

        // silent frame
        silentFrame = __WEBPACK_IMPORTED_MODULE_0__helper_aac__["a" /* default */].getSilentFrame(track.manifestCodec || track.codec,track.channelCount);

        __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].warn('remux empty Audio');
    // Can't remux if we can't generate a silent frame...
    if (!silentFrame) {
      __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].trace('Unable to remuxEmptyAudio since we were unable to get a silent frame for given audio codec!');
      return;
    }

    let samples = [];
    for(var i = 0; i < nbSamples; i++) {
      var stamp = startDTS + i * frameDuration;
      samples.push({unit: silentFrame, pts: stamp, dts: stamp});
      track.len += silentFrame.length;
    }
    track.samples = samples;

    this.remuxAudio(track, timeOffset, contiguous);
  }

  remuxID3(track,timeOffset) {
    var length = track.samples.length, sample;
    const inputTimeScale = track.inputTimeScale;
    const initPTS = this._initPTS;
    const initDTS = this._initDTS;
    // consume samples
    if(length) {
      for(var index = 0; index < length; index++) {
        sample = track.samples[index];
        // setting id3 pts, dts to relative time
        // using this._initPTS and this._initDTS to calculate relative time
        sample.pts = ((sample.pts - initPTS) / inputTimeScale);
        sample.dts = ((sample.dts - initDTS) / inputTimeScale);
      }
      this.observer.trigger(__WEBPACK_IMPORTED_MODULE_1__events___default.a.FRAG_PARSING_METADATA, {
        samples:track.samples
      });
    }

    track.samples = [];
    timeOffset = timeOffset;
  }

  remuxText(track,timeOffset) {
    track.samples.sort(function(a, b) {
      return (a.pts-b.pts);
    });

    var length = track.samples.length, sample;
    const inputTimeScale = track.inputTimeScale;
    const initPTS = this._initPTS;
    // consume samples
    if(length) {
      for(var index = 0; index < length; index++) {
        sample = track.samples[index];
        // setting text pts, dts to relative time
        // using this._initPTS and this._initDTS to calculate relative time
        sample.pts = ((sample.pts - initPTS) / inputTimeScale);
      }
      this.observer.trigger(__WEBPACK_IMPORTED_MODULE_1__events___default.a.FRAG_PARSING_USERDATA, {
        samples:track.samples
      });
    }

    track.samples = [];
    timeOffset = timeOffset;
  }

  _PTSNormalize(value, reference) {
    var offset;
    if (reference === undefined) {
      return value;
    }
    if (reference < value) {
      // - 2^33
      offset = -8589934592;
    } else {
      // + 2^33
      offset = 8589934592;
    }
    /* PTS is 33bit (from 0 to 2^33 -1)
      if diff between value and reference is bigger than half of the amplitude (2^32) then it means that
      PTS looping occured. fill the gap */
    while (Math.abs(value - reference) > 4294967296) {
        value += offset;
    }
    return value;
  }

}

/* harmony default export */ __webpack_exports__["a"] = (MP4Remuxer);


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 *  AAC helper
 */

class AAC {
  static getSilentFrame(codec,channelCount) {
    switch(codec) {
      case 'mp4a.40.2':
        if (channelCount === 1) {
          return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x23, 0x80]);
        } else if (channelCount === 2) {
          return new Uint8Array([0x21, 0x00, 0x49, 0x90, 0x02, 0x19, 0x00, 0x23, 0x80]);
        } else if (channelCount === 3) {
          return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x8e]);
        } else if (channelCount === 4) {
          return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x80, 0x2c, 0x80, 0x08, 0x02, 0x38]);
        } else if (channelCount === 5) {
          return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x82, 0x30, 0x04, 0x99, 0x00, 0x21, 0x90, 0x02, 0x38]);
        } else if (channelCount === 6) {
          return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x82, 0x30, 0x04, 0x99, 0x00, 0x21, 0x90, 0x02, 0x00, 0xb2, 0x00, 0x20, 0x08, 0xe0]);
        }
        break;
    // handle HE-AAC below (mp4a.40.5 / mp4a.40.29)
      default:
        if (channelCount === 1) {
          // ffmpeg -y -f lavfi -i "aevalsrc=0:d=0.05" -c:a libfdk_aac -profile:a aac_he -b:a 4k output.aac && hexdump -v -e '16/1 "0x%x," "\n"' -v output.aac
          return new Uint8Array([0x1,0x40,0x22,0x80,0xa3,0x4e,0xe6,0x80,0xba,0x8,0x0,0x0,0x0,0x1c,0x6,0xf1,0xc1,0xa,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5e]);
        } else if (channelCount === 2) {
          // ffmpeg -y -f lavfi -i "aevalsrc=0|0:d=0.05" -c:a libfdk_aac -profile:a aac_he_v2 -b:a 4k output.aac && hexdump -v -e '16/1 "0x%x," "\n"' -v output.aac
          return new Uint8Array([0x1,0x40,0x22,0x80,0xa3,0x5e,0xe6,0x80,0xba,0x8,0x0,0x0,0x0,0x0,0x95,0x0,0x6,0xf1,0xa1,0xa,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5e]);
        } else if (channelCount === 3) {
          // ffmpeg -y -f lavfi -i "aevalsrc=0|0|0:d=0.05" -c:a libfdk_aac -profile:a aac_he_v2 -b:a 4k output.aac && hexdump -v -e '16/1 "0x%x," "\n"' -v output.aac
          return new Uint8Array([0x1,0x40,0x22,0x80,0xa3,0x5e,0xe6,0x80,0xba,0x8,0x0,0x0,0x0,0x0,0x95,0x0,0x6,0xf1,0xa1,0xa,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5a,0x5e]);
        }
        break;
    }
    return null;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (AAC);


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Generate MP4 Box
*/

//import Hex from '../utils/hex';

const UINT32_MAX = Math.pow(2, 32) - 1;

class MP4 {
  static init() {
    MP4.types = {
      avc1: [], // codingname
      avcC: [],
      btrt: [],
      dinf: [],
      dref: [],
      esds: [],
      ftyp: [],
      hdlr: [],
      mdat: [],
      mdhd: [],
      mdia: [],
      mfhd: [],
      minf: [],
      moof: [],
      moov: [],
      mp4a: [],
      '.mp3': [],
      mvex: [],
      mvhd: [],
      pasp: [],
      sdtp: [],
      stbl: [],
      stco: [],
      stsc: [],
      stsd: [],
      stsz: [],
      stts: [],
      tfdt: [],
      tfhd: [],
      traf: [],
      trak: [],
      trun: [],
      trex: [],
      tkhd: [],
      vmhd: [],
      smhd: []
    };

    var i;
    for (i in MP4.types) {
      if (MP4.types.hasOwnProperty(i)) {
        MP4.types[i] = [
          i.charCodeAt(0),
          i.charCodeAt(1),
          i.charCodeAt(2),
          i.charCodeAt(3)
        ];
      }
    }

    var videoHdlr = new Uint8Array([
      0x00, // version 0
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x00, // pre_defined
      0x76, 0x69, 0x64, 0x65, // handler_type: 'vide'
      0x00, 0x00, 0x00, 0x00, // reserved
      0x00, 0x00, 0x00, 0x00, // reserved
      0x00, 0x00, 0x00, 0x00, // reserved
      0x56, 0x69, 0x64, 0x65,
      0x6f, 0x48, 0x61, 0x6e,
      0x64, 0x6c, 0x65, 0x72, 0x00 // name: 'VideoHandler'
    ]);

    var audioHdlr = new Uint8Array([
      0x00, // version 0
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x00, // pre_defined
      0x73, 0x6f, 0x75, 0x6e, // handler_type: 'soun'
      0x00, 0x00, 0x00, 0x00, // reserved
      0x00, 0x00, 0x00, 0x00, // reserved
      0x00, 0x00, 0x00, 0x00, // reserved
      0x53, 0x6f, 0x75, 0x6e,
      0x64, 0x48, 0x61, 0x6e,
      0x64, 0x6c, 0x65, 0x72, 0x00 // name: 'SoundHandler'
    ]);

    MP4.HDLR_TYPES = {
      'video': videoHdlr,
      'audio': audioHdlr
    };

    var dref = new Uint8Array([
      0x00, // version 0
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x01, // entry_count
      0x00, 0x00, 0x00, 0x0c, // entry_size
      0x75, 0x72, 0x6c, 0x20, // 'url' type
      0x00, // version 0
      0x00, 0x00, 0x01 // entry_flags
    ]);

    var stco = new Uint8Array([
      0x00, // version
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x00 // entry_count
    ]);

    MP4.STTS = MP4.STSC = MP4.STCO = stco;

    MP4.STSZ = new Uint8Array([
      0x00, // version
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x00, // sample_size
      0x00, 0x00, 0x00, 0x00, // sample_count
    ]);
    MP4.VMHD = new Uint8Array([
      0x00, // version
      0x00, 0x00, 0x01, // flags
      0x00, 0x00, // graphicsmode
      0x00, 0x00,
      0x00, 0x00,
      0x00, 0x00 // opcolor
    ]);
    MP4.SMHD = new Uint8Array([
      0x00, // version
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, // balance
      0x00, 0x00 // reserved
    ]);

    MP4.STSD = new Uint8Array([
      0x00, // version 0
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x01]);// entry_count

    var majorBrand = new Uint8Array([105,115,111,109]); // isom
    var avc1Brand = new Uint8Array([97,118,99,49]); // avc1
    var minorVersion = new Uint8Array([0, 0, 0, 1]);

    MP4.FTYP = MP4.box(MP4.types.ftyp, majorBrand, minorVersion, majorBrand, avc1Brand);
    MP4.DINF = MP4.box(MP4.types.dinf, MP4.box(MP4.types.dref, dref));
  }

  static box(type) {
  var
    payload = Array.prototype.slice.call(arguments, 1),
    size = 8,
    i = payload.length,
    len = i,
    result;
    // calculate the total size we need to allocate
    while (i--) {
      size += payload[i].byteLength;
    }
    result = new Uint8Array(size);
    result[0] = (size >> 24) & 0xff;
    result[1] = (size >> 16) & 0xff;
    result[2] = (size >> 8) & 0xff;
    result[3] = size  & 0xff;
    result.set(type, 4);
    // copy the payload into the result
    for (i = 0, size = 8; i < len; i++) {
      // copy payload[i] array @ offset size
      result.set(payload[i], size);
      size += payload[i].byteLength;
    }
    return result;
  }

  static hdlr(type) {
    return MP4.box(MP4.types.hdlr, MP4.HDLR_TYPES[type]);
  }

  static mdat(data) {
    return MP4.box(MP4.types.mdat, data);
  }

  static mdhd(timescale, duration) {
    duration *= timescale;
    const upperWordDuration = Math.floor(duration / (UINT32_MAX + 1));
    const lowerWordDuration = Math.floor(duration % (UINT32_MAX + 1));
    return MP4.box(MP4.types.mdhd, new Uint8Array([
      0x01, // version 1
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, // creation_time
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, // modification_time
      (timescale >> 24) & 0xFF,
      (timescale >> 16) & 0xFF,
      (timescale >>  8) & 0xFF,
      timescale & 0xFF, // timescale
      (upperWordDuration >> 24),
      (upperWordDuration >> 16) & 0xFF,
      (upperWordDuration >>  8) & 0xFF,
      upperWordDuration & 0xFF,
      (lowerWordDuration >> 24),
      (lowerWordDuration >> 16) & 0xFF,
      (lowerWordDuration >>  8) & 0xFF,
      lowerWordDuration & 0xFF,
      0x55, 0xc4, // 'und' language (undetermined)
      0x00, 0x00
    ]));
  }

  static mdia(track) {
    return MP4.box(MP4.types.mdia, MP4.mdhd(track.timescale, track.duration), MP4.hdlr(track.type), MP4.minf(track));
  }

  static mfhd(sequenceNumber) {
    return MP4.box(MP4.types.mfhd, new Uint8Array([
      0x00,
      0x00, 0x00, 0x00, // flags
      (sequenceNumber >> 24),
      (sequenceNumber >> 16) & 0xFF,
      (sequenceNumber >>  8) & 0xFF,
      sequenceNumber & 0xFF, // sequence_number
    ]));
  }

  static minf(track) {
    if (track.type === 'audio') {
      return MP4.box(MP4.types.minf, MP4.box(MP4.types.smhd, MP4.SMHD), MP4.DINF, MP4.stbl(track));
    } else {
      return MP4.box(MP4.types.minf, MP4.box(MP4.types.vmhd, MP4.VMHD), MP4.DINF, MP4.stbl(track));
    }
  }

  static moof(sn, baseMediaDecodeTime, track) {
    return MP4.box(MP4.types.moof, MP4.mfhd(sn), MP4.traf(track,baseMediaDecodeTime));
  }
/**
 * @param tracks... (optional) {array} the tracks associated with this movie
 */
  static moov(tracks) {
    var
      i = tracks.length,
      boxes = [];

    while (i--) {
      boxes[i] = MP4.trak(tracks[i]);
    }

    return MP4.box.apply(null, [MP4.types.moov, MP4.mvhd(tracks[0].timescale, tracks[0].duration)].concat(boxes).concat(MP4.mvex(tracks)));
  }

  static mvex(tracks) {
    var
      i = tracks.length,
      boxes = [];

    while (i--) {
      boxes[i] = MP4.trex(tracks[i]);
    }
    return MP4.box.apply(null, [MP4.types.mvex].concat(boxes));
  }

  static mvhd(timescale,duration) {
    duration*=timescale;
    const upperWordDuration = Math.floor(duration / (UINT32_MAX + 1));
    const lowerWordDuration = Math.floor(duration % (UINT32_MAX + 1));
    var
      bytes = new Uint8Array([
        0x01, // version 1
        0x00, 0x00, 0x00, // flags
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, // creation_time
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, // modification_time
        (timescale >> 24) & 0xFF,
        (timescale >> 16) & 0xFF,
        (timescale >>  8) & 0xFF,
        timescale & 0xFF, // timescale
        (upperWordDuration >> 24),
        (upperWordDuration >> 16) & 0xFF,
        (upperWordDuration >>  8) & 0xFF,
        upperWordDuration & 0xFF,
        (lowerWordDuration >> 24),
        (lowerWordDuration >> 16) & 0xFF,
        (lowerWordDuration >>  8) & 0xFF,
        lowerWordDuration & 0xFF,
        0x00, 0x01, 0x00, 0x00, // 1.0 rate
        0x01, 0x00, // 1.0 volume
        0x00, 0x00, // reserved
        0x00, 0x00, 0x00, 0x00, // reserved
        0x00, 0x00, 0x00, 0x00, // reserved
        0x00, 0x01, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00,
        0x00, 0x01, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00,
        0x40, 0x00, 0x00, 0x00, // transformation: unity matrix
        0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, // pre_defined
        0xff, 0xff, 0xff, 0xff // next_track_ID
      ]);
    return MP4.box(MP4.types.mvhd, bytes);
  }

  static sdtp(track) {
    var
      samples = track.samples || [],
      bytes = new Uint8Array(4 + samples.length),
      flags,
      i;
    // leave the full box header (4 bytes) all zero
    // write the sample table
    for (i = 0; i < samples.length; i++) {
      flags = samples[i].flags;
      bytes[i + 4] = (flags.dependsOn << 4) |
        (flags.isDependedOn << 2) |
        (flags.hasRedundancy);
    }

    return MP4.box(MP4.types.sdtp, bytes);
  }

  static stbl(track) {
    return MP4.box(MP4.types.stbl, MP4.stsd(track), MP4.box(MP4.types.stts, MP4.STTS), MP4.box(MP4.types.stsc, MP4.STSC), MP4.box(MP4.types.stsz, MP4.STSZ), MP4.box(MP4.types.stco, MP4.STCO));
  }

  static avc1(track) {
    var sps = [], pps = [], i, data, len;
    // assemble the SPSs

    for (i = 0; i < track.sps.length; i++) {
      data = track.sps[i];
      len = data.byteLength;
      sps.push((len >>> 8) & 0xFF);
      sps.push((len & 0xFF));
      sps = sps.concat(Array.prototype.slice.call(data)); // SPS
    }

    // assemble the PPSs
    for (i = 0; i < track.pps.length; i++) {
      data = track.pps[i];
      len = data.byteLength;
      pps.push((len >>> 8) & 0xFF);
      pps.push((len & 0xFF));
      pps = pps.concat(Array.prototype.slice.call(data));
    }

    var avcc = MP4.box(MP4.types.avcC, new Uint8Array([
            0x01,   // version
            sps[3], // profile
            sps[4], // profile compat
            sps[5], // level
            0xfc | 3, // lengthSizeMinusOne, hard-coded to 4 bytes
            0xE0 | track.sps.length // 3bit reserved (111) + numOfSequenceParameterSets
          ].concat(sps).concat([
            track.pps.length // numOfPictureParameterSets
          ]).concat(pps))), // "PPS"
        width = track.width,
        height = track.height,
        hSpacing = track.pixelRatio[0],
        vSpacing = track.pixelRatio[1];
    //console.log('avcc:' + Hex.hexDump(avcc));
    return MP4.box(MP4.types.avc1, new Uint8Array([
        0x00, 0x00, 0x00, // reserved
        0x00, 0x00, 0x00, // reserved
        0x00, 0x01, // data_reference_index
        0x00, 0x00, // pre_defined
        0x00, 0x00, // reserved
        0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, // pre_defined
        (width >> 8) & 0xFF,
        width & 0xff, // width
        (height >> 8) & 0xFF,
        height & 0xff, // height
        0x00, 0x48, 0x00, 0x00, // horizresolution
        0x00, 0x48, 0x00, 0x00, // vertresolution
        0x00, 0x00, 0x00, 0x00, // reserved
        0x00, 0x01, // frame_count
        0x12,
        0x64, 0x61, 0x69, 0x6C, //dailymotion/hls.js
        0x79, 0x6D, 0x6F, 0x74,
        0x69, 0x6F, 0x6E, 0x2F,
        0x68, 0x6C, 0x73, 0x2E,
        0x6A, 0x73, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, // compressorname
        0x00, 0x18,   // depth = 24
        0x11, 0x11]), // pre_defined = -1
          avcc,
          MP4.box(MP4.types.btrt, new Uint8Array([
            0x00, 0x1c, 0x9c, 0x80, // bufferSizeDB
            0x00, 0x2d, 0xc6, 0xc0, // maxBitrate
            0x00, 0x2d, 0xc6, 0xc0])), // avgBitrate
          MP4.box(MP4.types.pasp, new Uint8Array([
            (hSpacing >> 24),         // hSpacing
            (hSpacing >> 16) & 0xFF,
            (hSpacing >>  8) & 0xFF,
            hSpacing & 0xFF,
            (vSpacing >> 24),         // vSpacing
            (vSpacing >> 16) & 0xFF,
            (vSpacing >>  8) & 0xFF,
            vSpacing & 0xFF]))
          );
  }

  static esds(track) {
    var configlen = track.config.length;
    return new Uint8Array([
      0x00, // version 0
      0x00, 0x00, 0x00, // flags

      0x03, // descriptor_type
      0x17+configlen, // length
      0x00, 0x01, //es_id
      0x00, // stream_priority

      0x04, // descriptor_type
      0x0f+configlen, // length
      0x40, //codec : mpeg4_audio
      0x15, // stream_type
      0x00, 0x00, 0x00, // buffer_size
      0x00, 0x00, 0x00, 0x00, // maxBitrate
      0x00, 0x00, 0x00, 0x00, // avgBitrate

      0x05 // descriptor_type
      ].concat([configlen]).concat(track.config).concat([0x06, 0x01, 0x02])); // GASpecificConfig)); // length + audio config descriptor
  }

  static mp4a(track) {
    var samplerate = track.samplerate;
      return MP4.box(MP4.types.mp4a, new Uint8Array([
      0x00, 0x00, 0x00, // reserved
      0x00, 0x00, 0x00, // reserved
      0x00, 0x01, // data_reference_index
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, // reserved
      0x00, track.channelCount, // channelcount
      0x00, 0x10, // sampleSize:16bits
      0x00, 0x00, 0x00, 0x00, // reserved2
      (samplerate >> 8) & 0xFF,
      samplerate & 0xff, //
      0x00, 0x00]),
      MP4.box(MP4.types.esds, MP4.esds(track)));
  }

  static mp3(track) {
    var samplerate = track.samplerate;
      return MP4.box(MP4.types['.mp3'], new Uint8Array([
      0x00, 0x00, 0x00, // reserved
      0x00, 0x00, 0x00, // reserved
      0x00, 0x01, // data_reference_index
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, // reserved
      0x00, track.channelCount, // channelcount
      0x00, 0x10, // sampleSize:16bits
      0x00, 0x00, 0x00, 0x00, // reserved2
      (samplerate >> 8) & 0xFF,
      samplerate & 0xff, //
      0x00, 0x00]));
  }

  static stsd(track) {
    if (track.type === 'audio') {
      if (!track.isAAC && track.codec === 'mp3') {
        return MP4.box(MP4.types.stsd, MP4.STSD, MP4.mp3(track));
      }
      return MP4.box(MP4.types.stsd, MP4.STSD, MP4.mp4a(track));
    } else {
      return MP4.box(MP4.types.stsd, MP4.STSD, MP4.avc1(track));
    }
  }

  static tkhd(track) {
    var id = track.id,
        duration = track.duration*track.timescale,
        width = track.width,
        height = track.height,
        upperWordDuration = Math.floor(duration / (UINT32_MAX + 1)),
        lowerWordDuration = Math.floor(duration % (UINT32_MAX + 1));
    return MP4.box(MP4.types.tkhd, new Uint8Array([
      0x01, // version 1
      0x00, 0x00, 0x07, // flags
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, // creation_time
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, // modification_time
      (id >> 24) & 0xFF,
      (id >> 16) & 0xFF,
      (id >> 8) & 0xFF,
      id & 0xFF, // track_ID
      0x00, 0x00, 0x00, 0x00, // reserved
      (upperWordDuration >> 24),
      (upperWordDuration >> 16) & 0xFF,
      (upperWordDuration >>  8) & 0xFF,
      upperWordDuration & 0xFF,
      (lowerWordDuration >> 24),
      (lowerWordDuration >> 16) & 0xFF,
      (lowerWordDuration >>  8) & 0xFF,
      lowerWordDuration & 0xFF,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, // reserved
      0x00, 0x00, // layer
      0x00, 0x00, // alternate_group
      0x00, 0x00, // non-audio track volume
      0x00, 0x00, // reserved
      0x00, 0x01, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x01, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x40, 0x00, 0x00, 0x00, // transformation: unity matrix
      (width >> 8) & 0xFF,
      width & 0xFF,
      0x00, 0x00, // width
      (height >> 8) & 0xFF,
      height & 0xFF,
      0x00, 0x00 // height
    ]));
  }

  static traf(track,baseMediaDecodeTime) {
    var sampleDependencyTable = MP4.sdtp(track),
        id = track.id,
        upperWordBaseMediaDecodeTime = Math.floor(baseMediaDecodeTime / (UINT32_MAX + 1)),
        lowerWordBaseMediaDecodeTime = Math.floor(baseMediaDecodeTime % (UINT32_MAX + 1));
    return MP4.box(MP4.types.traf,
               MP4.box(MP4.types.tfhd, new Uint8Array([
                 0x00, // version 0
                 0x00, 0x00, 0x00, // flags
                 (id >> 24),
                 (id >> 16) & 0XFF,
                 (id >> 8) & 0XFF,
                 (id & 0xFF) // track_ID
               ])),
               MP4.box(MP4.types.tfdt, new Uint8Array([
                 0x01, // version 1
                 0x00, 0x00, 0x00, // flags
                 (upperWordBaseMediaDecodeTime >>24),
                 (upperWordBaseMediaDecodeTime >> 16) & 0XFF,
                 (upperWordBaseMediaDecodeTime >> 8) & 0XFF,
                 (upperWordBaseMediaDecodeTime & 0xFF),
                 (lowerWordBaseMediaDecodeTime >>24),
                 (lowerWordBaseMediaDecodeTime >> 16) & 0XFF,
                 (lowerWordBaseMediaDecodeTime >> 8) & 0XFF,
                 (lowerWordBaseMediaDecodeTime & 0xFF)
               ])),
               MP4.trun(track,
                    sampleDependencyTable.length +
                    16 + // tfhd
                    20 + // tfdt
                    8 +  // traf header
                    16 + // mfhd
                    8 +  // moof header
                    8),  // mdat header
               sampleDependencyTable);
  }

  /**
   * Generate a track box.
   * @param track {object} a track definition
   * @return {Uint8Array} the track box
   */
  static trak(track) {
    track.duration = track.duration || 0xffffffff;
    return MP4.box(MP4.types.trak, MP4.tkhd(track), MP4.mdia(track));
  }

  static trex(track) {
    var id = track.id;
    return MP4.box(MP4.types.trex, new Uint8Array([
      0x00, // version 0
      0x00, 0x00, 0x00, // flags
     (id >> 24),
     (id >> 16) & 0XFF,
     (id >> 8) & 0XFF,
     (id & 0xFF), // track_ID
      0x00, 0x00, 0x00, 0x01, // default_sample_description_index
      0x00, 0x00, 0x00, 0x00, // default_sample_duration
      0x00, 0x00, 0x00, 0x00, // default_sample_size
      0x00, 0x01, 0x00, 0x01 // default_sample_flags
    ]));
  }

  static trun(track, offset) {
    var samples= track.samples || [],
        len = samples.length,
        arraylen = 12 + (16 * len),
        array = new Uint8Array(arraylen),
        i,sample,duration,size,flags,cts;
    offset += 8 + arraylen;
    array.set([
      0x00, // version 0
      0x00, 0x0f, 0x01, // flags
      (len >>> 24) & 0xFF,
      (len >>> 16) & 0xFF,
      (len >>> 8) & 0xFF,
      len & 0xFF, // sample_count
      (offset >>> 24) & 0xFF,
      (offset >>> 16) & 0xFF,
      (offset >>> 8) & 0xFF,
      offset & 0xFF // data_offset
    ],0);
    for (i = 0; i < len; i++) {
      sample = samples[i];
      duration = sample.duration;
      size = sample.size;
      flags = sample.flags;
      cts = sample.cts;
      array.set([
        (duration >>> 24) & 0xFF,
        (duration >>> 16) & 0xFF,
        (duration >>> 8) & 0xFF,
        duration & 0xFF, // sample_duration
        (size >>> 24) & 0xFF,
        (size >>> 16) & 0xFF,
        (size >>> 8) & 0xFF,
        size & 0xFF, // sample_size
        (flags.isLeading << 2) | flags.dependsOn,
        (flags.isDependedOn << 6) |
          (flags.hasRedundancy << 4) |
          (flags.paddingValue << 1) |
          flags.isNonSync,
        flags.degradPrio & 0xF0 << 8,
        flags.degradPrio & 0x0F, // sample_flags
        (cts >>> 24) & 0xFF,
        (cts >>> 16) & 0xFF,
        (cts >>> 8) & 0xFF,
        cts & 0xFF // sample_composition_time_offset
      ],12+16*i);
    }
    return MP4.box(MP4.types.trun, array);
  }

  static initSegment(tracks) {
    if (!MP4.types) {
      MP4.init();
    }
    var movie = MP4.moov(tracks), result;
    result = new Uint8Array(MP4.FTYP.byteLength + movie.byteLength);
    result.set(MP4.FTYP);
    result.set(movie, MP4.FTYP.byteLength);
    return result;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (MP4);


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__events__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__events__);
/**
 * passthrough remuxer
*/


class PassThroughRemuxer {
  constructor(observer) {
    this.observer = observer;
  }

  destroy() {
  }

  resetTimeStamp() {
  }

  resetInitSegment() {
  }

  remux(audioTrack,videoTrack,id3Track,textTrack,timeOffset, contiguous,accurateTimeOffset,rawData) {
    var observer = this.observer;
    var streamType = '';
    if (audioTrack) {
      streamType += 'audio';
    }
    if (videoTrack) {
      streamType += 'video';
    }
    observer.trigger(__WEBPACK_IMPORTED_MODULE_0__events___default.a.FRAG_PARSING_DATA, {
      data1: rawData,
      startPTS: timeOffset,
      startDTS: timeOffset,
      type: streamType,
      nb: 1,
      dropped : 0
    });
    //notify end of parsing
    observer.trigger(__WEBPACK_IMPORTED_MODULE_0__events___default.a.FRAG_PARSED);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (PassThroughRemuxer);


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__demux_demuxer_inline__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__events__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__events__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_logger__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_events__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_events__);
/* demuxer web worker.
 *  - listen to worker message, and trigger DemuxerInline upon reception of Fragments.
 *  - provides MP4 Boxes back to main thread using [transferable objects](https://developers.google.com/web/updates/2011/12/Transferable-Objects-Lightning-Fast) in order to minimize message passing overhead.
 */

 
 
 
 

var DemuxerWorker = function (self) {
  // observer setup
  var observer = new __WEBPACK_IMPORTED_MODULE_3_events___default.a();
  observer.trigger = function trigger (event, ...data) {
    observer.emit(event, event, ...data);
  };

  observer.off = function off (event, ...data) {
    observer.removeListener(event, ...data);
  };

  var forwardMessage = function(ev,data) {
    self.postMessage({event: ev, data:data });
  };

  self.addEventListener('message', function (ev) {
    var data = ev.data;
    //console.log('demuxer cmd:' + data.cmd);
    switch (data.cmd) {
      case 'init':
        let config = JSON.parse(data.config);
        self.demuxer = new __WEBPACK_IMPORTED_MODULE_0__demux_demuxer_inline__["a" /* default */](observer, data.typeSupported, config, data.vendor);
        try {
          __WEBPACK_IMPORTED_MODULE_2__utils_logger__["a" /* enableLogs */](config.debug === true);
        } catch(err) {
          console.warn('demuxerWorker: unable to enable logs');
        }
        // signal end of worker init
        forwardMessage('init',null);
        break;
      case 'demux':
        self.demuxer.push(data.data, data.decryptdata, data.initSegment, data.audioCodec, data.videoCodec, data.timeOffset,data.discontinuity, data.trackSwitch,data.contiguous,data.duration,data.accurateTimeOffset,data.defaultInitPTS);
        break;
      default:
        break;
    }
  });

  // forward events to main thread
  observer.on(__WEBPACK_IMPORTED_MODULE_1__events___default.a.FRAG_DECRYPTED, forwardMessage);
  observer.on(__WEBPACK_IMPORTED_MODULE_1__events___default.a.FRAG_PARSING_INIT_SEGMENT, forwardMessage);
  observer.on(__WEBPACK_IMPORTED_MODULE_1__events___default.a.FRAG_PARSED, forwardMessage);
  observer.on(__WEBPACK_IMPORTED_MODULE_1__events___default.a.ERROR, forwardMessage);
  observer.on(__WEBPACK_IMPORTED_MODULE_1__events___default.a.FRAG_PARSING_METADATA, forwardMessage);
  observer.on(__WEBPACK_IMPORTED_MODULE_1__events___default.a.FRAG_PARSING_USERDATA, forwardMessage);
  observer.on(__WEBPACK_IMPORTED_MODULE_1__events___default.a.INIT_PTS_FOUND, forwardMessage);

  // special case for FRAG_PARSING_DATA: pass data1/data2 as transferable object (no copy)
  observer.on(__WEBPACK_IMPORTED_MODULE_1__events___default.a.FRAG_PARSING_DATA, function(ev, data) {
    let transferable = [];
    let message = {event: ev, data:data};
    if (data.data1) {
      message.data1 = data.data1.buffer;
      transferable.push(data.data1.buffer);
      delete data.data1;
    }
    if (data.data2) {
      message.data2 = data.data2.buffer;
      transferable.push(data.data2.buffer);
      delete data.data2;
    }
    self.postMessage(message,transferable);
  });
};

/* harmony default export */ __webpack_exports__["a"] = (DemuxerWorker);



/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_logger__ = __webpack_require__(0);
/**
 * Level Helper class, providing methods dealing with playlist sliding and drift
*/



const LevelHelper = {

  mergeDetails : function(oldDetails,newDetails) {
    var start = Math.max(oldDetails.startSN,newDetails.startSN)-newDetails.startSN,
        end = Math.min(oldDetails.endSN,newDetails.endSN)-newDetails.startSN,
        delta = newDetails.startSN - oldDetails.startSN,
        oldfragments = oldDetails.fragments,
        newfragments = newDetails.fragments,
        ccOffset =0,
        PTSFrag;

    // check if old/new playlists have fragments in common
    if ( end < start) {
      newDetails.PTSKnown = false;
      return;
    }
    // loop through overlapping SN and update startPTS , cc, and duration if any found
    for(var i = start ; i <= end ; i++) {
      var oldFrag = oldfragments[delta+i],
          newFrag = newfragments[i];
      if (newFrag && oldFrag) {
        ccOffset = oldFrag.cc - newFrag.cc;
        if (!isNaN(oldFrag.startPTS)) {
          newFrag.start = newFrag.startPTS = oldFrag.startPTS;
          newFrag.endPTS = oldFrag.endPTS;
          newFrag.duration = oldFrag.duration;
          newFrag.backtracked = oldFrag.backtracked;
          newFrag.dropped = oldFrag.dropped;
          PTSFrag = newFrag;
        }
      }
    }

    if(ccOffset) {
      __WEBPACK_IMPORTED_MODULE_0__utils_logger__["b" /* logger */].log(`discontinuity sliding from playlist, take drift into account`);
      for(i = 0 ; i < newfragments.length ; i++) {
        newfragments[i].cc += ccOffset;
      }
    }

    // if at least one fragment contains PTS info, recompute PTS information for all fragments
    if(PTSFrag) {
      LevelHelper.updateFragPTSDTS(newDetails,PTSFrag,PTSFrag.startPTS,PTSFrag.endPTS,PTSFrag.startDTS,PTSFrag.endDTS);
    } else {
      // ensure that delta is within oldfragments range
      // also adjust sliding in case delta is 0 (we could have old=[50-60] and new=old=[50-61])
      // in that case we also need to adjust start offset of all fragments
      if (delta >= 0 && delta < oldfragments.length) {
        // adjust start by sliding offset
        var sliding = oldfragments[delta].start;
        for(i = 0 ; i < newfragments.length ; i++) {
          newfragments[i].start += sliding;
        }
      }
    }
    // if we are here, it means we have fragments overlapping between
    // old and new level. reliable PTS info is thus relying on old level
    newDetails.PTSKnown = oldDetails.PTSKnown;
    return;
  },

  updateFragPTSDTS : function(details,frag,startPTS,endPTS,startDTS,endDTS) {
    // update frag PTS/DTS
    let maxStartPTS = startPTS;
    if(!isNaN(frag.startPTS)) {
      // delta PTS between audio and video
      let deltaPTS = Math.abs(frag.startPTS-startPTS);
      if (isNaN(frag.deltaPTS)) {
        frag.deltaPTS = deltaPTS;
      } else {
        frag.deltaPTS = Math.max(deltaPTS,frag.deltaPTS);
      }
      maxStartPTS = Math.max(startPTS,frag.startPTS);
      startPTS = Math.min(startPTS,frag.startPTS);
      endPTS = Math.max(endPTS, frag.endPTS);
      startDTS = Math.min(startDTS,frag.startDTS);
      endDTS = Math.max(endDTS, frag.endDTS);
    }

    const drift = startPTS - frag.start;
    frag.start = frag.startPTS = startPTS;
    frag.maxStartPTS = maxStartPTS;
    frag.endPTS = endPTS;
    frag.startDTS = startDTS;
    frag.endDTS = endDTS;
    frag.duration = endPTS - startPTS;

    const sn = frag.sn;
    // exit if sn out of range
    if (!details || sn < details.startSN || sn > details.endSN) {
      return 0;
    }
    var fragIdx, fragments, i;
    fragIdx = sn - details.startSN;
    fragments = details.fragments;
    frag = fragments[fragIdx];
    // adjust fragment PTS/duration from seqnum-1 to frag 0
    for(i = fragIdx ; i > 0 ; i--) {
      LevelHelper.updatePTS(fragments,i,i-1);
    }

    // adjust fragment PTS/duration from seqnum to last frag
    for(i = fragIdx ; i < fragments.length - 1 ; i++) {
      LevelHelper.updatePTS(fragments,i,i+1);
    }
    details.PTSKnown = true;
    //logger.log(`                                            frag start/end:${startPTS.toFixed(3)}/${endPTS.toFixed(3)}`);

    return drift;
  },

  updatePTS : function(fragments,fromIdx, toIdx) {
    var fragFrom = fragments[fromIdx],fragTo = fragments[toIdx], fragToPTS = fragTo.startPTS;
    // if we know startPTS[toIdx]
    if(!isNaN(fragToPTS)) {
      // update fragment duration.
      // it helps to fix drifts between playlist reported duration and fragment real duration
      if (toIdx > fromIdx) {
        fragFrom.duration = fragToPTS-fragFrom.start;
        if(fragFrom.duration < 0) {
          __WEBPACK_IMPORTED_MODULE_0__utils_logger__["b" /* logger */].warn(`negative duration computed for frag ${fragFrom.sn},level ${fragFrom.level}, there should be some duration drift between playlist and fragment!`);
        }
      } else {
        fragTo.duration = fragFrom.start - fragToPTS;
        if(fragTo.duration < 0) {
          __WEBPACK_IMPORTED_MODULE_0__utils_logger__["b" /* logger */].warn(`negative duration computed for frag ${fragTo.sn},level ${fragTo.level}, there should be some duration drift between playlist and fragment!`);
        }
      }
    } else {
      // we dont know startPTS[toIdx]
      if (toIdx > fromIdx) {
        fragTo.start = fragFrom.start + fragFrom.duration;
      } else {
        fragTo.start = Math.max(fragFrom.start - fragTo.duration, 0);
      }
    }
  }
};

module.exports = LevelHelper;

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(4)(module)))

/***/ }),
/* 40 */
/***/ (function(module, exports) {

/**
 *  TimeRanges to string helper
 */

const TimeRanges = {
  toString : function(r) {
    var log = '', len = r.length;
    for (var i=0; i<len; i++) {
      log += '[' + r.start(i).toFixed(3) + ',' + r.end(i).toFixed(3) + ']';
    }
    return log;
  }
};

module.exports = TimeRanges;


/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = findFragWithCC;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__binary_search__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__binary_search___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__binary_search__);


function findFragWithCC(fragments, CC) {
  return __WEBPACK_IMPORTED_MODULE_0__binary_search___default.a.search(fragments, (candidate) => {
     if (candidate.cc < CC) {
        return 1;
      } else if (candidate.cc > CC) {
        return -1;
     } else {
        return 0;
     }
  });
}


/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vttparser__ = __webpack_require__(13);


const Cues = {

  newCue: function(track, startTime, endTime, captionScreen) {
    var row;
    var cue;
    var indenting;
    var indent;
    var text;
    var VTTCue = window.VTTCue || window.TextTrackCue;

    for (var r=0; r<captionScreen.rows.length; r++)
    {
      row = captionScreen.rows[r];
      indenting = true;
      indent = 0;
      text = '';

      if (!row.isEmpty())
      {
        for (var c=0; c<row.chars.length; c++)
        {
          if (row.chars[c].uchar.match(/\s/) && indenting)
          {
            indent++;
          }
          else
          {
            text += row.chars[c].uchar;
            indenting = false;
          }
        }
        //To be used for cleaning-up orphaned roll-up captions
        row.cueStartTime = startTime;

        // Give a slight bump to the endTime if it's equal to startTime to avoid a SyntaxError in IE
        if (startTime === endTime)
        {
          endTime += 0.0001;
        }

        cue = new VTTCue(startTime, endTime, __WEBPACK_IMPORTED_MODULE_0__vttparser__["b" /* fixLineBreaks */](text.trim()));

        if (indent >= 16)
        {
          indent--;
        }
        else
        {
          indent++;
        }

        // VTTCue.line get's flakey when using controls, so let's now include line 13&14
        // also, drop line 1 since it's to close to the top
        if (navigator.userAgent.match(/Firefox\//))
        {
          cue.line = r + 1;
        }
        else
        {
          cue.line = (r > 7 ? r - 2 : r + 1);
        }
        cue.align = 'left';
        // Clamp the position between 0 and 100 - if out of these bounds, Firefox throws an exception and captions break
        cue.position = Math.max(0, Math.min(100, 100 * (indent / 32) + (navigator.userAgent.match(/Firefox\//) ? 50 : 0)));
        track.addCue(cue);
      }
    }
  }

};

module.exports = Cues;

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(4)(module)))

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Copyright 2013 vtt.js Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* harmony default export */ __webpack_exports__["a"] = ((function() {
  if (typeof window !== 'undefined' && window.VTTCue) {
    return window.VTTCue;
  }

  var autoKeyword = 'auto';
  var directionSetting = {
    '': true,
    lr: true,
    rl: true
  };
  var alignSetting = {
    start: true,
    middle: true,
    end: true,
    left: true,
    right: true
  };

  function findDirectionSetting(value) {
    if (typeof value !== 'string') {
      return false;
    }
    var dir = directionSetting[value.toLowerCase()];
    return dir ? value.toLowerCase() : false;
  }

  function findAlignSetting(value) {
    if (typeof value !== 'string') {
      return false;
    }
    var align = alignSetting[value.toLowerCase()];
    return align ? value.toLowerCase() : false;
  }

  function extend(obj) {
    var i = 1;
    for (; i < arguments.length; i++) {
      var cobj = arguments[i];
      for (var p in cobj) {
        obj[p] = cobj[p];
      }
    }

    return obj;
  }

  function VTTCue(startTime, endTime, text) {
    var cue = this;
    var isIE8 = (function () {
      if (typeof navigator === 'undefined') {
        return;
      }
      return (/MSIE\s8\.0/).test(navigator.userAgent);
    })();
    var baseObj = {};

    if (isIE8) {
      cue = document.createElement('custom');
    } else {
      baseObj.enumerable = true;
    }

    /**
     * Shim implementation specific properties. These properties are not in
     * the spec.
     */

    // Lets us know when the VTTCue's data has changed in such a way that we need
    // to recompute its display state. This lets us compute its display state
    // lazily.
    cue.hasBeenReset = false;

    /**
     * VTTCue and TextTrackCue properties
     * http://dev.w3.org/html5/webvtt/#vttcue-interface
     */

    var _id = '';
    var _pauseOnExit = false;
    var _startTime = startTime;
    var _endTime = endTime;
    var _text = text;
    var _region = null;
    var _vertical = '';
    var _snapToLines = true;
    var _line = 'auto';
    var _lineAlign = 'start';
    var _position = 50;
    var _positionAlign = 'middle';
    var _size = 50;
    var _align = 'middle';

    Object.defineProperty(cue, 'id', extend({}, baseObj, {
      get: function () {
        return _id;
      },
      set: function (value) {
        _id = '' + value;
      }
    }));

    Object.defineProperty(cue, 'pauseOnExit', extend({}, baseObj, {
      get: function () {
        return _pauseOnExit;
      },
      set: function (value) {
        _pauseOnExit = !!value;
      }
    }));

    Object.defineProperty(cue, 'startTime', extend({}, baseObj, {
      get: function () {
        return _startTime;
      },
      set: function (value) {
        if (typeof value !== 'number') {
          throw new TypeError('Start time must be set to a number.');
        }
        _startTime = value;
        this.hasBeenReset = true;
      }
    }));

    Object.defineProperty(cue, 'endTime', extend({}, baseObj, {
      get: function () {
        return _endTime;
      },
      set: function (value) {
        if (typeof value !== 'number') {
          throw new TypeError('End time must be set to a number.');
        }
        _endTime = value;
        this.hasBeenReset = true;
      }
    }));

    Object.defineProperty(cue, 'text', extend({}, baseObj, {
      get: function () {
        return _text;
      },
      set: function (value) {
        _text = '' + value;
        this.hasBeenReset = true;
      }
    }));

    Object.defineProperty(cue, 'region', extend({}, baseObj, {
      get: function () {
        return _region;
      },
      set: function (value) {
        _region = value;
        this.hasBeenReset = true;
      }
    }));

    Object.defineProperty(cue, 'vertical', extend({}, baseObj, {
      get: function () {
        return _vertical;
      },
      set: function (value) {
        var setting = findDirectionSetting(value);
        // Have to check for false because the setting an be an empty string.
        if (setting === false) {
          throw new SyntaxError('An invalid or illegal string was specified.');
        }
        _vertical = setting;
        this.hasBeenReset = true;
      }
    }));

    Object.defineProperty(cue, 'snapToLines', extend({}, baseObj, {
      get: function () {
        return _snapToLines;
      },
      set: function (value) {
        _snapToLines = !!value;
        this.hasBeenReset = true;
      }
    }));

    Object.defineProperty(cue, 'line', extend({}, baseObj, {
      get: function () {
        return _line;
      },
      set: function (value) {
        if (typeof value !== 'number' && value !== autoKeyword) {
          throw new SyntaxError('An invalid number or illegal string was specified.');
        }
        _line = value;
        this.hasBeenReset = true;
      }
    }));

    Object.defineProperty(cue, 'lineAlign', extend({}, baseObj, {
      get: function () {
        return _lineAlign;
      },
      set: function (value) {
        var setting = findAlignSetting(value);
        if (!setting) {
          throw new SyntaxError('An invalid or illegal string was specified.');
        }
        _lineAlign = setting;
        this.hasBeenReset = true;
      }
    }));

    Object.defineProperty(cue, 'position', extend({}, baseObj, {
      get: function () {
        return _position;
      },
      set: function (value) {
        if (value < 0 || value > 100) {
          throw new Error('Position must be between 0 and 100.');
        }
        _position = value;
        this.hasBeenReset = true;
      }
    }));

    Object.defineProperty(cue, 'positionAlign', extend({}, baseObj, {
      get: function () {
        return _positionAlign;
      },
      set: function (value) {
        var setting = findAlignSetting(value);
        if (!setting) {
          throw new SyntaxError('An invalid or illegal string was specified.');
        }
        _positionAlign = setting;
        this.hasBeenReset = true;
      }
    }));

    Object.defineProperty(cue, 'size', extend({}, baseObj, {
      get: function () {
        return _size;
      },
      set: function (value) {
        if (value < 0 || value > 100) {
          throw new Error('Size must be between 0 and 100.');
        }
        _size = value;
        this.hasBeenReset = true;
      }
    }));

    Object.defineProperty(cue, 'align', extend({}, baseObj, {
      get: function () {
        return _align;
      },
      set: function (value) {
        var setting = findAlignSetting(value);
        if (!setting) {
          throw new SyntaxError('An invalid or illegal string was specified.');
        }
        _align = setting;
        this.hasBeenReset = true;
      }
    }));

    /**
     * Other <track> spec defined properties
     */

    // http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#text-track-cue-display-state
    cue.displayState = undefined;

    if (isIE8) {
      return cue;
    }
  }

  /**
   * VTTCue methods
   */

  VTTCue.prototype.getCueAsHTML = function () {
    // Assume WebVTT.convertCueToDOMTree is on the global.
    var WebVTT = window.WebVTT;
    return WebVTT.convertCueToDOMTree(window, this.text);
  };

  return VTTCue;
})());


/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__events__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__events__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__event_handler__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_cea_608_parser__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_webvtt_parser__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_logger__ = __webpack_require__(0);
/*
 * Timeline Controller
*/







function clearCurrentCues(track) {
  if (track && track.cues) {
    while (track.cues.length > 0) {
      track.removeCue(track.cues[0]);
    }
  }
}

function reuseVttTextTrack(inUseTrack, manifestTrack) {
  return inUseTrack && inUseTrack.label === manifestTrack.name && !(inUseTrack.textTrack1 || inUseTrack.textTrack2);
}

function intersection(x1, x2, y1, y2) {
  return Math.min(x2, y2) - Math.max(x1, y1);
}

class TimelineController extends __WEBPACK_IMPORTED_MODULE_1__event_handler__["a" /* default */] {

  constructor(hls) {
    super(hls, __WEBPACK_IMPORTED_MODULE_0__events___default.a.MEDIA_ATTACHING,
                __WEBPACK_IMPORTED_MODULE_0__events___default.a.MEDIA_DETACHING,
                __WEBPACK_IMPORTED_MODULE_0__events___default.a.FRAG_PARSING_USERDATA,
                __WEBPACK_IMPORTED_MODULE_0__events___default.a.MANIFEST_LOADING,
                __WEBPACK_IMPORTED_MODULE_0__events___default.a.MANIFEST_LOADED,
                __WEBPACK_IMPORTED_MODULE_0__events___default.a.FRAG_LOADED,
                __WEBPACK_IMPORTED_MODULE_0__events___default.a.LEVEL_SWITCHING,
                __WEBPACK_IMPORTED_MODULE_0__events___default.a.INIT_PTS_FOUND);

    this.hls = hls;
    this.config = hls.config;
    this.enabled = true;
    this.Cues = hls.config.cueHandler;
    this.textTracks = [];
    this.tracks = [];
    this.unparsedVttFrags = [];
    this.initPTS = undefined;
    this.cueRanges = [];

    if (this.config.enableCEA708Captions)
    {
      var self = this;
      var sendAddTrackEvent = function (track, media)
      {
        var e = null;
        try {
          e = new window.Event('addtrack');
        } catch (err) {
          //for IE11
          e = document.createEvent('Event');
          e.initEvent('addtrack', false, false);
        }
        e.track = track;
        media.dispatchEvent(e);
      };

      var channel1 =
      {
        'newCue': function(startTime, endTime, screen)
        {
          if (!self.textTrack1)
          {
            //Enable reuse of existing text track.
            var existingTrack1 = self.getExistingTrack('1');
            if (!existingTrack1)
            {
              const textTrack1 = self.createTextTrack('captions', self.config.captionsTextTrack1Label, self.config.captionsTextTrack1LanguageCode);
              if (textTrack1) {
                textTrack1.textTrack1 = true;
                self.textTrack1 = textTrack1;
              }
            }
            else
            {
              self.textTrack1 = existingTrack1;
              clearCurrentCues(self.textTrack1);

              sendAddTrackEvent(self.textTrack1, self.media);
            }
          }
          self.addCues('textTrack1', startTime, endTime, screen);
        }
      };

      var channel2 =
      {
        'newCue': function(startTime, endTime, screen)
        {
          if (!self.textTrack2)
          {
            //Enable reuse of existing text track.
            var existingTrack2 = self.getExistingTrack('2');
            if (!existingTrack2)
            {
              const textTrack2 = self.createTextTrack('captions', self.config.captionsTextTrack2Label, self.config.captionsTextTrack1LanguageCode);
              if (textTrack2) {
                textTrack2.textTrack2 = true;
                self.textTrack2 = textTrack2;
              }
            }
            else
            {
              self.textTrack2 = existingTrack2;
              clearCurrentCues(self.textTrack2);

              sendAddTrackEvent(self.textTrack2, self.media);
            }
          }
          self.addCues('textTrack2', startTime, endTime, screen);
        }
      };

      this.cea608Parser = new __WEBPACK_IMPORTED_MODULE_2__utils_cea_608_parser__["a" /* default */](0, channel1, channel2);
    }
  }

  addCues(channel, startTime, endTime, screen) {
    // skip cues which overlap more than 50% with previously parsed time ranges
    const ranges = this.cueRanges;
    let merged = false;
    for (let i = ranges.length; i--;) {
      let cueRange = ranges[i];
      let overlap = intersection(cueRange[0], cueRange[1], startTime, endTime);
      if (overlap >= 0) {
        cueRange[0] = Math.min(cueRange[0], startTime);
        cueRange[1] = Math.max(cueRange[1], endTime);
        merged = true;
        if ((overlap / (endTime - startTime)) > 0.5) {
          return;
        }
      }
    }
    if (!merged) {
      ranges.push([startTime, endTime]);
    }
    this.Cues.newCue(this[channel], startTime, endTime, screen);
  }

  // Triggered when an initial PTS is found; used for synchronisation of WebVTT.
  onInitPtsFound(data) {
    if (typeof this.initPTS === 'undefined') {
      this.initPTS = data.initPTS;
    }

    // Due to asynchrony, initial PTS may arrive later than the first VTT fragments are loaded.
    // Parse any unparsed fragments upon receiving the initial PTS.
    if (this.unparsedVttFrags.length) {
      this.unparsedVttFrags.forEach(frag => {
        this.onFragLoaded(frag);
      });
      this.unparsedVttFrags = [];
    }
  }

  getExistingTrack(channelNumber) {
    const media = this.media;
    if (media) {
      for (let i = 0; i < media.textTracks.length; i++) {
        let textTrack = media.textTracks[i];
        let propName = 'textTrack' + channelNumber;
        if (textTrack[propName] === true) {
          return textTrack;
        }
      }
    }
    return null;
  }

  createTextTrack(kind, label, lang) {
    const media = this.media;
    if (media)
    {
      return media.addTextTrack(kind, label, lang);
    }
  }

  destroy() {
    __WEBPACK_IMPORTED_MODULE_1__event_handler__["a" /* default */].prototype.destroy.call(this);
  }

  onMediaAttaching(data) {
    this.media = data.media;
  }

  onMediaDetaching() {
    clearCurrentCues(this.textTrack1);
    clearCurrentCues(this.textTrack2);
  }

  onManifestLoading()
  {
    this.lastSn = -1; // Detect discontiguity in fragment parsing
    this.prevCC = -1;
    this.vttCCs = {ccOffset: 0, presentationOffset: 0}; // Detect discontinuity in subtitle manifests

    // clear outdated subtitles
    const media = this.media;
    if (media) {
      const textTracks = media.textTracks;
      if (textTracks) {
        for (let i = 0; i < textTracks.length; i++) {
          clearCurrentCues(textTracks[i]);
        }
      }
    }
  }

  onManifestLoaded(data) {
    this.textTracks = [];
    this.unparsedVttFrags = this.unparsedVttFrags || [];
    this.initPTS = undefined;
    this.cueRanges = [];

    if (this.config.enableWebVTT) {
      this.tracks = data.subtitles || [];
      const inUseTracks = this.media ? this.media.textTracks : [];

      this.tracks.forEach((track, index) => {
        let textTrack;
        if (index < inUseTracks.length) {
          const inUseTrack = inUseTracks[index];
          // Reuse tracks with the same label, but do not reuse 608/708 tracks
          if (reuseVttTextTrack(inUseTrack, track)) {
            textTrack = inUseTrack;
          }
        }
        if (!textTrack) {
            textTrack = this.createTextTrack('subtitles', track.name, track.lang);
        }
        textTrack.mode = track.default ? 'showing' : 'hidden';
        this.textTracks.push(textTrack);
      });
    }
  }

  onLevelSwitching() {
    this.enabled = this.hls.currentLevel.closedCaptions !== 'NONE';
  }

  onFragLoaded(data) {
    let frag = data.frag,
      payload = data.payload;
    if (frag.type === 'main') {
      var sn = frag.sn;
      // if this frag isn't contiguous, clear the parser so cues with bad start/end times aren't added to the textTrack
      if (sn !== this.lastSn + 1) {
        const cea608Parser = this.cea608Parser;
        if (cea608Parser) {
          cea608Parser.reset();
        }
      }
      this.lastSn = sn;
    }
    // If fragment is subtitle type, parse as WebVTT.
    else if (frag.type === 'subtitle') {
      if (payload.byteLength) {
        // We need an initial synchronisation PTS. Store fragments as long as none has arrived.
        if (typeof this.initPTS === 'undefined') {
          this.unparsedVttFrags.push(data);
          return;
        }
        let vttCCs = this.vttCCs;
        if (!vttCCs[frag.cc]) {
          vttCCs[frag.cc] = { start: frag.start, prevCC: this.prevCC, new: true };
          this.prevCC = frag.cc;
        }
        let textTracks = this.textTracks,
          hls = this.hls;

        // Parse the WebVTT file contents.
        __WEBPACK_IMPORTED_MODULE_3__utils_webvtt_parser__["default"].parse(payload, this.initPTS, vttCCs, frag.cc, function (cues) {
            const currentTrack = textTracks[frag.trackId];
            // Add cues and trigger event with success true.
            cues.forEach(cue => {
              // Sometimes there are cue overlaps on segmented vtts so the same
              // cue can appear more than once in different vtt files.
              // This avoid showing duplicated cues with same timecode and text.
              if (!currentTrack.cues.getCueById(cue.id)) {
                currentTrack.addCue(cue);
              }
            });
            hls.trigger(__WEBPACK_IMPORTED_MODULE_0__events___default.a.SUBTITLE_FRAG_PROCESSED, {success: true, frag: frag});
          },
          function (e) {
            // Something went wrong while parsing. Trigger event with success false.
            __WEBPACK_IMPORTED_MODULE_4__utils_logger__["b" /* logger */].log(`Failed to parse VTT cue: ${e}`);
            hls.trigger(__WEBPACK_IMPORTED_MODULE_0__events___default.a.SUBTITLE_FRAG_PROCESSED, {success: false, frag: frag});
          });
      }
      else {
        // In case there is no payload, finish unsuccessfully.
        this.hls.trigger(__WEBPACK_IMPORTED_MODULE_0__events___default.a.SUBTITLE_FRAG_PROCESSED, {success: false, frag: frag});
      }
    }
  }

  onFragParsingUserdata(data) {
    // push all of the CEA-708 messages into the interpreter
    // immediately. It will create the proper timestamps based on our PTS value
    if (this.enabled && this.config.enableCEA708Captions) {
      for (var i=0; i<data.samples.length; i++) {
        var ccdatas = this.extractCea608Data(data.samples[i].bytes);
        this.cea608Parser.addData(data.samples[i].pts, ccdatas);
      }
    }
  }

  extractCea608Data(byteArray) {
    var count = byteArray[0] & 31;
    var position = 2;
    var tmpByte, ccbyte1, ccbyte2, ccValid, ccType;
    var actualCCBytes = [];

    for (var j = 0; j < count; j++) {
      tmpByte = byteArray[position++];
      ccbyte1 = 0x7F & byteArray[position++];
      ccbyte2 = 0x7F & byteArray[position++];
      ccValid = (4 & tmpByte) !== 0;
      ccType = 3 & tmpByte;

      if (ccbyte1 === 0 && ccbyte2 === 0) {
        continue;
      }

      if (ccValid) {
        if (ccType === 0) // || ccType === 1
        {
          actualCCBytes.push(ccbyte1);
          actualCCBytes.push(ccbyte2);
        }
      }
    }
    return actualCCBytes;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (TimelineController);


/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 *
 * This code was ported from the dash.js project at:
 *   https://github.com/Dash-Industry-Forum/dash.js/blob/development/externals/cea608-parser.js
 *   https://github.com/Dash-Industry-Forum/dash.js/commit/8269b26a761e0853bb21d78780ed945144ecdd4d#diff-71bc295a2d6b6b7093a1d3290d53a4b2
 *
 * The original copyright appears below:
 *
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2015-2016, DASH Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  1. Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  2. Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
    /**
     *  Exceptions from regular ASCII. CodePoints are mapped to UTF-16 codes
     */

var specialCea608CharsCodes = {
    0x2a : 0xe1, // lowercase a, acute accent
    0x5c : 0xe9, // lowercase e, acute accent
    0x5e : 0xed, // lowercase i, acute accent
    0x5f : 0xf3, // lowercase o, acute accent
    0x60 : 0xfa, // lowercase u, acute accent
    0x7b : 0xe7, // lowercase c with cedilla
    0x7c : 0xf7, // division symbol
    0x7d : 0xd1, // uppercase N tilde
    0x7e : 0xf1, // lowercase n tilde
    0x7f : 0x2588, // Full block
    // THIS BLOCK INCLUDES THE 16 EXTENDED (TWO-BYTE) LINE 21 CHARACTERS
    // THAT COME FROM HI BYTE=0x11 AND LOW BETWEEN 0x30 AND 0x3F
    // THIS MEANS THAT \x50 MUST BE ADDED TO THE VALUES
    0x80 : 0xae, // Registered symbol (R)
    0x81 : 0xb0, // degree sign
    0x82 : 0xbd, // 1/2 symbol
    0x83 : 0xbf, // Inverted (open) question mark
    0x84 : 0x2122, // Trademark symbol (TM)
    0x85 : 0xa2, // Cents symbol
    0x86 : 0xa3, // Pounds sterling
    0x87 : 0x266a, // Music 8'th note
    0x88 : 0xe0, // lowercase a, grave accent
    0x89 : 0x20, // transparent space (regular)
    0x8a : 0xe8, // lowercase e, grave accent
    0x8b : 0xe2, // lowercase a, circumflex accent
    0x8c : 0xea, // lowercase e, circumflex accent
    0x8d : 0xee, // lowercase i, circumflex accent
    0x8e : 0xf4, // lowercase o, circumflex accent
    0x8f : 0xfb, // lowercase u, circumflex accent
    // THIS BLOCK INCLUDES THE 32 EXTENDED (TWO-BYTE) LINE 21 CHARACTERS
    // THAT COME FROM HI BYTE=0x12 AND LOW BETWEEN 0x20 AND 0x3F
    0x90 : 0xc1, // capital letter A with acute
    0x91 : 0xc9, // capital letter E with acute
    0x92 : 0xd3, // capital letter O with acute
    0x93 : 0xda, // capital letter U with acute
    0x94 : 0xdc, // capital letter U with diaresis
    0x95 : 0xfc, // lowercase letter U with diaeresis
    0x96 : 0x2018, // opening single quote
    0x97 : 0xa1, // inverted exclamation mark
    0x98 : 0x2a, // asterisk
    0x99 : 0x2019, // closing single quote
    0x9a : 0x2501, // box drawings heavy horizontal
    0x9b : 0xa9, // copyright sign
    0x9c : 0x2120, // Service mark
    0x9d : 0x2022, // (round) bullet
    0x9e : 0x201c, // Left double quotation mark
    0x9f : 0x201d, // Right double quotation mark
    0xa0 : 0xc0, // uppercase A, grave accent
    0xa1 : 0xc2, // uppercase A, circumflex
    0xa2 : 0xc7, // uppercase C with cedilla
    0xa3 : 0xc8, // uppercase E, grave accent
    0xa4 : 0xca, // uppercase E, circumflex
    0xa5 : 0xcb, // capital letter E with diaresis
    0xa6 : 0xeb, // lowercase letter e with diaresis
    0xa7 : 0xce, // uppercase I, circumflex
    0xa8 : 0xcf, // uppercase I, with diaresis
    0xa9 : 0xef, // lowercase i, with diaresis
    0xaa : 0xd4, // uppercase O, circumflex
    0xab : 0xd9, // uppercase U, grave accent
    0xac : 0xf9, // lowercase u, grave accent
    0xad : 0xdb, // uppercase U, circumflex
    0xae : 0xab, // left-pointing double angle quotation mark
    0xaf : 0xbb, // right-pointing double angle quotation mark
    // THIS BLOCK INCLUDES THE 32 EXTENDED (TWO-BYTE) LINE 21 CHARACTERS
    // THAT COME FROM HI BYTE=0x13 AND LOW BETWEEN 0x20 AND 0x3F
    0xb0 : 0xc3, // Uppercase A, tilde
    0xb1 : 0xe3, // Lowercase a, tilde
    0xb2 : 0xcd, // Uppercase I, acute accent
    0xb3 : 0xcc, // Uppercase I, grave accent
    0xb4 : 0xec, // Lowercase i, grave accent
    0xb5 : 0xd2, // Uppercase O, grave accent
    0xb6 : 0xf2, // Lowercase o, grave accent
    0xb7 : 0xd5, // Uppercase O, tilde
    0xb8 : 0xf5, // Lowercase o, tilde
    0xb9 : 0x7b, // Open curly brace
    0xba : 0x7d, // Closing curly brace
    0xbb : 0x5c, // Backslash
    0xbc : 0x5e, // Caret
    0xbd : 0x5f, // Underscore
    0xbe : 0x7c, // Pipe (vertical line)
    0xbf : 0x223c, // Tilde operator
    0xc0 : 0xc4, // Uppercase A, umlaut
    0xc1 : 0xe4, // Lowercase A, umlaut
    0xc2 : 0xd6, // Uppercase O, umlaut
    0xc3 : 0xf6, // Lowercase o, umlaut
    0xc4 : 0xdf, // Esszett (sharp S)
    0xc5 : 0xa5, // Yen symbol
    0xc6 : 0xa4, // Generic currency sign
    0xc7 : 0x2503, // Box drawings heavy vertical
    0xc8 : 0xc5, // Uppercase A, ring
    0xc9 : 0xe5, // Lowercase A, ring
    0xca : 0xd8, // Uppercase O, stroke
    0xcb : 0xf8, // Lowercase o, strok
    0xcc : 0x250f, // Box drawings heavy down and right
    0xcd : 0x2513, // Box drawings heavy down and left
    0xce : 0x2517, // Box drawings heavy up and right
    0xcf : 0x251b // Box drawings heavy up and left
};

/**
 * Utils
 */
var getCharForByte = function(byte) {
    var charCode = byte;
    if (specialCea608CharsCodes.hasOwnProperty(byte)) {
        charCode = specialCea608CharsCodes[byte];
    }
    return String.fromCharCode(charCode);
};

var NR_ROWS = 15,
    NR_COLS = 100;
// Tables to look up row from PAC data
var rowsLowCh1 = {0x11 : 1, 0x12 : 3, 0x15 : 5, 0x16 : 7, 0x17 : 9, 0x10 : 11, 0x13 : 12, 0x14 : 14};
var rowsHighCh1 = {0x11 : 2, 0x12 : 4, 0x15 : 6, 0x16 : 8, 0x17 : 10, 0x13 : 13, 0x14 : 15};
var rowsLowCh2 = {0x19 : 1, 0x1A : 3, 0x1D : 5, 0x1E : 7, 0x1F : 9, 0x18 : 11, 0x1B : 12, 0x1C : 14};
var rowsHighCh2 = {0x19 : 2, 0x1A : 4, 0x1D : 6, 0x1E : 8, 0x1F : 10, 0x1B : 13, 0x1C : 15};

var backgroundColors = ['white', 'green', 'blue', 'cyan', 'red', 'yellow', 'magenta', 'black', 'transparent'];

/**
 * Simple logger class to be able to write with time-stamps and filter on level.
 */
var logger = {
    verboseFilter : {'DATA' : 3, 'DEBUG' : 3, 'INFO' : 2, 'WARNING' : 2, 'TEXT' : 1, 'ERROR' : 0},
    time : null,
    verboseLevel : 0, // Only write errors
    setTime : function(newTime) {
        this.time = newTime;
    },
    log : function(severity, msg) {
        var minLevel = this.verboseFilter[severity];
        if (this.verboseLevel >= minLevel) {
            console.log(this.time + ' [' + severity + '] ' + msg);
        }
    }
};

var numArrayToHexArray = function(numArray) {
    var hexArray = [];
    for (var j = 0; j < numArray.length; j++) {
        hexArray.push(numArray[j].toString(16));
    }
    return hexArray;
};

class PenState {

    constructor(foreground, underline, italics, background, flash) {
        this.foreground = foreground || 'white';
        this.underline = underline || false;
        this.italics = italics || false;
        this.background = background || 'black';
        this.flash = flash || false;
    }

    reset() {
        this.foreground = 'white';
        this.underline = false;
        this.italics = false;
        this.background = 'black';
        this.flash = false;
    }

    setStyles(styles) {
        var attribs = ['foreground', 'underline', 'italics', 'background', 'flash'];
        for (var i = 0 ; i < attribs.length; i++) {
            var style = attribs[i];
            if (styles.hasOwnProperty(style)) {
                this[style] = styles[style];
            }
        }
    }

    isDefault() {
        return (this.foreground === 'white' && !this.underline && !this.italics &&
                this.background === 'black' && !this.flash);
    }

    equals(other) {
        return ( (this.foreground === other.foreground) &&
                 (this.underline === other.underline) &&
                 (this.italics === other.italics) &&
                 (this.background === other.background) &&
                 (this.flash === other.flash) );
    }

    copy(newPenState) {
        this.foreground = newPenState.foreground;
        this.underline = newPenState.underline;
        this.italics = newPenState.italics;
        this.background = newPenState.background;
        this.flash = newPenState.flash;
    }

    toString() {
        return ('color=' + this.foreground + ', underline=' + this.underline + ', italics=' + this.italics +
            ', background=' + this.background + ', flash=' + this.flash);
    }
}

/**
 * Unicode character with styling and background.
 * @constructor
 */
class StyledUnicodeChar
{

    constructor(uchar, foreground, underline, italics, background, flash) {
        this.uchar = uchar || ' '; // unicode character
        this.penState = new PenState(foreground, underline,italics, background, flash);
    }

    reset() {
        this.uchar = ' ';
        this.penState.reset();
    }

    setChar(uchar, newPenState) {
        this.uchar = uchar;
        this.penState.copy(newPenState);
    }

    setPenState(newPenState) {
        this.penState.copy(newPenState);
    }

    equals(other) {
        return this.uchar === other.uchar && this.penState.equals(other.penState);
    }

    copy(newChar) {
        this.uchar = newChar.uchar;
        this.penState.copy(newChar.penState);
    }

    isEmpty() {
        return this.uchar === ' ' && this.penState.isDefault();
    }
}

/**
 * CEA-608 row consisting of NR_COLS instances of StyledUnicodeChar.
 * @constructor
 */
class Row {
    constructor() {
        this.chars = [];
        for (var i = 0 ; i < NR_COLS ; i++) {
            this.chars.push(new StyledUnicodeChar());
        }
        this.pos = 0;
        this.currPenState = new PenState();
    }

    equals(other) {
        var equal = true;
        for (var i = 0 ; i < NR_COLS; i ++) {
            if (!this.chars[i].equals(other.chars[i])) {
                equal = false;
                break;
            }
        }
        return equal;
    }

    copy(other) {
        for (var i = 0 ; i < NR_COLS; i ++) {
            this.chars[i].copy(other.chars[i]);
        }
    }

    isEmpty() {
        var empty = true;
        for (var i = 0 ; i < NR_COLS; i ++) {
            if (!this.chars[i].isEmpty()) {
                empty = false;
                break;
            }
        }
        return empty;
    }

    /**
     *  Set the cursor to a valid column.
     */
    setCursor(absPos) {
        if (this.pos !== absPos) {
            this.pos = absPos;
        }
        if (this.pos < 0) {
            logger.log('ERROR', 'Negative cursor position ' + this.pos);
            this.pos = 0;
        } else if (this.pos > NR_COLS) {
            logger.log('ERROR', 'Too large cursor position ' + this.pos);
            this.pos = NR_COLS;
        }
    }

    /**
     * Move the cursor relative to current position.
     */
    moveCursor(relPos) {
        var newPos = this.pos + relPos;
        if (relPos > 1) {
            for (var i = this.pos+1; i < newPos+1 ; i++) {
                this.chars[i].setPenState(this.currPenState);
            }
        }
        this.setCursor(newPos);
    }

    /**
     * Backspace, move one step back and clear character.
     */
    backSpace() {
        this.moveCursor(-1);
        this.chars[this.pos].setChar(' ', this.currPenState);
    }

    insertChar(byte) {
        if (byte >= 0x90) { //Extended char
            this.backSpace();
        }
        var char = getCharForByte(byte);
        if (this.pos >= NR_COLS) {
            logger.log('ERROR', 'Cannot insert ' + byte.toString(16) +
                        ' (' + char + ') at position ' + this.pos + '. Skipping it!');
            return;
        }
        this.chars[this.pos].setChar(char, this.currPenState);
        this.moveCursor(1);
    }

    clearFromPos(startPos) {
        var i;
        for (i = startPos ; i < NR_COLS ; i++) {
            this.chars[i].reset();
        }
    }

    clear() {
        this.clearFromPos(0);
        this.pos = 0;
        this.currPenState.reset();
    }

    clearToEndOfRow() {
        this.clearFromPos(this.pos);
    }

    getTextString() {
        var chars = [];
        var empty = true;
        for (var i = 0 ; i < NR_COLS ; i++) {
            var char = this.chars[i].uchar;
            if (char !== ' ') {
                empty = false;
            }
            chars.push(char);
        }
        if (empty) {
            return '';
        } else {
            return chars.join('');
        }
    }

    setPenStyles(styles) {
        this.currPenState.setStyles(styles);
        var currChar = this.chars[this.pos];
        currChar.setPenState(this.currPenState);
    }
}

/**
 * Keep a CEA-608 screen of 32x15 styled characters
 * @constructor
*/
class CaptionScreen {

    constructor() {
        this.rows = [];
        for (var i = 0 ; i <  NR_ROWS; i++) {
            this.rows.push(new Row()); // Note that we use zero-based numbering (0-14)
        }
        this.currRow = NR_ROWS - 1;
        this.nrRollUpRows = null;
        this.reset();
    }

    reset() {
        for (var i = 0 ; i < NR_ROWS ; i++) {
            this.rows[i].clear();
        }
        this.currRow = NR_ROWS - 1;
    }

    equals(other) {
        var equal = true;
        for (var i = 0 ; i < NR_ROWS ; i++) {
            if (!this.rows[i].equals(other.rows[i])) {
                equal = false;
                break;
            }
        }
        return equal;
    }

    copy(other) {
        for (var i = 0 ; i < NR_ROWS ; i++) {
            this.rows[i].copy(other.rows[i]);
        }
    }

    isEmpty() {
        var empty = true;
        for (var i = 0 ; i < NR_ROWS ; i++) {
            if (!this.rows[i].isEmpty()) {
                empty = false;
                break;
            }
        }
        return empty;
    }

    backSpace() {
        var row = this.rows[this.currRow];
        row.backSpace();
    }

    clearToEndOfRow() {
        var row = this.rows[this.currRow];
        row.clearToEndOfRow();
    }

    /**
     * Insert a character (without styling) in the current row.
     */
    insertChar(char) {
        var row = this.rows[this.currRow];
        row.insertChar(char);
    }

    setPen(styles) {
        var row = this.rows[this.currRow];
        row.setPenStyles(styles);
    }

    moveCursor(relPos) {
        var row = this.rows[this.currRow];
        row.moveCursor(relPos);
    }

    setCursor(absPos) {
        logger.log('INFO', 'setCursor: ' + absPos);
        var row = this.rows[this.currRow];
        row.setCursor(absPos);
    }

    setPAC(pacData) {
        logger.log('INFO', 'pacData = ' + JSON.stringify(pacData));
        var newRow = pacData.row - 1;
        if (this.nrRollUpRows  && newRow < this.nrRollUpRows - 1) {
                newRow = this.nrRollUpRows-1;
        }

        //Make sure this only affects Roll-up Captions by checking this.nrRollUpRows
        if (this.nrRollUpRows && this.currRow !== newRow) {
          //clear all rows first
          for (let i = 0; i < NR_ROWS; i++) {
            this.rows[i].clear();
          }

          //Copy this.nrRollUpRows rows from lastOutputScreen and place it in the newRow location
          //topRowIndex - the start of rows to copy (inclusive index)
          var topRowIndex = this.currRow + 1 - (this.nrRollUpRows);
          //We only copy if the last position was already shown.
          //We use the cueStartTime value to check this.
          const lastOutputScreen = this.lastOutputScreen;
          if (lastOutputScreen) {
            var prevLineTime = lastOutputScreen.rows[topRowIndex].cueStartTime;
            if(prevLineTime && prevLineTime < logger.time) {
              for (let i = 0; i < this.nrRollUpRows; i++) {
                this.rows[newRow-this.nrRollUpRows+i+1].copy(lastOutputScreen.rows[topRowIndex+i]);
              }
            }
          }
        }

        this.currRow = newRow;
        var row = this.rows[this.currRow];
        if (pacData.indent !== null) {
            var indent = pacData.indent;
            var prevPos = Math.max(indent-1, 0);
            row.setCursor(pacData.indent);
            pacData.color = row.chars[prevPos].penState.foreground;
        }
        var styles = {foreground : pacData.color, underline : pacData.underline, italics : pacData.italics, background : 'black', flash : false};
        this.setPen(styles);
    }

    /**
     * Set background/extra foreground, but first do back_space, and then insert space (backwards compatibility).
     */
    setBkgData(bkgData) {

        logger.log('INFO', 'bkgData = ' + JSON.stringify(bkgData));
        this.backSpace();
        this.setPen(bkgData);
        this.insertChar(0x20); //Space
    }

    setRollUpRows(nrRows) {
        this.nrRollUpRows = nrRows;
    }

    rollUp() {
        if (this.nrRollUpRows === null) {
            logger.log('DEBUG', 'roll_up but nrRollUpRows not set yet');
            return; //Not properly setup
        }
        logger.log('TEXT', this.getDisplayText());
        var topRowIndex = this.currRow + 1 - this.nrRollUpRows;
        var topRow = this.rows.splice(topRowIndex, 1)[0];
        topRow.clear();
        this.rows.splice(this.currRow, 0, topRow);
        logger.log('INFO', 'Rolling up');
        //logger.log('TEXT', this.get_display_text())
    }

   /**
    * Get all non-empty rows with as unicode text.
    */
    getDisplayText(asOneRow) {
        asOneRow = asOneRow || false;
        var displayText = [];
        var text = '';
        var rowNr = -1;
        for (var i = 0 ; i < NR_ROWS ; i++) {
            var rowText = this.rows[i].getTextString();
            if (rowText) {
                rowNr = i+1;
                if (asOneRow) {
                    displayText.push('Row ' + rowNr + ': \'' + rowText + '\'');
                } else {
                    displayText.push(rowText.trim());
                }
            }
        }
        if (displayText.length > 0) {
            if (asOneRow) {
                text = '[' + displayText.join(' | ') + ']';
            } else {
                text = displayText.join('\n');
            }
        }
        return text;
    }

    getTextAndFormat() {
        return this.rows;
    }
}

//var modes = ['MODE_ROLL-UP', 'MODE_POP-ON', 'MODE_PAINT-ON', 'MODE_TEXT'];

class Cea608Channel
{
    constructor(channelNumber, outputFilter) {

        this.chNr = channelNumber;
        this.outputFilter = outputFilter;
        this.mode = null;
        this.verbose = 0;
        this.displayedMemory = new CaptionScreen();
        this.nonDisplayedMemory = new CaptionScreen();
        this.lastOutputScreen = new CaptionScreen();
        this.currRollUpRow = this.displayedMemory.rows[NR_ROWS-1];
        this.writeScreen = this.displayedMemory;
        this.mode = null;
        this.cueStartTime = null; // Keeps track of where a cue started.
    }

    reset() {
        this.mode = null;
        this.displayedMemory.reset();
        this.nonDisplayedMemory.reset();
        this.lastOutputScreen.reset();
        this.currRollUpRow = this.displayedMemory.rows[NR_ROWS-1];
        this.writeScreen = this.displayedMemory;
        this.mode = null;
        this.cueStartTime = null;
        this.lastCueEndTime = null;
    }

    getHandler() {
        return this.outputFilter;
    }

    setHandler(newHandler) {
        this.outputFilter = newHandler;
    }

    setPAC(pacData) {
        this.writeScreen.setPAC(pacData);
    }

    setBkgData(bkgData) {
        this.writeScreen.setBkgData(bkgData);
    }

    setMode(newMode) {
        if (newMode === this.mode) {
            return;
        }
        this.mode = newMode;
        logger.log('INFO', 'MODE=' + newMode);
        if (this.mode === 'MODE_POP-ON') {
            this.writeScreen = this.nonDisplayedMemory;
        } else {
            this.writeScreen = this.displayedMemory;
            this.writeScreen.reset();
        }
        if (this.mode !== 'MODE_ROLL-UP') {
            this.displayedMemory.nrRollUpRows = null;
            this.nonDisplayedMemory.nrRollUpRows = null;
        }
        this.mode = newMode;
    }

    insertChars(chars) {
        for (var i = 0 ; i < chars.length ; i++) {
            this.writeScreen.insertChar(chars[i]);
        }
        var screen = this.writeScreen === this.displayedMemory ? 'DISP' : 'NON_DISP';
        logger.log('INFO', screen + ': ' + this.writeScreen.getDisplayText(true));
        if (this.mode === 'MODE_PAINT-ON' || this.mode === 'MODE_ROLL-UP') {
            logger.log('TEXT', 'DISPLAYED: ' + this.displayedMemory.getDisplayText(true));
            this.outputDataUpdate();
        }
    }

    ccRCL() { // Resume Caption Loading (switch mode to Pop On)
        logger.log('INFO', 'RCL - Resume Caption Loading');
        this.setMode('MODE_POP-ON');
    }

    ccBS() { // BackSpace
        logger.log('INFO', 'BS - BackSpace');
        if (this.mode === 'MODE_TEXT') {
            return;
        }
        this.writeScreen.backSpace();
        if (this.writeScreen === this.displayedMemory) {
            this.outputDataUpdate();
        }
    }

    ccAOF() { // Reserved (formerly Alarm Off)
        return;
    }

    ccAON() { // Reserved (formerly Alarm On)
        return;
    }

    ccDER() { // Delete to End of Row
        logger.log('INFO', 'DER- Delete to End of Row');
        this.writeScreen.clearToEndOfRow();
        this.outputDataUpdate();
    }

    ccRU(nrRows) { //Roll-Up Captions-2,3,or 4 Rows
        logger.log('INFO', 'RU(' + nrRows +') - Roll Up');
        this.writeScreen = this.displayedMemory;
        this.setMode('MODE_ROLL-UP');
        this.writeScreen.setRollUpRows(nrRows);
    }

    ccFON() { //Flash On
        logger.log('INFO', 'FON - Flash On');
        this.writeScreen.setPen({flash : true});
    }

    ccRDC() { // Resume Direct Captioning (switch mode to PaintOn)
        logger.log('INFO', 'RDC - Resume Direct Captioning');
        this.setMode('MODE_PAINT-ON');
    }

    ccTR() { // Text Restart in text mode (not supported, however)
        logger.log('INFO', 'TR');
        this.setMode('MODE_TEXT');
    }

    ccRTD() { // Resume Text Display in Text mode (not supported, however)
        logger.log('INFO', 'RTD');
        this.setMode('MODE_TEXT');
    }

    ccEDM() { // Erase Displayed Memory
        logger.log('INFO', 'EDM - Erase Displayed Memory');
        this.displayedMemory.reset();
        this.outputDataUpdate();
    }

    ccCR() { // Carriage Return
        logger.log('CR - Carriage Return');
        this.writeScreen.rollUp();
        this.outputDataUpdate();
    }

    ccENM() { //Erase Non-Displayed Memory
        logger.log('INFO', 'ENM - Erase Non-displayed Memory');
        this.nonDisplayedMemory.reset();
    }

    ccEOC() { //End of Caption (Flip Memories)
        logger.log('INFO', 'EOC - End Of Caption');
        if (this.mode === 'MODE_POP-ON') {
            var tmp = this.displayedMemory;
            this.displayedMemory = this.nonDisplayedMemory;
            this.nonDisplayedMemory = tmp;
            this.writeScreen = this.nonDisplayedMemory;
            logger.log('TEXT', 'DISP: ' + this.displayedMemory.getDisplayText());
        }
        this.outputDataUpdate();
    }

    ccTO(nrCols) { // Tab Offset 1,2, or 3 columns
        logger.log('INFO', 'TO(' + nrCols + ') - Tab Offset');
        this.writeScreen.moveCursor(nrCols);
    }

    ccMIDROW(secondByte) { // Parse MIDROW command
        var styles = {flash : false};
        styles.underline = secondByte % 2 === 1;
        styles.italics = secondByte >= 0x2e;
        if (!styles.italics) {
            var colorIndex = Math.floor(secondByte/2) - 0x10;
            var colors = ['white', 'green', 'blue', 'cyan', 'red', 'yellow', 'magenta'];
            styles.foreground = colors[colorIndex];
        } else {
            styles.foreground = 'white';
        }
        logger.log('INFO', 'MIDROW: ' + JSON.stringify(styles));
        this.writeScreen.setPen(styles);
    }

    outputDataUpdate() {
        var t = logger.time;
        if (t === null) {
            return;
        }
        if (this.outputFilter) {
            if (this.outputFilter.updateData) {
                this.outputFilter.updateData(t, this.displayedMemory);
            }
            if (this.cueStartTime === null && !this.displayedMemory.isEmpty()) { // Start of a new cue
                this.cueStartTime = t;
            } else {
                if (!this.displayedMemory.equals(this.lastOutputScreen)) {
                    if (this.outputFilter.newCue) {
                        this.outputFilter.newCue(this.cueStartTime, t, this.lastOutputScreen);
                    }
                    this.cueStartTime = this.displayedMemory.isEmpty() ? null : t;
                }
            }
            this.lastOutputScreen.copy(this.displayedMemory);
        }
    }

    cueSplitAtTime(t) {
        if (this.outputFilter) {
            if (!this.displayedMemory.isEmpty()) {
                if (this.outputFilter.newCue) {
                    this.outputFilter.newCue(this.cueStartTime, t, this.displayedMemory);
                }
                this.cueStartTime = t;
            }
        }
    }
}

class Cea608Parser {

    constructor(field, out1, out2) {
        this.field = field || 1;
        this.outputs = [out1, out2];
        this.channels = [new Cea608Channel(1, out1), new Cea608Channel(2, out2)];
        this.currChNr = -1; // Will be 1 or 2
        this.lastCmdA = null; // First byte of last command
        this.lastCmdB = null; // Second byte of last command
        this.bufferedData = [];
        this.startTime = null;
        this.lastTime = null;
        this.dataCounters = {'padding' : 0, 'char' : 0, 'cmd' : 0, 'other' : 0};
    }

    getHandler(index) {
        return this.channels[index].getHandler();
    }

    setHandler(index, newHandler) {
        this.channels[index].setHandler(newHandler);
    }

    /**
     * Add data for time t in forms of list of bytes (unsigned ints). The bytes are treated as pairs.
     */
    addData(t, byteList) {
        var cmdFound, a, b,
        charsFound = false;

        this.lastTime = t;
        logger.setTime(t);

        for (var i = 0 ; i < byteList.length ; i+=2) {
            a = byteList[i] & 0x7f;
            b = byteList[i+1] & 0x7f;
            if (a === 0 && b === 0) {
                this.dataCounters.padding += 2;
                continue;
            } else {
                logger.log('DATA', '[' + numArrayToHexArray([byteList[i], byteList[i+1]]) +'] -> (' + numArrayToHexArray([a, b]) + ')');
            }
            cmdFound = this.parseCmd(a, b);
            if (!cmdFound) {
                cmdFound = this.parseMidrow(a, b);
            }
            if (!cmdFound) {
                cmdFound = this.parsePAC(a, b);
            }
            if (!cmdFound) {
                cmdFound = this.parseBackgroundAttributes(a, b);
            }
            if (!cmdFound) {
                charsFound = this.parseChars(a, b);
                if (charsFound) {
                    if (this.currChNr && this.currChNr >=0) {
                        var channel = this.channels[this.currChNr-1];
                        channel.insertChars(charsFound);
                    } else {
                        logger.log('WARNING', 'No channel found yet. TEXT-MODE?');
                    }
                }
            }
            if (cmdFound) {
                this.dataCounters.cmd += 2;
            } else if (charsFound) {
                this.dataCounters.char += 2;
            } else {
                this.dataCounters.other += 2;
                logger.log('WARNING', 'Couldn\'t parse cleaned data ' + numArrayToHexArray([a, b]) +
                            ' orig: ' + numArrayToHexArray([byteList[i], byteList[i+1]]));
            }
        }
    }

    /**
     * Parse Command.
     * @returns {Boolean} Tells if a command was found
     */
    parseCmd(a, b) {
        var chNr = null;

        var cond1 = (a === 0x14 || a === 0x1C) && (0x20 <= b && b <= 0x2F);
        var cond2 = (a === 0x17 || a === 0x1F) && (0x21 <= b && b <= 0x23);
        if (!(cond1 || cond2)) {
            return false;
        }

        if (a === this.lastCmdA && b === this.lastCmdB) {
            this.lastCmdA = null;
            this.lastCmdB = null; // Repeated commands are dropped (once)
            logger.log('DEBUG', 'Repeated command (' + numArrayToHexArray([a, b]) + ') is dropped');
            return true;
        }

        if (a === 0x14 || a === 0x17) {
            chNr = 1;
        } else {
            chNr = 2; // (a === 0x1C || a=== 0x1f)
        }

        var channel = this.channels[chNr - 1];

        if (a === 0x14 || a === 0x1C) {
            if (b === 0x20) {
                channel.ccRCL();
            } else if (b === 0x21) {
                channel.ccBS();
            } else if (b === 0x22) {
                channel.ccAOF();
            } else if (b === 0x23) {
                channel.ccAON();
            } else if (b === 0x24) {
                channel.ccDER();
            } else if (b === 0x25) {
                channel.ccRU(2);
            } else if (b === 0x26) {
                channel.ccRU(3);
            } else if (b === 0x27) {
                channel.ccRU(4);
            } else if (b === 0x28) {
                channel.ccFON();
            } else if (b === 0x29) {
                channel.ccRDC();
            } else if (b === 0x2A) {
                channel.ccTR();
            } else if (b === 0x2B) {
                channel.ccRTD();
            } else if (b === 0x2C) {
                channel.ccEDM();
            } else if (b === 0x2D) {
                channel.ccCR();
            } else if (b === 0x2E) {
                channel.ccENM();
            } else if (b === 0x2F) {
                channel.ccEOC();
            }
        } else { //a == 0x17 || a == 0x1F
            channel.ccTO(b - 0x20);
        }
        this.lastCmdA = a;
        this.lastCmdB = b;
        this.currChNr = chNr;
        return true;
    }

    /**
     * Parse midrow styling command
     * @returns {Boolean}
     */
    parseMidrow(a, b) {
        var chNr = null;

        if ( ((a === 0x11) || (a === 0x19)) && 0x20 <= b && b <= 0x2f) {
            if (a === 0x11) {
                chNr = 1;
            } else  {
                chNr = 2;
            }
            if (chNr !== this.currChNr) {
                logger.log('ERROR', 'Mismatch channel in midrow parsing');
                return false;
            }
            var channel = this.channels[chNr-1];
            channel.ccMIDROW(b);
            logger.log('DEBUG', 'MIDROW (' + numArrayToHexArray([a, b]) + ')');
            return true;
        }
        return false;
    }
    /**
     * Parse Preable Access Codes (Table 53).
     * @returns {Boolean} Tells if PAC found
     */
    parsePAC(a, b) {

       var chNr = null;
       var row = null;

        var case1 = ((0x11 <= a  && a <= 0x17) || (0x19 <= a && a <= 0x1F)) && (0x40 <= b && b <= 0x7F);
        var case2 = (a === 0x10 || a === 0x18) && (0x40 <= b && b <= 0x5F);
        if (! (case1 || case2)) {
            return false;
        }

        if (a === this.lastCmdA && b === this.lastCmdB) {
            this.lastCmdA = null;
            this.lastCmdB = null;
            return true; // Repeated commands are dropped (once)
        }

        chNr = (a <= 0x17) ? 1 : 2;

        if (0x40 <= b && b <= 0x5F) {
            row = (chNr === 1) ? rowsLowCh1[a] : rowsLowCh2[a];
        } else { // 0x60 <= b <= 0x7F
            row = (chNr === 1) ? rowsHighCh1[a] : rowsHighCh2[a];
        }
        var pacData = this.interpretPAC(row, b);
        var channel = this.channels[chNr-1];
        channel.setPAC(pacData);
        this.lastCmdA = a;
        this.lastCmdB = b;
        this.currChNr = chNr;
        return true;
    }

    /**
     * Interpret the second byte of the pac, and return the information.
     * @returns {Object} pacData with style parameters.
     */
    interpretPAC(row, byte) {
        var pacIndex = byte;
        var pacData = {color : null, italics : false, indent : null, underline : false, row : row};

        if (byte > 0x5F) {
            pacIndex = byte - 0x60;
        } else {
            pacIndex = byte - 0x40;
        }
        pacData.underline = (pacIndex & 1) === 1;
        if (pacIndex <= 0xd) {
            pacData.color = ['white', 'green', 'blue', 'cyan', 'red', 'yellow', 'magenta', 'white'][Math.floor(pacIndex/2)];
        } else if (pacIndex <= 0xf) {
            pacData.italics = true;
            pacData.color = 'white';
        } else {
            pacData.indent = (Math.floor((pacIndex-0x10)/2))*4;
        }
        return pacData; // Note that row has zero offset. The spec uses 1.
    }

    /**
     * Parse characters.
     * @returns An array with 1 to 2 codes corresponding to chars, if found. null otherwise.
     */
    parseChars(a, b) {

       var  channelNr = null,
            charCodes = null,
            charCode1 = null;

        if (a >= 0x19) {
            channelNr = 2;
            charCode1 = a - 8;
        } else {
            channelNr = 1;
            charCode1 = a;
        }
        if (0x11 <= charCode1 && charCode1 <= 0x13) {
            // Special character
            var oneCode = b;
            if (charCode1 === 0x11) {
                oneCode = b + 0x50;
            } else if (charCode1 === 0x12) {
                oneCode = b + 0x70;
            } else {
                oneCode = b + 0x90;
            }
            logger.log('INFO', 'Special char \'' + getCharForByte(oneCode) + '\' in channel ' + channelNr);
            charCodes = [oneCode];
        } else if (0x20 <= a && a <= 0x7f) {
            charCodes = (b === 0) ? [a] : [a, b];
        }
        if (charCodes) {
            var hexCodes = numArrayToHexArray(charCodes);
            logger.log('DEBUG', 'Char codes =  ' + hexCodes.join(','));
            this.lastCmdA = null;
            this.lastCmdB = null;
        }
        return charCodes;
    }

    /**
    * Parse extended background attributes as well as new foreground color black.
    * @returns{Boolean} Tells if background attributes are found
    */
    parseBackgroundAttributes(a, b) {
       var  bkgData,
            index,
            chNr,
            channel;

        var case1 = (a === 0x10 || a === 0x18) && (0x20 <= b && b <= 0x2f);
        var case2 = (a === 0x17 || a === 0x1f) && (0x2d <=b && b <= 0x2f);
        if (!(case1 || case2)) {
            return false;
        }
        bkgData = {};
        if (a  === 0x10 || a === 0x18) {
            index = Math.floor((b-0x20)/2);
            bkgData.background = backgroundColors[index];
            if (b % 2 === 1) {
                bkgData.background = bkgData.background + '_semi';
            }
        } else if (b === 0x2d) {
            bkgData.background = 'transparent';
        } else {
            bkgData.foreground = 'black';
            if (b === 0x2f) {
                bkgData.underline = true;
            }
        }
        chNr = (a < 0x18) ? 1 : 2;
        channel = this.channels[chNr-1];
        channel.setBkgData(bkgData);
        this.lastCmdA = null;
        this.lastCmdB = null;
        return true;
    }

    /**
     * Reset state of parser and its channels.
     */
    reset() {
        for (var i=0 ; i < this.channels.length ; i++) {
            if (this.channels[i]) {
                this.channels[i].reset();
            }
        }
        this.lastCmdA = null;
        this.lastCmdB = null;
    }

    /**
     * Trigger the generation of a cue, and the start of a new one if displayScreens are not empty.
     */
    cueSplitAtTime(t) {
        for (var i=0 ; i < this.channels.length ; i++) {
            if (this.channels[i]) {
                this.channels[i].cueSplitAtTime(t);
            }
        }
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Cea608Parser);


/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vttparser__ = __webpack_require__(13);


// String.prototype.startsWith is not supported in IE11
const startsWith = function(inputString, searchString, position) {
  return inputString.substr(position || 0, searchString.length) === searchString;
};

const cueString2millis = function(timeString) {
    let ts = parseInt(timeString.substr(-3));
    let secs = parseInt(timeString.substr(-6,2));
    let mins = parseInt(timeString.substr(-9,2));
    let hours = timeString.length > 9 ? parseInt(timeString.substr(0, timeString.indexOf(':'))) : 0;

    if (isNaN(ts) || isNaN(secs) || isNaN(mins) || isNaN(hours)) {
        return -1;
    }

    ts += 1000 * secs;
    ts += 60*1000 * mins;
    ts += 60*60*1000 * hours;

    return ts;
};

// From https://github.com/darkskyapp/string-hash
const hash = function(text) {
    let hash = 5381;
    let i = text.length;
    while (i) {
        hash = (hash * 33) ^ text.charCodeAt(--i);
    }
    return (hash >>> 0).toString();
};

const calculateOffset = function(vttCCs, cc, presentationTime) {
    let currCC = vttCCs[cc];
    let prevCC = vttCCs[currCC.prevCC];

    // This is the first discontinuity or cues have been processed since the last discontinuity
    // Offset = current discontinuity time
    if (!prevCC || (!prevCC.new && currCC.new)) {
        vttCCs.ccOffset = vttCCs.presentationOffset = currCC.start;
        currCC.new = false;
        return;
    }

    // There have been discontinuities since cues were last parsed.
    // Offset = time elapsed
    while (prevCC && prevCC.new) {
        vttCCs.ccOffset += currCC.start - prevCC.start;
        currCC.new = false;
        currCC = prevCC;
        prevCC = vttCCs[currCC.prevCC];
    }

    vttCCs.presentationOffset = presentationTime;
};

const WebVTTParser = {
    parse: function(vttByteArray, syncPTS, vttCCs, cc, callBack, errorCallBack) {
        // Convert byteArray into string, replacing any somewhat exotic linefeeds with "\n", then split on that character.
        let re = /\r\n|\n\r|\n|\r/g;
        let vttLines = String.fromCharCode.apply(null, new Uint8Array(vttByteArray)).trim().replace(re, '\n').split('\n');
        let cueTime = '00:00.000';
        let mpegTs = 0;
        let localTime = 0;
        let presentationTime = 0;
        let cues = [];
        let parsingError;
        let inHeader = true;
        // let VTTCue = VTTCue || window.TextTrackCue;

        // Create parser object using VTTCue with TextTrackCue fallback on certain browsers.
        let parser = new __WEBPACK_IMPORTED_MODULE_0__vttparser__["a" /* default */]();

        parser.oncue = function(cue) {
            // Adjust cue timing; clamp cues to start no earlier than - and drop cues that don't end after - 0 on timeline.
            let currCC = vttCCs[cc];
            let cueOffset = vttCCs.ccOffset;

            // Update offsets for new discontinuities
            if (currCC && currCC.new) {
                if (localTime !== undefined) {
                    // When local time is provided, offset = discontinuity start time - local time
                    cueOffset = vttCCs.ccOffset = currCC.start;
                } else {
                    calculateOffset(vttCCs, cc, presentationTime);
                }
            }

            if (presentationTime) {
                // If we have MPEGTS, offset = presentation time + discontinuity offset
                cueOffset = presentationTime + vttCCs.ccOffset - vttCCs.presentationOffset;
            }

            cue.startTime += cueOffset - localTime;
            cue.endTime += cueOffset - localTime;

            // Create a unique hash id for a cue based on start/end times and text.
            // This helps timeline-controller to avoid showing repeated captions.
            cue.id = hash(cue.startTime) + hash(cue.endTime) + hash(cue.text);

            // Fix encoding of special characters. TODO: Test with all sorts of weird characters.
            cue.text = decodeURIComponent(escape(cue.text));
            if (cue.endTime > 0) {
              cues.push(cue);
            }
        };

        parser.onparsingerror = function(e) {
            parsingError = e;
        };

        parser.onflush = function() {
            if (parsingError && errorCallBack) {
                errorCallBack(parsingError);
                return;
            }
            callBack(cues);
        };

        // Go through contents line by line.
        vttLines.forEach(line => {
            if (inHeader) {
                // Look for X-TIMESTAMP-MAP in header.
                if (startsWith(line, 'X-TIMESTAMP-MAP=')) {
                    // Once found, no more are allowed anyway, so stop searching.
                    inHeader = false;
                    // Extract LOCAL and MPEGTS.
                    line.substr(16).split(',').forEach(timestamp => {
                        if (startsWith(timestamp, 'LOCAL:')) {
                          cueTime = timestamp.substr(6);
                        } else if (startsWith(timestamp, 'MPEGTS:')) {
                          mpegTs = parseInt(timestamp.substr(7));
                        }
                    });
                    try {
                        // Calculate subtitle offset in milliseconds.
                        // If sync PTS is less than zero, we have a 33-bit wraparound, which is fixed by adding 2^33 = 8589934592.
                        syncPTS = syncPTS < 0 ? syncPTS + 8589934592 : syncPTS;
                        // Adjust MPEGTS by sync PTS.
                        mpegTs -= syncPTS;
                        // Convert cue time to seconds
                        localTime = cueString2millis(cueTime) / 1000;
                        // Convert MPEGTS to seconds from 90kHz.
                        presentationTime = mpegTs / 90000;

                        if (localTime === -1) {
                            parsingError = new Error(`Malformed X-TIMESTAMP-MAP: ${line}`);
                        }
                    }
                    catch(e) {
                        parsingError = new Error(`Malformed X-TIMESTAMP-MAP: ${line}`);
                    }
                    // Return without parsing X-TIMESTAMP-MAP line.
                    return;
                } else if (line === '') {
                  inHeader = false;
                }
            }
            // Parse line by default.
            parser.parse(line+'\n');
        });

        parser.flush();
    }
};


module.exports = WebVTTParser;

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(4)(module)))

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__events__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__events__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__event_handler__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_logger__ = __webpack_require__(0);
/*
 * audio track controller
*/





function filterSubtitleTracks(textTrackList) {
  let tracks = [];
  for (let i = 0; i < textTrackList.length; i++) {
    if (textTrackList[i].kind === 'subtitles') {
      tracks.push(textTrackList[i]);
    }
  }
  return tracks;
}

class SubtitleTrackController extends __WEBPACK_IMPORTED_MODULE_1__event_handler__["a" /* default */] {

  constructor(hls) {
    super(hls,
               __WEBPACK_IMPORTED_MODULE_0__events___default.a.MEDIA_ATTACHED,
               __WEBPACK_IMPORTED_MODULE_0__events___default.a.MEDIA_DETACHING,
               __WEBPACK_IMPORTED_MODULE_0__events___default.a.MANIFEST_LOADING,
               __WEBPACK_IMPORTED_MODULE_0__events___default.a.MANIFEST_LOADED,
               __WEBPACK_IMPORTED_MODULE_0__events___default.a.SUBTITLE_TRACK_LOADED);
    this.tracks = [];
    this.trackId = -1;
    this.media = undefined;
  }

  _onTextTracksChanged() {
    // Media is undefined when switching streams via loadSource()
    if (!this.media) {
      return;
    }

    let trackId = -1;
    let tracks = filterSubtitleTracks(this.media.textTracks);
    for (let id = 0; id < tracks.length; id++) {
      if (tracks[id].mode === 'showing') {
        trackId = id;
      }
    }

    // Setting current subtitleTrack will invoke code.
    this.subtitleTrack = trackId;
  }

  destroy() {
    __WEBPACK_IMPORTED_MODULE_1__event_handler__["a" /* default */].prototype.destroy.call(this);
  }

  // Listen for subtitle track change, then extract the current track ID.
  onMediaAttached(data) {
    this.media = data.media;
    if (!this.media) {
      return;
    }

    this.trackChangeListener = this._onTextTracksChanged.bind(this);
    this.media.textTracks.addEventListener('change', this.trackChangeListener);
  }

  onMediaDetaching() {
    if (!this.media) {
      return;
    }

    this.media.textTracks.removeEventListener('change', this.trackChangeListener);

    this.media = undefined;
  }

  // Reset subtitle tracks on manifest loading
  onManifestLoading() {
    this.tracks = [];
    this.trackId = -1;
  }

  // Fired whenever a new manifest is loaded.
  onManifestLoaded(data) {
    let tracks = data.subtitles || [];
    let defaultFound = false;
    this.tracks = tracks;
    this.trackId = -1;
    this.hls.trigger(__WEBPACK_IMPORTED_MODULE_0__events___default.a.SUBTITLE_TRACKS_UPDATED, {subtitleTracks : tracks});

    // loop through available subtitle tracks and autoselect default if needed
    // TODO: improve selection logic to handle forced, etc
    tracks.forEach(track => {
      if (track.default) {
        this.subtitleTrack = track.id;
        defaultFound = true;
      }
    });
  }

  // Trigger subtitle track playlist reload.
  onTick() {
    const trackId = this.trackId;
    const subtitleTrack = this.tracks[trackId];
    if (!subtitleTrack) {
      return;
    }

    const details = subtitleTrack.details;
    // check if we need to load playlist for this subtitle Track
    if (details === undefined || details.live === true) {
      // track not retrieved yet, or live playlist we need to (re)load it
      __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].log(`(re)loading playlist for subtitle track ${trackId}`);
      this.hls.trigger(__WEBPACK_IMPORTED_MODULE_0__events___default.a.SUBTITLE_TRACK_LOADING, {url: subtitleTrack.url, id: trackId});
    }
  }

  onSubtitleTrackLoaded(data) {
    if (data.id < this.tracks.length) {
      __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].log(`subtitle track ${data.id} loaded`);
      this.tracks[data.id].details = data.details;
      // check if current playlist is a live playlist
      if (data.details.live && !this.timer) {
        // if live playlist we will have to reload it periodically
        // set reload period to playlist target duration
        this.timer = setInterval(() => {
          this.onTick();
        }, 1000 * data.details.targetduration, this);
      }
      if (!data.details.live && this.timer) {
        // playlist is not live and timer is armed : stopping it
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  }

  /** get alternate subtitle tracks list from playlist **/
  get subtitleTracks() {
    return this.tracks;
  }

  /** get index of the selected subtitle track (index in subtitle track lists) **/
  get subtitleTrack() {
   return this.trackId;
  }

  /** select a subtitle track, based on its index in subtitle track lists**/
  set subtitleTrack(subtitleTrackId) {
    if (this.trackId !== subtitleTrackId) {// || this.tracks[subtitleTrackId].details === undefined) {
      this.setSubtitleTrackInternal(subtitleTrackId);
    }
  }

 setSubtitleTrackInternal(newId) {
    // check if level idx is valid
    if (newId >= 0 && newId < this.tracks.length) {
      // stopping live reloading timer if any
      if (this.timer) {
       clearInterval(this.timer);
       this.timer = null;
      }
      this.trackId = newId;
      __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].log(`switching to subtitle track ${newId}`);
      let subtitleTrack = this.tracks[newId];
      this.hls.trigger(__WEBPACK_IMPORTED_MODULE_0__events___default.a.SUBTITLE_TRACK_SWITCH, {id: newId});
       // check if we need to load playlist for this subtitle Track
      let details = subtitleTrack.details;
      if (details === undefined || details.live === true) {
        // track not retrieved yet, or live playlist we need to (re)load it
        __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].log(`(re)loading playlist for subtitle track ${newId}`);
        this.hls.trigger(__WEBPACK_IMPORTED_MODULE_0__events___default.a.SUBTITLE_TRACK_LOADING, {url: subtitleTrack.url, id: newId});
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (SubtitleTrackController);


/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__events__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__events__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__event_handler__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_logger__ = __webpack_require__(0);
/*
 * Subtitle Stream Controller
*/





class SubtitleStreamController extends __WEBPACK_IMPORTED_MODULE_1__event_handler__["a" /* default */] {

  constructor(hls) {
    super(hls,
      __WEBPACK_IMPORTED_MODULE_0__events___default.a.ERROR,
      __WEBPACK_IMPORTED_MODULE_0__events___default.a.SUBTITLE_TRACKS_UPDATED,
      __WEBPACK_IMPORTED_MODULE_0__events___default.a.SUBTITLE_TRACK_SWITCH,
      __WEBPACK_IMPORTED_MODULE_0__events___default.a.SUBTITLE_TRACK_LOADED,
      __WEBPACK_IMPORTED_MODULE_0__events___default.a.SUBTITLE_FRAG_PROCESSED);
    this.config = hls.config;
    this.vttFragSNsProcessed = {};
    this.vttFragQueues = undefined;
    this.currentlyProcessing = null;
    this.currentTrackId = -1;
  }

  destroy() {
    __WEBPACK_IMPORTED_MODULE_1__event_handler__["a" /* default */].prototype.destroy.call(this);
  }

  // Remove all queued items and create a new, empty queue for each track.
  clearVttFragQueues() {
    this.vttFragQueues = {};
    this.tracks.forEach(track => {
      this.vttFragQueues[track.id] = [];
    });
  }

  // If no frag is being processed and queue isn't empty, initiate processing of next frag in line.
  nextFrag() {
    if(this.currentlyProcessing === null && this.currentTrackId > -1 && this.vttFragQueues[this.currentTrackId].length) {
      let frag = this.currentlyProcessing = this.vttFragQueues[this.currentTrackId].shift();
      this.hls.trigger(__WEBPACK_IMPORTED_MODULE_0__events___default.a.FRAG_LOADING, {frag});
    }
  }

  // When fragment has finished processing, add sn to list of completed if successful.
  onSubtitleFragProcessed(data) {
    if(data.success) {
      this.vttFragSNsProcessed[data.frag.trackId].push(data.frag.sn);
    }
    this.currentlyProcessing = null;
    this.nextFrag();
  }

  // If something goes wrong, procede to next frag, if we were processing one.
  onError(data) {
    let frag = data.frag;
    // don't handle frag error not related to subtitle fragment
    if (frag && frag.type !== 'subtitle') {
      return;
    }
    if(this.currentlyProcessing) {
      this.currentlyProcessing = null;
      this.nextFrag();
    }
  }

  // Got all new subtitle tracks.
  onSubtitleTracksUpdated(data) {
    __WEBPACK_IMPORTED_MODULE_2__utils_logger__["b" /* logger */].log('subtitle tracks updated');
    this.tracks = data.subtitleTracks;
    this.clearVttFragQueues();
    this.vttFragSNsProcessed = {};
    this.tracks.forEach(track => {
      this.vttFragSNsProcessed[track.id] = [];
    });
  }

  onSubtitleTrackSwitch(data) {
    this.currentTrackId = data.id;
    this.clearVttFragQueues();
  }

  // Got a new set of subtitle fragments.
  onSubtitleTrackLoaded(data) {
    const processedFragSNs = this.vttFragSNsProcessed[data.id],
        fragQueue = this.vttFragQueues[data.id],
        currentFragSN = !!this.currentlyProcessing ? this.currentlyProcessing.sn : -1;

    const alreadyProcessed = function(frag) {
      return processedFragSNs.indexOf(frag.sn) > -1;
    };

    const alreadyInQueue = function(frag) {
      return fragQueue.some(fragInQueue => {return fragInQueue.sn === frag.sn;});
    };

    // Add all fragments that haven't been, aren't currently being and aren't waiting to be processed, to queue.
    data.details.fragments.forEach(frag => {
      if(!(alreadyProcessed(frag) || frag.sn === currentFragSN || alreadyInQueue(frag))) {
        // Frags don't know their subtitle track ID, so let's just add that...
        frag.trackId = data.id;
        fragQueue.push(frag);
      }
    });

    this.nextFrag();
  }
}
/* harmony default export */ __webpack_exports__["a"] = (SubtitleStreamController);



/***/ })
/******/ ]);