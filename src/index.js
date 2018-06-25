export default function () {
    return {
        noColors:       true,
        startTime:      null,
        afterErrorList: false,
        testCount:      0,
        skipped:        0,

        reportTaskStart (startTime, userAgents, testCount) {
            this.startTime = startTime;
            this.testCount = testCount;

            this.setIndent(1)
                .useWordWrap(true)
                .write('Running tests in:')
                .newline();

            userAgents.forEach(ua => {
                this
                    .write(`- ${ua}`)
                    .newline();
            });
        },

        reportFixtureStart (name) {
            this.setIndent(1)
                .useWordWrap(true);

            if (this.afterErrorList)
                this.afterErrorList = false;
            else
                this.newline();

            this.write(name)
                .newline();
        },

        _renderErrors (errs) {
            this.setIndent(3)
                .useWordWrap(false);

            errs.forEach((err) => {
                this.newline();
                err = this.formatError(err);
                const errorMsg = err.split('Browser')[0];

                this.write(errorMsg.replace(/\s\s+/g, ' '));

            });
        },

        reportTestDone (name, testRunInfo) {
            var hasErr    = !!testRunInfo.errs.length;
            var symbol    = null;

            if (testRunInfo.skipped) {
                this.skipped++;

                symbol = '-';
            }
            else if (hasErr) 
                symbol = 'X';
            else 
                symbol = 'V';

            var title = `${symbol} ${name}`;

            this.setIndent(1)
                .useWordWrap(true);

            if (testRunInfo.unstable)
                title += ' (unstable)';

            if (testRunInfo.screenshotPath)
                title += ` (screenshots: ${testRunInfo.screenshotPath})`;

            this.write(title);

            if (hasErr)
                this._renderErrors(testRunInfo.errs);

            this.afterErrorList = hasErr;

            this.newline();
        },

        _renderWarnings (warnings) {
            this.newline()
                .setIndent(1)
                .write(`Warnings (${warnings.length}):`)
                .newline();

            warnings.forEach(msg => {
                this.setIndent(1)
                    .write(`--`)
                    .newline()
                    .setIndent(2)
                    .write(msg)
                    .newline();
            });
        },

        reportTaskDone (endTime, passed, warnings) {
            var durationMs  = endTime - this.startTime;
            var durationStr = this.moment.duration(durationMs).format('h[h] mm[m] ss[s]');
            var footer      = passed === this.testCount ?
                              `${this.testCount} passed` :
                              `${this.testCount - passed}/${this.testCount} failed`;

            footer += ` (${durationStr})`;

            if (!this.afterErrorList)
                this.newline();

            this.setIndent(1)
                .useWordWrap(true);

            this.newline()
                .write(footer)
                .newline();

            if (this.skipped > 0) {
                this.write(`${this.skipped} skipped`)
                    .newline();
            }

            if (warnings.length)
                this._renderWarnings(warnings);
        }
    };
}
