import jstz from 'jstz'
import moment from 'moment-timezone'

export class Utils {
    static random = (length = 8) => {
        return Math.random().toString(16).substr(2, length);
    };

    static isObjValid(obj) {
        if(obj === undefined || obj === null) return false;
        var result = obj && obj !== 'null' && obj !== 'undefined' && obj !== undefined;
        return result;
    }

    static isArrayHasItems(obj) {
        if(!Utils.isObjValid(obj)) return false;
        if(!Array.isArray(obj)) return false;
        if(obj.length === 0) return false;
        return true;
    }

    static Copy = (obj) => {
        if(!Utils.isObjValid(obj)) return null;
        return JSON.parse(JSON.stringify(obj, (_, v) => typeof v === 'bigint' ? v.toString() : v));
    }

    static varToString = varObj => Object.keys(varObj)[0];

    static CopyMap = (mapSrc) => {
        let destMap = new Map();
        for (const [key, value] of mapSrc.entries()) {
            destMap.set(key, Utils.Copy(value));
        }
        return destMap;
    }
    
    static ConvertUnixTimestampToLocalTime = (longtimestamp) => {
        
        // convert unix time to ISO time
        const timestamp = Number(BigInt(longtimestamp) / BigInt(1000000000))
        const dateObj = new Date(timestamp * 1000);
        const isoTime = dateObj.toISOString();

        // set local time zone
        if (!sessionStorage.getItem('timezone')) {
            var tz = jstz.determine() || 'UTC';
            sessionStorage.setItem('timezone', tz.name());
        }
        var currTz = sessionStorage.getItem('timezone');

        // convert to local time 
        var momentTime = moment(isoTime);
        return momentTime.tz(currTz).format('MM-DD-YYYY h:mm A z');
    }   

    static ConvertNanoSecondsToHours = (input) => {
        return (Number(input) / Number(3600000000000)).toFixed(2);
    }

    static bufferToHex = (buffer) => {
        return [...new Uint8Array(buffer)]
          .map(b => b.toString(16).padStart(2, "0"))
          .join("");
      }
}