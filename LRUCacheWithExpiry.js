console.log('LRU with expiry...');

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity || 1;
    this.cache = new Map();
  }

  get(key) {
    if (this.cache.has(key) && !this.isExpired(this.cache.get(key).expiry)) {
      return this.cache.get(key).value;
    }
    return -1;
  }
  isExpired(expiration) {
    let now = Date.now();
    if (now >= expiration) {
      return true;
    }
    return false;
  }
  set(key, value, expiry) {
    if (this.cache.size < this.capacity) {
      this.cache.set(key, { value: value, expiry: expiry });
    } else {
      // Eviction logic
      console.log('Evict', this.cache);
      let min = Infinity;
      let minKey;
      for (let [key, item] of this.cache) {
        if (item.expiry < min) {
          min = item.expiry;
          minKey = key;
        }
      }
      this.cache.delete(minKey);
      this.cache.set(key, { value: value, expiry: expiry });
    }
  }

  getCache() {
    return this.cache;
  }
}

let cache = new LRUCache(4);

// check get value

console.log(cache.get(1));

const hour = 1 * 60 * 60 * 1000;
const min = 60 * 1000;
cache.set(1, 1, Date.now() + 1 * min);
cache.set(2, 2, Date.now() + 2 * min);
cache.set(0.5, 0.5, Date.now() + 0.5 * min);
cache.set(3, 3, Date.now() + 3 * min);
cache.set(0.75, 0.75, Date.now() + 0.75 * min);
cache.set(4, 4, Date.now() + 4 * min);
cache.set(0.25, 0.25, Date.now() + 0.25 * min);
cache.set(5, 5, Date.now() + 5 * min);

console.log(cache.get(1));

// Check empty map
console.log(cache.getCache());

console.log(cache.get(2));
