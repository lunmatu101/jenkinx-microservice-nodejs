const logger = require("./logger");

const _limit = 5;
const _queue = [];
let _isRunning = false;

class Task {
    enqueue(job) {
        if (!this.isReady()) {
            return "Full queue, please wait";
        }

        _queue.push(job);

        if (!_isRunning) {
            _isRunning = true;
            this.dequeue();
        }

        return "Enqueued!";
    }

    dequeue() {
        if (_queue.length === 0) {
            _isRunning = false;
            return;
        }

        const job = _queue.pop();
        logger.info("Dequeued: " + job.toString());

        setTimeout(() => {
            this.dequeue();
        }, 5000);
    }

    isReady() {
        return _queue.length < _limit;
    }
}

module.exports = new Task();