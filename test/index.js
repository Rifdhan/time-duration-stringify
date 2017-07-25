const Chai = require("chai");
const should = Chai.should();

const Duration = require("../index");

describe("Duration", function() {
    describe("toStringShort()", () => {
        it("should throw an error when called with no arguments", () => {
            (() => {
                Duration.toStringShort();
            }).should.throw(Error, /not a number/);
        });

        it("should throw an error when argument is not a number", () => {
            (() => {
                Duration.toStringShort("test");
            }).should.throw(Error, /not a number/);
        });

        it("should throw an error when argument is not an integer", () => {
            (() => {
                Duration.toStringShort(12.5);
            }).should.throw(Error, /not an integer/);
        });

        it("should throw an error when argument is not positive", () => {
            (() => {
                Duration.toStringShort(-1);
            }).should.throw(Error, /not positive/);
        });

        it("should correctly break up duration into all supported units", () => {
            Duration.toStringShort(93661001).should.equal("1:02:01:01.001");
        });

        it("should return the expected value for a given input 1", () => {
            Duration.toStringShort(1000).should.equal("0:01");
        });

        it("should return the expected value for a given input 2", () => {
            Duration.toStringShort(60000).should.equal("1:00");
        });

        it("should return the expected value for a given input 3", () => {
            Duration.toStringShort(61000).should.equal("1:01");
        });

        it("should return the expected zero value", () => {
            Duration.toStringShort(0).should.equal("0:00");
        });

        it("should retain zero minutes and seconds", () => {
            Duration.toStringShort(120).should.equal("0:00.120");
        });
    });

    describe("toStringLong()", () => {
        it("should throw an error when called with no arguments", () => {
            (() => {
                Duration.toStringLong();
            }).should.throw(Error, /not a number/);
        });

        it("should throw an error when argument is not a number", () => {
            (() => {
                Duration.toStringLong("test");
            }).should.throw(Error, /not a number/);
        });

        it("should throw an error when argument is not an integer", () => {
            (() => {
                Duration.toStringLong(12.5);
            }).should.throw(Error, /not an integer/);
        });

        it("should throw an error when argument is not positive", () => {
            (() => {
                Duration.toStringLong(-1);
            }).should.throw(Error, /not positive/);
        });

        it("should correctly break up duration into all supported units", () => {
            Duration.toStringLong(93661001)
                .should.equal("1 day, 2 hours, 1 minute, 1 second, and 1 millisecond");
        });

        it("should return the expected value for a given input 1", () => {
            Duration.toStringLong(1000).should.equal("1 second");
        });

        it("should return the expected value for a given input 2", () => {
            Duration.toStringLong(60000).should.equal("1 minute");
        });

        it("should return the expected value for a given input 3", () => {
            Duration.toStringLong(61000).should.equal("1 minute, and 1 second");
        });

        it("should return the expected zero value", () => {
            Duration.toStringLong(0).should.equal("0 seconds");
        });

        it("should omit Oxford comma if requested", () => {
            Duration.toStringLong(61000, true).should.equal("1 minute and 1 second");
        });
    });
});
