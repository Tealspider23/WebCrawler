// rateLimiter.js

class RateLimiter {
    constructor(maxConcurrentRequests, delayBetweenRequests) {
      this.maxConcurrentRequests = maxConcurrentRequests;
      this.delayBetweenRequests = delayBetweenRequests;
      this.activeRequests = 0;
      this.queue = [];
    }
  
    async acquire() {
      if (this.activeRequests < this.maxConcurrentRequests) {
        this.activeRequests++;
      } else {
        await new Promise(resolve => this.queue.push(resolve));
      }
    }
  
    release() {
      this.activeRequests--;
  
      if (this.queue.length > 0) {
        const nextRequest = this.queue.shift();
        nextRequest();
      }
    }
  
    async limit(func) {
      await this.acquire();
      
      try {
        await func();
      } finally {
        setTimeout(() => this.release(), this.delayBetweenRequests);
      }
    }
  }
  
  module.exports = RateLimiter;
  