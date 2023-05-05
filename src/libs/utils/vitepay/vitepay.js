import { SHA1 } from "crypto-js";
import { Config } from "./config"

class Vitepay {
    website_url = Config.WEBSITE_URL;
    return_url = Config.RETURN_URL;
    website_description = Config.WEBSITE_DESCRIPTION;
    local = Config.DEFAULT_LOCAL;
    currency = Config.DEFAULT_CURRENCY;
    country = Config.DEFAULT_COUNTRY;
    payment_type = Config.PAYMENT_TYPE;
    api_version = Config.API_VERSION;
    key = Config.API_KEY;
    secret = Config.API_SECRET_KEY;
    env = Config.ENV;

    constructor() { }

    buildQueryString(params) {
        var queryString = "";
        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                if (queryString.length > 0) {
                    queryString += "&";
                }
                queryString += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
            }
        }
        return queryString;
    }

    async post_data(order_id, price) {
        var order_id = order_id;
        var amount_100 = price * 100
        var currency_code = this.currency
        var api_secret = this.secret
        var callback_url = this.website_url
        let string = `${order_id};${amount_100};${currency_code};${callback_url};${api_secret}`;
        var upped = string.toUpperCase();
        const hash = SHA1(upped);

        var ob = {
            'api_key': this.key,
            'hash': hash,
            'api_version': this.api_version,
            'payment[language_code]': this.local, // fr
            'payment[currency_code]': this.currency, // XOF
            'payment[country_code]': this.country, // ML
            'payment[order_id]': order_id,
            'payment[description]': this.website_description,
            'payment[amount_100]': amount_100,
            // 'payment[buyer_ip_adress]': $_SERVER['REMOTE_ADDR'],

            // URL called if process was OK
            'payment[return_url]': this.return_url,
            // URL called when payment's failed
            'payment[decline_url]': this.return_url,
            // URL called when User's hit cancel
            "payment[cancel_url]": this.return_url,
            // URL for server - 2 - server call
            'payment[callback_url]': this.website_url,
            'payment[email]': '',
            'payment[p_type]': this.payment_type
        }
        var payload = this.buildQueryString(ob)


        const environmentUrl = this.env === 'sandbox' ? 'https://api.vitepay.com/v1/sandbox/payments' : 'https://api.vitepay.com/v1/prod/payments';

        const options = {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': '*', },
            body: payload
        };

        return fetch(environmentUrl, options)
            .then(response => response.text())
            .then(link => { return link; })
            .catch(error => console.error(error));

    }
}

export default Vitepay