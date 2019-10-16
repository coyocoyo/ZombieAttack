/*---------------------------
 キー操作割り当て
----------------------------*/

/*

キー 「 a 」 : 開発用チートキー。「 いきなり life = -10 」(機能していなかったが、現在は修正済み。)
キー 「 s 」 : 開発用チートキー。「 スコアに1000加算 」
キー 「 d 」 : 開発用チートキー。「 逆さまオバケ呼び出し 」
キー 「 u 」 : 開発用チートキー。「 逆さまオバケ撃退 」

スペースキー 「 」 : 当たり判定処理。＝自機の射撃。
マウスクリックは「要素の全選択」みたいになって画面が真っ青になることがある。

キー 「 c 」 : 武器変更

キー 「 Enter 」 : ゲームを１からスタート。ゲーム中でも機能する。

画面や敵機が流れる速さ係数
キー 「 1 」 : 0.2 遅い
キー 「 2 」 : 1 普通
キー 「 3 」 : 5 速い (これぐらいがちょうどいい？)

キー 「 8 」 : 使わなくなった。
キー 「 9 」 : 使わなくなった。
キー 「 0 」 : 使わなくなった。

キー 「 x 」
ノーマルゲーム中のヤケクソキー。
拳銃の弾:10000発 (1発撃つと弾数が表示される。)
ショットガンの弾:10000発 (1発撃つと弾数が表示される。)
リロードすると12発・６発になる。

キー 「 z 」
背景・敵機・命中エフェクト・爆発エフェクトのマウス追従をストップする。

キー 「 p 」
敵の拡大を一時停止。ポーズボタンに近い。
もう一度押せば拡大再開。

キー 「 esc 」
キー 「 L 」
キー 「 v 」
逆さまオバケ撃退用

*/

/*-------------------------------------
          グローバルブロック ここから
--------------------------------------*/

// キーボード操作についての jsファイル なので、
// 外部から呼ばれることはないと思う。

/*-------------------------------------
          グローバルブロック ここまで
--------------------------------------*/

