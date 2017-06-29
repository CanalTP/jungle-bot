import Navitia from './lib/navitia';

let ws = new Navitia('5c60fc34-e017-4c9e-9744-13515c6436d8');
ws.getFirstPlace('gare').then(results => console.log(results));