import "../../../env";
const Cache = require('memory-cache');
const CryptoJS = require('crypto-js');  
const request = require('request');

function makeSignature() {
	var space = " ";				// one space
	var newLine = "\n";				// new line
	var method = "POST";				// method
	var url = `/sms/v2/services/${process.env.SENS_SERVICE_ID}/messages`;	// url (include query string)
	var timestamp = Date.now().toString();;			// current timestamp (epoch)
	var accessKey = process.env.SENS_ACCESS_ID;			// access key id (from portal or Sub Account)
	var secretKey = process.env.SENS_ACCESS_SECRET;			// secret key (from portal or Sub Account)

	var hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
	hmac.update(method);
	hmac.update(space);
	hmac.update(url);
	hmac.update(newLine);
	hmac.update(timestamp);
	hmac.update(newLine);
	hmac.update(accessKey);

	var hash = hmac.finalize();

	return hash.toString(CryptoJS.enc.Base64);
}


export default {
    Mutation: {
    phoneRequest: async (_, args, {}) => {
        const {phoneNumber} = args
        Cache.del(phoneNumber);

        let verifyCode="";
        for (let i = 0; i < 6; i++) {
            verifyCode += parseInt(Math.random() * 10).toString();
        };
        Cache.put(phoneNumber, verifyCode);

        try {
            const url = `https://sens.apigw.ntruss.com/sms/v2/services/${process.env.SENS_SERVICE_ID}/messages`;
            const method = "POST";
            request({
                method : method,
                json : true,
                uri : url,
                headers : {
                    'Contenc-type': 'application/json; charset=utf-8',
                    'x-ncp-iam-access-key': process.env.SENS_ACCESS_ID,
                    'x-ncp-apigw-timestamp': Date.now().toString(),
                    'x-ncp-apigw-signature-v2': makeSignature()
                },
                body : {
                    'type' : 'SMS',
                    'countryCode' : '82',
                    'from' : process.env.SENS_FROM_PHONE,
                    'content' : `슬기로운 의사 생활 인증번호 ${verifyCode} 입니다.`,
                    'messages' : [
                        {
                            'to' : `${phoneNumber}`
                        }
                    ]
                }
            }, function(err, res, html) {
                if(err) console.log(err);
                console.log(html);
            });
    

            return true;
        } catch (e) {
            Cache.del(phoneNumber);
            throw e;
        };
      },
    },
  };
  