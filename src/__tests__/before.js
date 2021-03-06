'use strict';

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (initializers) initializers[key] = descriptor.initializer; } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

jest.autoMockOff();
var before = require('../before');

describe('before', function () {

    it('works with class', function () {
        var A = (function () {
            function A() {
                _classCallCheck(this, _A);

                this.fooCount = 0;
                this.barCount = 0;
            }

            _createClass(A, [{
                key: 'foo',
                value: function foo(a, b) {
                    this.fooCount++;
                    return a + b;
                }
            }, {
                key: 'bar',
                value: function bar(a, b) {
                    this.barCount++;
                    return a * b;
                }
            }]);

            var _A = A;
            A = before(3)(A) || A;
            return A;
        })();

        var a = new A();

        expect(a.foo(1, 2)).toBe(3);
        expect(a.foo(1, 2)).toBe(3);
        expect(a.fooCount).toBe(2);
        expect(a.foo(1, 2)).toBe(null);
        expect(a.fooCount).toBe(2);

        expect(a.bar(1, 2)).toBe(2);
        expect(a.bar(1, 2)).toBe(2);
        expect(a.barCount).toBe(2);
        expect(a.bar(1, 2)).toBe(null);
        expect(a.barCount).toBe(2);
    });

    it('works with method', function () {
        var A = (function () {
            function A() {
                _classCallCheck(this, A);

                this.fooCount = 0;
            }

            _createDecoratedClass(A, [{
                key: 'foo',
                decorators: [before(3)],
                value: function foo(a, b) {
                    this.fooCount++;
                    return a + b;
                }
            }]);

            return A;
        })();

        var a = new A();
        var a2 = new A();

        expect(a.foo(1, 2)).toBe(3);
        expect(a.foo(1, 2)).toBe(3);
        expect(a.fooCount).toBe(2);
        expect(a.foo(1, 2)).toBe(null);
        expect(a.fooCount).toBe(2);

        expect(a2.foo(1, 2)).toBe(3);
        expect(a2.foo(1, 2)).toBe(3);
        expect(a2.fooCount).toBe(2);
        expect(a2.foo(1, 2)).toBe(null);
        expect(a2.fooCount).toBe(2);
    });
});

//# sourceMappingURL=before.js.map