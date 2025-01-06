const express = require('express');
const ip = require('ip');

const router = express.Router();

router.post('/getData', (req, res) => {
    const { ipAddress, subnetMask } = req.body;

    if (!ipAddress || !subnetMask) {
        return res.status(400).json({
            error: 400,
            description: 'Chybi potrebne udaje (ipAddress nebo subnetMask)'
        });
    }

    try {
        const cidr = ip.subnet(ipAddress, subnetMask);

        function getClass() {
            const firstOctet = ipAddress.split(".")[0];
            let result;

            if (firstOctet >= 1 && firstOctet <= 126) {
                result = "A";
            } else if (firstOctet >= 128 && firstOctet <= 191) {
                result = "B";
            } else if (firstOctet >= 192 && firstOctet <= 223) {
                result = "C";
            } else if (firstOctet >= 224 && firstOctet <= 239) {
                result = "D";
            } else if (firstOctet >= 240 && firstOctet <= 255) {
                result = "E";
            } else {
                result = "Unknown";
            }

            return result;
        }

        const decimal = {
            ipAddress,
            subnetMask,
            wildcardMask: ip.fromLong(~ip.toLong(subnetMask) >>> 0),
            networkAddress: cidr.networkAddress + ' / ' + cidr.subnetMaskLength,
            broadcasAddress: cidr.broadcastAddress,
            firstHost: ip.fromLong(ip.toLong(cidr.networkAddress) + 1),
            lastHost: ip.fromLong(ip.toLong(cidr.broadcastAddress) - 1),
            numHosts: cidr.numHosts,
            subnetMaskLength: cidr.subnetMaskLength
        };
        let binary = {};
        let hexadecimal = {};

        Object.keys(decimal).forEach(e => {
            if (typeof decimal[e] === 'string' && decimal[e].includes('.')) {
                binary[e] = decimal[e].split('.')
                    .map(num => parseInt(num).toString(2).padStart(8, '0'))
                    .join('.');
            } else if (e == 'networkAddress') {
                binary[e] = cidr.networkAddress.split('.')
                    .map(num => parseInt(num).toString(2).padStart(8, '0'))
                    .join('.');
            } else {
                binary[e] = decimal[e].toString(2);
            }
        });
        
        Object.keys(decimal).forEach(e => {
            if (typeof decimal[e] === 'string' && decimal[e].includes('.')) {
                hexadecimal[e] = decimal[e].split('.')
                    .map(num => parseInt(num).toString(16).padStart(2, '0'))
                    .join('.').toUpperCase();
            } else if (e == 'networkAddress') {
                hexadecimal[e] = cidr.networkAddress.split('.')
                    .map(num => parseInt(num).toString(16).padStart(2, '0'))
                    .join('.').toUpperCase();
            } else {
                hexadecimal[e] = decimal[e].toString(16).toUpperCase();
            }
        });

        return res.json({
            ipAddress,
            class: getClass(),
            decimal,
            binary,
            hexadecimal
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 500,
            error: 'Chyba pri zpracovani IP adresy'
        });
    }
});

module.exports = router;
