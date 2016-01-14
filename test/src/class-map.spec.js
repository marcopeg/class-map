import expect from 'expect';
import { ClassMap, createMap } from '../../src/class-map';

describe('ClassMap', () => {

    describe('constructor', () => {

        it('should receive a configuration object', () => {
            var map = new ClassMap({
                foo: true,
                faa: true,
            });
            expect(map.toString()).toBe('foo faa');
        });

        it('should skip false values', () => {
            var map = new ClassMap({
                foo: true,
                faa: false,
            });
            expect(map.toString()).toBe('foo');
        });

        it('should accept a single string argument', () => {
            var map = new ClassMap('foo');
            expect(map.toString()).toBe('foo');
        });

        it('should accept multiple string arguments', () => {
            var map = new ClassMap('foo', 'faa');
            expect(map.toString()).toBe('foo faa');
        });

        it('should accept an array of classes', () => {
            var map = new ClassMap(['foo', 'faa']);
            expect(map.toString()).toBe('foo faa');
        });

    });

    describe('add', () => {

        it('should add a single class as string', () => {
            var map = new ClassMap();
            map.add('foo');
            expect(map.toString()).toBe('foo');
        });

        it('should add many classes as string arguments', () => {
            var map = new ClassMap();
            map.add('foo', 'faa');
            expect(map.toString()).toBe('foo faa');
        });

        it('should add many classes from an array of strings', () => {
            var map = new ClassMap();
            map.add(['foo', 'faa']);
            expect(map.toString()).toBe('foo faa');
        });

        it('should add many classes from many arrays of strings', () => {
            var map = new ClassMap();
            map.add(['foo', 'faa'], ['fii', 'fuu']);
            expect(map.toString()).toBe('foo faa fii fuu');
        });

        it('should apply an map configuration object', () => {
            var map = new ClassMap({
                faa: true,
            });
            map.add({
                foo: true,
                faa: false,
            });
            expect(map.toString()).toBe('foo');
        });

        it('should add many classes from mixed input', () => {
            var map = new ClassMap();
            map.add('foo', ['faa', 'fii'], 'fuu', { fii:false });
            expect(map.toString()).toBe('foo faa fuu');
        });

    });

    describe('remove', () => {

        var map;

        beforeEach(() => {
            map = new ClassMap('foo', 'faa', 'fii', 'fuu');
        });

        it('should remove a single class as string', () => {
            map.remove('foo');
            expect(map.toString()).toBe('faa fii fuu');
        });

        it('should remove multiple string arguments', () => {
            map.remove('foo', 'fii');
            expect(map.toString()).toBe('faa fuu');
        });

        it('should remove classes from an array argument', () => {
            map.remove(['foo', 'fii']);
            expect(map.toString()).toBe('faa fuu');
        });

    });

    describe('toggle', () => {

        var map;

        beforeEach(() => {
            map = new ClassMap({
                foo: true,
                faa: false,
            });
        });

        it('should enable a class', () => {
            map.toggle('faa');
            expect(map.toString()).toBe('foo faa');
        });

        it('should disable a class', () => {
            map.toggle('foo');
            expect(map.toString()).toBe('');
        });

        it('should create a class if non existent', () => {
            map.toggle('fii');
            expect(map.toString()).toBe('foo fii');
        });

        it('should toggle many classes as multiple arguments', () => {
            map.toggle('foo', 'faa');
            expect(map.toString()).toBe('faa');
        });

        it('should toggle many classes as array', () => {
            map.toggle(['foo', 'faa']);
            expect(map.toString()).toBe('faa');
        });

    });

    describe('toString', () => {

        var map;

        beforeEach(() => {
            map = new ClassMap('foo');
        });

        it('should be stringifiable', () => {
            var classes = map.toString();
            expect(classes).toBe('foo');
        });

        it('should handle a prefix', () => {
            var classes = map.toString('aaa-');
            expect(classes).toBe('aaa-foo');
        });

        it('should handle a prefix/postfix configuration', () => {
            var classes = map.toString({
                before: 'aaa-',
                after: '-bbb',
            });
            expect(classes).toBe('aaa-foo-bbb');
        });

        it('should handle a postfix oly', () => {
            var classes = map.toString({
                after: '-bbb',
            });
            expect(classes).toBe('foo-bbb');
        });

        it('should set a prefix', () => {
            map.setPrefix('aaa-');
            expect(map.toString()).toBe('aaa-foo');
        });

        it('should set a suffix', () => {
            map.setSuffix('-bbb');
            expect(map.toString()).toBe('foo-bbb');
        });

        it('should set prefix and suffix', () => {
            map.setPrefix('aaa-');
            map.setSuffix('-bbb');
            expect(map.toString()).toBe('aaa-foo-bbb');
        });

    });

    describe('createMap', () => {

        it('should accept a string parameter', () => {
            var map = createMap('foo');
            expect(map.toString()).toBe('foo');
        });

        it('should accept multiple string parameters', () => {
            var map = createMap('foo', 'faa');
            expect(map.toString()).toBe('foo faa');
        });

    });

});
