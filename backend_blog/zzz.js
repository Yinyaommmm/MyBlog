let now = new Date()
let	tenDaysAgo = new Date( now.getFullYear(), now.getMonth(), now.getDate() - 10);

console.log(now);
console.log(tenDaysAgo);
console.log(now > tenDaysAgo);
console.log(now <= tenDaysAgo);
console.log(now - tenDaysAgo);