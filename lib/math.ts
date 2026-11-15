export function divisor(x: number) { if (x < 2) return 1; if (x % 2 === 0) return x === 2 ? 0 : 2; for (let d=3; d*d<=x; d+=2) if(x%d===0) return d; return 0; }
export function runTest(start: number, end: number) {
 if (!Number.isSafeInteger(start)||!Number.isSafeInteger(end)||start<1||end<start||end>1000000||end-start>9999) throw new Error('Bitte einen Bereich mit höchstens 10.000 n-Werten zwischen 1 und 1.000.000 eingeben.');
 let minus=0, plus=0, twins=0; const sample=[];
 for(let n=start;n<=end;n++){const a=6*n-1,b=6*n+1, da=divisor(a),db=divisor(b); if(!da)minus++;if(!db)plus++;if(!da&&!db)twins++;if(sample.length<100)sample.push({n,a,b,da,db});}
 return {start,end,count:end-start+1,minus,plus,twins,failures:2*(end-start+1)-minus-plus,sample,method:'Exakte Probedivision bis zur Quadratwurzel'};
}
