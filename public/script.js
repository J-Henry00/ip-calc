// user input
const ipAddress = document.querySelector('input#ip-address');
const subnetMask = document.querySelector('input#subnet-mask');
const submitBtn = document.querySelector('button#calculate');

// decimal outputs
const networkDecimal = document.querySelector('span#network-decimal');
const broadcastDecimal = document.querySelector('span#broadcast-decimal');
const firstHostDecimal = document.querySelector('span#first-host-decimal');
const lastHostDecimal = document.querySelector('span#last-host-decimal');
const wildcardDecimal = document.querySelector('span#wildcard-decimal');
const hostsDecimal = document.querySelector('span#hosts-decimal');
const subnetLength = document.querySelector('span#subnet-length');

// binary outputs
const networkBinary = document.querySelector('span#network-binary');
const broadcastBinary = document.querySelector('span#broadcast-binary');
const firstHostBinary = document.querySelector('span#first-host-binary');
const lastHostBinary = document.querySelector('span#last-host-binary');
const wildcardBinary = document.querySelector('span#wildcard-binary');
const hostsBinary = document.querySelector('span#hosts-binary');

// hexadecimal outputs
const networkHex = document.querySelector('span#network-hex');
const broadcastHex = document.querySelector('span#broadcast-hex');
const firstHostHex = document.querySelector('span#first-host-hex');
const lastHostHex = document.querySelector('span#last-host-hex');
const wildcardHex = document.querySelector('span#wildcard-hex');
const hostsHex = document.querySelector('span#hosts-hex');

submitBtn.addEventListener('click', getData);
getData();

function getData() {

    if (!ipAddress.value || !subnetMask.value) {
        networkDecimal.textContent = '-';
        broadcastDecimal.textContent = '-';
        firstHostDecimal.textContent = '-';
        lastHostDecimal.textContent = '-';
        wildcardDecimal.textContent = '-';
        hostsDecimal.textContent = '-';
        subnetLength.textContent = '-';
        
        networkBinary.textContent = '-';
        broadcastBinary.textContent = '-';
        firstHostBinary.textContent = '-';
        lastHostBinary.textContent = '-';
        wildcardBinary.textContent = '-';
        hostsBinary.textContent = '-';

        networkHex.textContent = '-';
        broadcastHex.textContent = '-';
        firstHostHex.textContent = '-';
        lastHostHex.textContent = '-';
        wildcardHex.textContent = '-';
        hostsHex.textContent = '-';
        alert('Je potreba zadat IP adresu a Subnet Mask');
        return;
    }

    fetch('/api/getData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ipAddress: ipAddress.value,
            subnetMask: subnetMask.value
        })
    })
    .then(response => response.json())
    .then(data => {

        if (data.error) {
            alert('Chyba pri zpracovani\n\n'+data.error);
            return;
        }

        // Decimal outputs
        networkDecimal.textContent = data.decimal.networkAddress;
        broadcastDecimal.textContent = data.decimal.broadcasAddress;
        firstHostDecimal.textContent = data.decimal.firstHost;
        lastHostDecimal.textContent = data.decimal.lastHost;
        wildcardDecimal.textContent = data.decimal.wildcardMask;
        hostsDecimal.textContent = data.decimal.numHosts;
        subnetLength.textContent = data.decimal.subnetMaskLength;

        // Binary outputs
        networkBinary.textContent = data.binary.networkAddress;
        broadcastBinary.textContent = data.binary.broadcasAddress;
        firstHostBinary.textContent = data.binary.firstHost;
        lastHostBinary.textContent = data.binary.lastHost;
        wildcardBinary.textContent = data.binary.wildcardMask;
        hostsBinary.textContent = data.binary.numHosts;

        // Hexadecimal outputs
        networkHex.textContent = data.hexadecimal.networkAddress;
        broadcastHex.textContent = data.hexadecimal.broadcasAddress;
        firstHostHex.textContent = data.hexadecimal.firstHost;
        lastHostHex.textContent = data.hexadecimal.lastHost;
        wildcardHex.textContent = data.hexadecimal.wildcardMask;
        hostsHex.textContent = data.hexadecimal.numHosts;
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error loading outputs. Check the console');
    });
}