/*-------------------------------------
          ローカルブロック ここから
--------------------------------------*/
document.addEventListener('DOMContentLoaded',
  function () {
    'use strict';


    let z_key = 'movable';
    // zキーイベント用関数
    // zキーを押しながらだとスクロールが全部止まる
    // 'movable' or 'locked'

    let num; // キーダウン、キーアップイベントで使ってる

    let l; // 画面上の Life テキスト表示要素格納用
    l = document.querySelector('#life'); // 格納しとく

    let s; // 画面上の Score テキスト表示要素格納用
    s = document.querySelector('#score'); // 格納しとく

    /*-------------------------------------
                 キーダウンイベント
    --------------------------------------*/

    document.addEventListener('keydown', function (e) {

      switch (e.key) {

        case 'a': // 開発用チートキー
          life = -10; // いきなりライフ-10
          break;

        case 's': // 開発用チートキー
          score += 1000; // スコアに1000加算
          levelChecker(); // mouseMove.js の関数
          s.textContent = 'Score : ' + score; // s の要素はローカル変数宣言のところで取得済み。
          break;

        case 'd': // 開発用チートキー
          //trickA_1_Down(); // 逆さまオバケ１登場
          trickA_2_Down(); // 逆さまオバケ２登場
          break;

        case 'u': // 開発用チートキー
          text_esc.style.display = 'none';
          text_l.style.display = 'none';
          text_v.style.display = 'none';
          a1Up(); // 逆さまオバケ１を上に撃退
          a2Up(); // 逆さまオバケ２を上に撃退
          break;

        case ' ': // 空白キー(スペースキー)
          shoot(); // mouseMove.js の関数呼び出し
          break;


        case 'c':
          changeWeapon(); // weapon.js の関数呼び出し
          break;

        case 'x': // ゲーム中のヤケクソキー。リロードすると12発・６発になる。
          handgunBullets = 10000; //1発撃つと弾数が表示される。
          shotShell = 10000; // 1発撃つと弾数が表示される。
          break;

        case 'z':
          if (scrollrate !== 0) {
            num = scrollrate; // 一旦別の変数に記憶させる。 0.2 , 1 , 5 のうちのどの速さでやってるか分からないので。
            scrollrate = 0; // 動かなくする。背景・敵機・爆発画像全部が止まる。
            z_key = 'locked';
            // 戻し処理は keyupイベントで
          }
          break;

        case 'p':

          // functions.js の関数enemySizeup() の一時停止
          if ( enemySizeupStopper === 1 ) {
            enemySizeupStopper = 0;
          } else {
            enemySizeupStopper = 1;
          }
          break;  

        case 'r':
          reload();
          break;

        case 'Enter':

          life = 100;
          l.innerHTML = 'Life : ' + life; // l の要素はローカル変数宣言のところで取得済み。

          score = 0;
          s.textContent = 'Score : ' + score; // s の要素はローカル変数宣言のところで取得済み。

          level = 1;
          lvl.textContent = 'level : ' + level;

          handgunBullets = 12;
          hgMagazines = 100;

          shotShell = 6; // ショットガンの弾
          sShellStock = 30; // ショットガンの予備弾

          weaponSelector = 0; // 0 = 拳銃
          setHandGun(); // weapon.js の関数
          // 主人公(拳銃)、照準(拳銃)の設置、拳銃の弾数、マガジン数のテキスト表示

          //---------------------------------------------------------------------------------------------------
          callTrickA = 0; // 逆さまオバケ出現管理用----------------- 0 ～ 10 あたりとは関係のない値にすると「出現なし」にできる。
          //------------------------------------------------------------------------------------ 100 とか x とか。
          //---------------------------------------------------------------------------------------------------

          setBgimg(); // mouseMove.js の関数 背景設置

          firstE = 0;
          lastE = 2;
          setEnemies();// mouseMove.js の関数
          // 配列０番～１番の敵を500x500フレーム内に呼び出して拡大モードにし、他は待機させておく関数
          enemySizeup(); // function.js の関数。敵機拡大開始
          document.querySelector('#result').textContent = '';
          document.querySelector('.start1').style.display = 'none';
          document.querySelector('.start2').style.display = 'none';
          bgimg.style.display = 'block'; // 要素は setBgimg(); で取得済み。 setBgimg();がこの行より上にあればいい。
          s.style.display = 'block'; // 要素はローカルで取得済み
          lvl.style.display = 'block'; // 要素はローカルで取得済み
          l.style.display = 'block'; // 要素はローカルで取得済み
          Bullets.style.display = 'block'; // 要素は global.js で取得済み
          BulletStock.style.display = 'block'; // 要素は global.js で取得済み
          target.style.display = 'block'; // 関数setTarget();がこの行より上にあれば、 target. の要素は取得されている。
          Player.style.display = 'block'; // 関数setPlayer();がこの行より上にあれば、 Player. の要素は取得されている。
          document.querySelector('.game__wrapper').style.display = 'block';
          document.querySelector('.game__over').style.display = 'none';
          playBgm1(); // audio.js の関数呼び出し
          soundZombieVoive1(); // audio.js の関数呼び出し

          //初期化も合わせて処理しています

          break;

        case '1':
          scrollrate = 0.2;
          break;

        case '2':
          scrollrate = 1;
          break;

        case '3':
          scrollrate = 5;
          break;

        case '8':
          funcFreeA(); // freeSpaceA のテスト関数呼び出し
          break;

        case '9':
          funcFreeB(); // freeSpaceB のテスト関数呼び出し
          break;

        case '0':
          funcFreeC(); // freeSpaceC のテスト関数呼び出し
          break;

        case 'Escape':
          answer_esc(); // 逆さまオバケ撃退チェック
          break;

        case 'l':
          answer_l(); // 逆さまオバケ撃退チェック
          break;

        case 'v':
          answer_v(); // 逆さまオバケ撃退チェック
          break;

      } // switch文の閉じ


    }, false); // 'keydown'イベントの閉じ。


    /*-------------------------------------
                 キーアップイベント
    --------------------------------------*/
    // ポンと押すだけの操作ならキーアップイベントは必要がない。
    // 「 z 」 の押しっぱなしは問題を起こさないのでたいした処理ではない。
    // 矢印キーの押しっぱなし移動 と ジャンプや弾発射のキー操作 が衝突して問題を起こす。
    document.addEventListener('keyup', function (e) {

      switch (e.key) {
        case 'z':

          if (z_key === 'locked') {
            scrollrate = num; // 止めるときに一旦記憶させた値をもどす
            z_key = 'movable'; // 「動く」の意味
          }
          break;
      }

    }, false); // keyupイベントリスナーの閉じ


  }, false); // DOMCon... の閉じ
/*-------------------------------------
          ローカルブロック ここまで
--------------------------------------*/


