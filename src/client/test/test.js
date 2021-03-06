/*!
 * OS.js - JavaScript Cloud/Web Desktop Platform
 *
 * Copyright (c) 2011-2016, Anders Evenrud <andersevenrud@gmail.com>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * @author  Anders Evenrud <andersevenrud@gmail.com>
 * @licence Simplified BSD License
 */
(function(expect) {
  'use strict';

  ///////////////////////////////////////////////////////////////////////////////
  // 'Ia! Ia! Cthulhu Fhtagn!
  ///////////////////////////////////////////////////////////////////////////////

  var testString = "Ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn";

  ///////////////////////////////////////////////////////////////////////////////
  // CONFIG
  ///////////////////////////////////////////////////////////////////////////////

  var run = {
    utils: true,
    vfs: true,
    api: true,
    misc: true
  };

  ///////////////////////////////////////////////////////////////////////////////
  // UTILS
  ///////////////////////////////////////////////////////////////////////////////

  if ( run.utils ) {
    describe('Utils', function() {

      // -- misc.js

      describe('format()', function() {
        it('should return correct string', function() {
          var res = OSjs.Utils.format('foo {0} {1}', 'bar', 'baz');
          expect(res).to.be.equal('foo bar baz');
        });
      });

      describe('cleanHTML()', function() {
        it('should return correct string', function() {
          var res = OSjs.Utils.cleanHTML('<b>\n  \n \nfoo</b>');
          expect(res).to.be.equal('<b>   foo</b>');
        });
      });

      describe('parseurl()', function() {
        it('should return correct location', function() {
          var res = OSjs.Utils.parseurl('http://domain.tld/foo/bar#baz');

          expect(res.protocol).to.be.equal('http');
          expect(res.host).to.be.equal('domain.tld');
          expect(res.path).to.be.equal('/foo/bar#baz');
        });
      });

      describe('argumentDefaults()', function() {
        it('should return dict', function() {
          var res = OSjs.Utils.argumentDefaults({
            foo: 'bar',
            koo: null
          }, {
            koo: 'coo'
          });

          expect(res.foo).to.be.equal('bar');
          expect(res.koo).to.be.equal('coo');
        });
      });

      describe('mergeObject()', function() {
        it('should return merged object', function() {
          var res = OSjs.Utils.mergeObject({
            foo: 'bar'
          }, {
            koo: 'coo'
          });

          expect(res.foo).to.be.equal('bar');
          expect(res.koo).to.be.equal('coo');
        });
      });

      describe('cloneObject()', function() {
        it('should return merged object', function() {
          var res = OSjs.Utils.cloneObject({
            foo: 'bar'
          });

          expect(res.foo).to.be.equal('bar');
        });
      });

      describe('fixJSON()', function() {
        it('should return JSON object', function() {
          var res = OSjs.Utils.fixJSON('{"foo":"bar"}');
          expect(res.foo).to.be.equal('bar');
        });
      });

      describe('convertToRGB()', function() {
        it('should return RGB object', function() {
          var res = OSjs.Utils.convertToRGB('#000000');
          expect(res.r).to.be.equal(0);
          expect(res.g).to.be.equal(0);
          expect(res.b).to.be.equal(0);
        });
      });

      describe('convertToHEX()', function() {
        it('should return HEX string', function() {
          var res = OSjs.Utils.convertToHEX(0, 0, 0);
          expect(res).to.be.equal('#000000');
        });
      });

      describe('invertHEX()', function() {
        it('should return HEX string', function() {
          var res = OSjs.Utils.invertHEX('#000000');
          expect(res).to.be.equal('#ffffff');
        });
      });

      /**
      describe('asyncs()', function() {
        // TODO
      });
      **/

      // -- dom.js

      describe('$()', function() {
        it('should return element', function() {
          var res = OSjs.Utils.$('mocha');
          expect(res).to.not.be.null;
        });
      });

      describe('$safeName()', function() {
        it('should return safe string', function() {
          var res = OSjs.Utils.$safeName('anders!evenrud');
          expect(res).to.be.equal('anders_evenrud');
        });
      });

      describe('$remove()', function() {
        it('should remove element', function() {
          var tmp = document.createElement('div');
          tmp.id = 'tmp';
          document.body.appendChild(tmp);
          OSjs.Utils.$remove(tmp);

          expect(document.getElementById('tmp')).to.be.null;
        });
      });

      describe('$empty()', function() {
        it('should empty element', function() {
          var tmp = document.createElement('div');
          tmp.appendChild(document.createElement('div'));
          OSjs.Utils.$empty(tmp);
          expect(tmp.children.length).to.be.equal(0);
        });
      });

      describe('$getStyle()', function() {
        it('should return correct value', function() {
          var res = OSjs.Utils.$getStyle(document.body, 'background-color');
          expect(res).to.be.oneOf(['#ffffff', 'rgb(255, 255, 255)']);
        });
      });

      describe('$position()', function() {
        it('should get element position', function() {
          var tmp = document.createElement('div');
          tmp.style.position = 'absolute';
          tmp.style.top = '10px';
          tmp.style.left = '10px';
          document.body.appendChild(tmp);

          var pos = OSjs.Utils.$position(tmp);
          OSjs.Utils.$remove(tmp);

          expect(pos.left).to.be.equal(10);
          expect(pos.top).to.be.equal(10);
        });
      });

      describe('$index()', function() {
        it('should element index', function() {
          var pos = OSjs.Utils.$index(document.body.children[0]);
          expect(pos).to.be.equal(0);

          pos = OSjs.Utils.$index(document.body.children[1]);
          expect(pos).to.be.equal(1);

          pos = OSjs.Utils.$index(null);
          expect(pos).to.be.equal(-1);
        });
      });

      describe('$addClass()', function() {
        it('should add class to element', function() {
          var tmp = document.createElement('div');
          tmp.className = 'foo';
          document.body.appendChild(tmp);

          OSjs.Utils.$addClass(tmp, 'bar');
          OSjs.Utils.$remove(tmp);

          expect(tmp.className).to.be.equal('foo bar');
        });
      });

      describe('$removeClass()', function() {
        it('should remove class from element', function() {
          var tmp = document.createElement('div');
          tmp.className = 'foo bar';
          document.body.appendChild(tmp);

          OSjs.Utils.$removeClass(tmp, 'bar');
          OSjs.Utils.$remove(tmp);

          expect(tmp.className).to.be.equal('foo');
        });
      });

      describe('$hasClass()', function() {
        it('should remove class from element', function() {
          var tmp = document.createElement('div');
          tmp.className = 'foo bar';
          document.body.appendChild(tmp);
          OSjs.Utils.$remove(tmp);

          expect(OSjs.Utils.$hasClass(tmp, 'foo')).to.be.equal(true);
          expect(OSjs.Utils.$hasClass(tmp, 'bar')).to.be.equal(true);
        });
      });


      // -- xhr.js

      describe('ajax', function() {
        // TODO
      });

      describe('preload', function() {
        // TODO
      });

      // -- fs.js

      describe('checkdir()', function() {
        it('should return identical dir', function() {
          var res = OSjs.Utils.checkdir('home:///foo.bar');
          expect(res).to.be.equal('home:///foo.bar');
        });
      });

      describe('filext()', function() {
        it('should return file extension', function() {
          var res = OSjs.Utils.filext('home:///foo.bar');
          expect(res).to.be.equal('bar');
        });
      });

      describe('filename()', function() {
        it('should return filename (1)', function() {
          var res = OSjs.Utils.filename('home:///foo/bar.baz');
          expect(res).to.be.equal('bar.baz');
        });
        it('should return filename (2)', function() {
          var res = OSjs.Utils.filename('home:///foo/bar');
          expect(res).to.be.equal('bar');
        });
        it('should not return filename', function() {
          var res = OSjs.Utils.filename('home:///');
          expect(res).to.be.equal('');
        });
      });

      describe('dirname()', function() {
        it('should return parent (1)', function() {
          var res = OSjs.Utils.dirname('home:///');
          expect(res).to.be.equal('home:///');
        });
        it('should return parent (2)', function() {
          var res = OSjs.Utils.dirname('home:///foo/bar/baz');
          expect(res).to.be.equal('home:///foo/bar');
        });
        it('should return parent (3)', function() {
          var res = OSjs.Utils.dirname('home:///foo/bar');
          expect(res).to.be.equal('home:///foo');
        });
        it('should return parent (4)', function() {
          var res = OSjs.Utils.dirname('/');
          expect(res).to.be.equal('/');
        });
      });

      describe('humanFileSize', function() {
        it('should return bytes', function() {
          var res = OSjs.Utils.humanFileSize(0);
          expect(res).to.be.equal('0 B');
        });
        it('should return megabytes', function() {
          var res = OSjs.Utils.humanFileSize(1024 * 1024, true);
          expect(res).to.be.equal('1.0 MB');
        });
        it('should return megabits', function() {
          var res = OSjs.Utils.humanFileSize(2000 * 1024);
          expect(res).to.be.equal('2.0 MiB');
        });
      });

      describe('replaceFileExtension()', function() {
        it('should swap file extension', function() {
          var res = OSjs.Utils.replaceFileExtension('home:///foo.bar', 'baz');
          expect(res).to.be.equal('home:///foo.baz');
        });
      });

      describe('replaceFilename()', function() {
        it('should swap file name', function() {
          var res = OSjs.Utils.replaceFilename('home:///foo.bar', 'koo.coo');
          expect(res).to.be.equal('home:///koo.coo');
        });
      });

      describe('getFilenameRange()', function() {
        it('should return correct range', function() {
          var res = OSjs.Utils.getFilenameRange('home:///foo.bar');
          expect(res.min).to.be.equal(0);
          expect(res.max).to.be.equal(11);
        });
      });

      describe('pathJoin', function() {
        it('should return corrent path (1)', function() {
          var res = OSjs.Utils.pathJoin('foo', 'bar');
          expect(res).to.be.equal('/foo/bar');
        });
        it('should return corrent path (2)', function() {
          var res = OSjs.Utils.pathJoin('home://', 'foo', 'bar');
          expect(res).to.be.equal('home:///foo/bar');
        });
        it('should return corrent path (3)', function() {
          var res = OSjs.Utils.pathJoin('home://', 'foo', 'bar', '..', '.');
          expect(res).to.be.equal('home:///foo/bar');
        });
        it('should return corrent path (4)', function() {
          var res = OSjs.Utils.pathJoin('home:///../', 'foo', 'bar');
          expect(res).to.be.equal('home:///foo/bar');
        });
      });

    });
  }

  ///////////////////////////////////////////////////////////////////////////////
  // VFS
  ///////////////////////////////////////////////////////////////////////////////

  if ( run.vfs ) {
    describe('VFS', function() {

      describe('File', function() {
        it('should validate File object (1)', function() {
          var f = new OSjs.VFS.File('home:///foo');

          expect(f.filename).to.be.equal('foo');
          expect(f.path).to.be.equal('home:///foo');
          expect(f.mime).to.be.null;
        });
        it('should validate File object (2)', function() {
          var f = new OSjs.VFS.File('home:///foo', 'some/mime');

          expect(f.filename).to.be.equal('foo');
          expect(f.path).to.be.equal('home:///foo');
          expect(f.mime).to.be.equal('some/mime');
        });
        it('should validate File object (3)', function() {
          var f = new OSjs.VFS.File({
            path: 'home:///foo',
            filename: 'foo',
            size: 666,
            mime: 'some/mime'
          });

          expect(f.filename).to.be.equal('foo');
          expect(f.path).to.be.equal('home:///foo');
          expect(f.size).to.be.equal(666);
          expect(f.mime).to.be.equal('some/mime');
        });
      });

      describe('mkdir()', function() {
        describe('#exception', function() {
          it('should throw error', function() {
            var error;
            try {
              OSjs.VFS.mkdir('invalid:///foo', function(err, res) {});
            } catch ( e ) {
              error = e;
            }
            expect(error).to.be.an.instanceof(Error);
          });
        });

        describe('#failure', function() {
          it('should not be created', function(done) {
            OSjs.VFS.mkdir('osjs:///mocha-error', function(err, res) {
              expect(err).to.not.be.oneOf([false, null, '']);
              done();
            });
          });
        });

        describe('#success', function() {
          it('should be created', function(done) {
            OSjs.VFS.mkdir('home:///mocha-dir', function(err, res) {
              expect(res).to.be.equal(true);
              done();
            });
          });
        });
      });

      describe('write()', function() {
        describe('#exception', function() {
          it('should throw error', function() {
            var error;
            try {
              OSjs.VFS.write('invalid:///foo', testString, function(err, res) {});
            } catch ( e ) {
              error = e;
            }
            expect(error).to.be.an.instanceof(Error);
          });
        });

        describe('#failure', function() {
          it('should not be written', function(done) {
            OSjs.VFS.write('osjs:///mocha-error', testString, function(err, res) {
              expect(err).to.not.be.oneOf([false, null, '']);
              done();
            });
          });
        });

        describe('#success', function() {
          it('should be written', function(done) {
            OSjs.VFS.write('home:///mocha-file', testString, function(err, res) {
              expect(res).to.be.equal(true);
              done();
            });
          });
        });
      });

      describe('read()', function() {
        describe('#exception', function() {
          it('should throw error', function() {
            var error;
            try {
              OSjs.VFS.read('invalid:///foo', function(err, res) {});
            } catch ( e ) {
              error = e;
            }
            expect(error).to.be.an.instanceof(Error);
          });
        });

        describe('#failure', function() {
          it('should fail to read', function(done) {
            OSjs.VFS.read('osjs:///mocha-error', function(err, res) {
              expect(err).to.not.be.oneOf([false, null, '']);
              done();
            });
          });
        });

        describe('#success', function() {
          it('should read', function(done) {
            OSjs.VFS.read('home:///mocha-file', function(err, res) {
              expect(res).to.be.equal(testString);
              done();
            }, {type: 'text'});
          });
        });
      });

      describe('exists()', function() {
        describe('#exception', function() {
          it('should throw error', function() {
            var error;
            try {
              OSjs.VFS.exists('invalid:///foo', function(err, res) {});
            } catch ( e ) {
              error = e;
            }
            expect(error).to.be.an.instanceof(Error);
          });
        });

        describe('#directories', function() {
          describe('#failure', function() {
            it('should not exist', function(done) {
              OSjs.VFS.exists('home:///mocha-error', function(err, res) {
                expect(res).to.be.equal(false);
                done();
              });
            });
          });

          describe('#success', function() {
            it('should exist', function(done) {
              OSjs.VFS.exists('home:///mocha-dir', function(err, res) {
                expect(res).to.be.equal(true);
                done();
              });
            });
          });
        });

        describe('#files', function() {
          describe('#failure', function() {
            it('should not exist', function(done) {
              OSjs.VFS.exists('home:///mocha-error', function(err, res) {
                expect(res).to.be.equal(false);
                done();
              });
            });
          });

          describe('#success', function() {
            it('should exist', function(done) {
              OSjs.VFS.exists('home:///mocha-file', function(err, res) {
                expect(res).to.be.equal(true);
                done();
              });
            });
          });
        });
      });

      describe('fileinfo()', function() {
        describe('#exception', function() {
          it('should throw error', function() {
            var error;
            try {
              OSjs.VFS.fileinfo('invalid:///foo', function(err, res) {});
            } catch ( e ) {
              error = e;
            }
            expect(error).to.be.an.instanceof(Error);
          });
        });

        describe('#failure', function() {
          it('should not have info', function(done) {
            OSjs.VFS.fileinfo('osjs:///mocha-error', function(err, res) {
              expect(err).to.not.be.oneOf([false, null, '']);
              done();
            });
          });
        });

        describe('#success', function() {
          it('should have info', function(done) {
            OSjs.VFS.fileinfo('home:///mocha-file', function(err, res) {
              expect(res.path).to.be.equal('home:///mocha-file');
              expect(res.size).to.be.equal(50);
              done();
            });
          });
        });
      });

      describe('url()', function() {
        describe('#exception', function() {
          it('should throw error', function() {
            var error;
            try {
              OSjs.VFS.url('invalid:///foo', function(err, res) {});
            } catch ( e ) {
              error = e;
            }
            expect(error).to.be.an.instanceof(Error);
          });
        });

        describe('#failure', function() {
          it('should not have URL', function(done) {
            OSjs.VFS.url('osjs:///mocha-error', function(err, res) {
              expect(err).to.not.be.oneOf([false, null, '']);
              done();
            });
          });
        });

        describe('#success', function() {
          it('should have URL', function(done) {
            OSjs.VFS.url('home:///mocha-file', function(err, res) {
              expect(res).to.be.equal('FS/get/home:///mocha-file');
              done();
            });
          });
        });
      });

      describe('download()', function() {
        // TODO
      });

      describe('copy()', function() {
        // TODO: Copy between mounts

        describe('#exception', function() {
          it('should throw error', function() {
            var error;
            try {
              OSjs.VFS.copy('invalid:///foo', 'invalid:///bar', function(err, res) {});
            } catch ( e ) {
              error = e;
            }
            expect(error).to.be.an.instanceof(Error);
          });
        });

        describe('#directories', function() {
          describe('#failure', function() {
            it('directory should not be copied', function(done) {
              OSjs.VFS.copy('home:///mocha-error', 'home:///mocha-dir-copy', function(err, res) {
                expect(err).to.not.be.oneOf([false, null, '']);
                done();
              });
            });
          });

          describe('#success', function() {
            it('directory should be copied', function(done) {
              OSjs.VFS.copy('home:///mocha-dir', 'home:///mocha-dir-copy', function(err, res) {
                expect(res).to.be.equal(true);
                done();
              });
            });
          });
        });

        describe('#files', function() {
          describe('#failure', function() {
            it('file should not be copied', function(done) {
              OSjs.VFS.copy('home:///mocha-error', 'home:///mocha-file-copy', function(err, res) {
                expect(err).to.not.be.oneOf([false, null, '']);
                done();
              });
            });
          });

          describe('#success', function() {
            it('file should be copied', function(done) {
              OSjs.VFS.copy('home:///mocha-file', 'home:///mocha-file-copy', function(err, res) {
                expect(res).to.be.equal(true);
                done();
              });
            });
          });
        });
      });

      describe('move()', function() {
        // TODO: Move between mounts

        describe('#exception', function() {
          it('should throw error', function() {
            var error;
            try {
              OSjs.VFS.move('invalid:///foo', 'invalid:///bar', function(err, res) {});
            } catch ( e ) {
              error = e;
            }
            expect(error).to.be.an.instanceof(Error);
          });
        });

        describe('#directories', function() {
          describe('#failure', function() {
            it('directory should not be moved', function(done) {
              OSjs.VFS.move('home:///mocha-error', 'home:///mocha-dir-moved', function(err, res) {
                expect(err).to.not.be.oneOf([false, null, '']);
                done();
              });
            });
          });

          describe('#success', function() {
            it('directory should be moved', function(done) {
              OSjs.VFS.move('home:///mocha-dir', 'home:///mocha-dir-moved', function(err, res) {
                expect(res).to.be.equal(true);
                done();
              });
            });
          });
        });

        describe('#files', function() {
          describe('#failure', function() {
            it('file should not be moved', function(done) {
              OSjs.VFS.move('home:///mocha-error', 'home:///mocha-file-moved', function(err, res) {
                expect(err).to.not.be.oneOf([false, null, '']);
                done();
              });
            });
          });

          describe('#success', function() {
            it('file should be moved', function(done) {
              OSjs.VFS.move('home:///mocha-file', 'home:///mocha-file-moved', function(err, res) {
                expect(res).to.be.equal(true);
                done();
              });
            });
          });
        });
      });

      describe('find()', function() {
        // TODO
      });

      describe('scandir()', function() {
        // TODO
      });

      describe('unlink()', function() {
        describe('#exception', function() {
          it('should throw error', function() {
            var error;
            try {
              OSjs.VFS.unlink('invalid:///foo', function(err, res) {});
            } catch ( e ) {
              error = e;
            }
            expect(error).to.be.an.instanceof(Error);
          });
        });

        describe('#directories', function() {
          describe('#failure', function() {
            it('should not be removed', function(done) {
              OSjs.VFS.unlink('osjs:///mocha-error', function(err, res) {
                expect(err).to.not.be.oneOf([false, null, '']);
                done();
              });
            });
          });

          describe('#success', function() {
            it('should be removed', function(done) {
              OSjs.VFS.unlink('home:///mocha-dir-moved', function(err, res) {
                expect(res).to.be.equal(true);
                done();
              });
            });
          });

          describe('#success', function() {
            it('should be removed', function(done) {
              OSjs.VFS.unlink('home:///mocha-dir-copy', function(err, res) {
                expect(res).to.be.equal(true);
                done();
              });
            });
          });
        });

        describe('#files', function() {
          describe('#failure', function() {
            it('should not be removed', function(done) {
              OSjs.VFS.unlink('osjs:///mocha-error', function(err, res) {
                expect(err).to.not.be.oneOf([false, null, '']);
                done();
              });
            });
          });

          describe('#success', function() {
            it('should be removed', function(done) {
              OSjs.VFS.unlink('home:///mocha-file-moved', function(err, res) {
                expect(res).to.be.equal(true);
                done();
              });
            });
          });

          describe('#success', function() {
            it('should be removed', function(done) {
              OSjs.VFS.unlink('home:///mocha-file-copy', function(err, res) {
                expect(res).to.be.equal(true);
                done();
              });
            });
          });

        });
      });

      describe('upload()', function() {
        // TODO
      });

      describe('trash()', function() {
        // TODO: NOT AVAILABLE
      });

      describe('untrash()', function() {
        // TODO: NOT AVAILABLE
      });

      describe('emptyTrash()', function() {
        // TODO: NOT AVAILABLE
      });

      describe('freeSpace()', function() {
        describe('#exception', function() {
          it('should throw error', function() {
            var error;
            try {
              OSjs.VFS.freeSpace('invalid:///foo', function(err, res) {});
            } catch ( e ) {
              error = e;
            }
            expect(error).to.be.an.instanceof(Error);
          });
        });

        describe('#failure', function() {
          it('should fail to get space', function(done) {
            OSjs.VFS.freeSpace('osjs:///', function(err, res) {
              expect(err).to.not.be.oneOf([false, null, '']);
              done();
            });
          });
        });

        describe('#success', function() {
          it('should get space', function(done) {
            OSjs.VFS.freeSpace('home:///', function(err, res) {
              expect(res).to.not.be.equal(-1);
              done();
            });
          });
        });
      });

      describe('remoteRead()', function() {
        // TODO
      });

      describe('abToBinaryString()', function() {
        // TODO
      });

      describe('abToDataSource()', function() {
        // TODO
      });

      describe('abToText()', function() {
        // TODO
      });

      describe('textToAb()', function() {
        // TODO
      });

      describe('abToBlob()', function() {
        // TODO
      });

      describe('blobToAb()', function() {
        // TODO
      });

      describe('dataSourceToAb()', function() {
        // TODO
      });

      describe('createMountpoint()', function() {
        // TODO
      });

      describe('removeMountpoint()', function() {
        // TODO
      });
    });
  }

  ///////////////////////////////////////////////////////////////////////////////
  // API
  ///////////////////////////////////////////////////////////////////////////////

  if ( run.api ) {
    describe('API', function() {

      describe('setLocale()', function() {
        it('should return undefined', function() {
          expect(OSjs.API.setLocale('en_EN')).to.be.equal(undefined);
        });
      });

      describe('getLocale()', function() {
        it('should return a string', function() {
          expect(OSjs.API.getLocale()).to.be.equal('en_EN');
        });
      });

      describe('_()', function() {
        it('should return a translated string', function() {
          expect(OSjs.API._('LBL_CANCEL')).to.be.equal('Cancel');
        });
      });

      describe('__()', function() {
        it('should return proper formatted string', function() {
          var list = {};
          list[OSjs.API.getLocale()] = {
            TEST: '{0} bar baz'
          };

          var res = OSjs.API.__(list, 'TEST', 'foo');
          expect(res).to.be.equal('foo bar baz');
        });
      });

      describe('curl()', function() {
        // TODO
      });

      describe('call()', function() {
        // TODO
      });

      describe('open()', function() {
        // TODO
      });

      describe('launch()', function() {
        it('should recieve error on invalid Application', function() {
          OSjs.API.launch('InvalidApplication', null, function(err) {
            expect(error).to.be.an.instanceof(String);
          });
        });

        it('should launch About application', function(done) {
          OSjs.API.launch('ApplicationAbout', {}, function(a) {
            a._on('initedWindow', function() {
              done();
            });
          });
        });
      });

      describe('launchList()', function() {
        // TODO
      });

      describe('relaunch()', function() {
        // TODO
      });

      describe('getApplicationResource()', function() {
        // TODO
      });

      describe('getThemeCSS()', function() {
        // TODO
      });

      describe('getIcon()', function() {
        // TODO
      });

      describe('getFileIcon()', function() {
        // TODO
      });

      describe('getThemeResource()', function() {
        // TODO
      });

      describe('getSound()', function() {
        // TODO
      });

      describe('getConfig()', function() {
        // TODO
      });

      describe('setClipboard()', function() {
        it('should set clipboard data', function() {
          expect(OSjs.API.setClipboard(testString)).to.be.equal(undefined);
        });
      });

      describe('getClipboard()', function() {
        it('should get correct clipboard data', function() {
          expect(OSjs.API.getClipboard()).to.be.equal(testString);
        });
      });

      describe('message()', function() {
        // TODO
      });

      describe('getProcess()', function() {
        it('should get WindowManager', function() {
          expect(OSjs.API.getProcess(0)).to.be.instanceof(OSjs.Core.WindowManager);
        });
        it('should get About Application', function() {
          expect(OSjs.API.getProcess(1)).to.be.instanceof(OSjs.Applications.ApplicationAbout.Class);
        });
      });

      describe('getProcesses()', function() {
        it('should get About Application', function() {
          expect(OSjs.API.getProcesses()[1]).to.be.instanceof(OSjs.Applications.ApplicationAbout.Class);
        });
      });

      describe('kill()', function() {
        it('should kill About Application', function() {
          expect(OSjs.API.kill(1)).to.be.equal(true);
        });
      });
    });
  }

  ///////////////////////////////////////////////////////////////////////////////
  // MISC
  ///////////////////////////////////////////////////////////////////////////////

  if ( run.misc ) {
    describe('Misc', function() {
      describe('EventHandler', function() {
        // TODO
      });

      describe('SettingsManager', function() {
        // TODO
      });

      describe('Date', function() {
        // TODO
      });
    });
  }

})(chai.expect);
