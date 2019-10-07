
/*-- .jsファイルの名前を変えた場合は、htmlの下のほうのパスの書き換えだけでOKです。 --*/

/*------------------------------
  グローバルブロック ここから
-------------------------------*/

/* ---- 関数の窓口 ---- */

//let funcFreeA; // keyBoard.js キーボード「8」で呼び出し。

// 外部からの関数を呼び出しを受け止めるために
// 関数の名前だけグローバルで宣言しておく。
// 関数の本体はローカルの中 ↓↓

/* グローバル変数・定数コーナー */
/*---------------------------------------
      複数のjsファイルから参照されたり、
      開発中に微調整される変数
---------------------------------------*/

/*-- 敵機の耐久力 --*/
const eDefaultLife0 = 1; // (ゾンビ)
const eDefaultLife1 = 1; // (ゾンビ)
const eDefaultLife2 = 1; // (女ゾンビ)
const eDefaultLife3 = 2; // (ゴースト)
const eDefaultLife4 = 2; // (ゴースト)
const eDefaultLife5 = 3; // (ピエロ)
const eDefaultLife6 = 3; // (ピエロ)
const eDefaultLife7 = 6; // (ガイコツシスター)
const eDefaultLife8 = 2; // (ゴースト)
const eDefaultLife9 = 2; // (ゴースト)

/*-- 敵機のスピード --*/
const eSpeed0 = 1; // (ゾンビ)
const eSpeed1 = 1; // (ゾンビ)
const eSpeed2 = 3; // (女ゾンビ)
const eSpeed3 = 1; // (ゴースト)
const eSpeed4 = 1; // (ゴースト)
const eSpeed5 = 2; // (ピエロ)
const eSpeed6 = 2; // (ピエロ)
const eSpeed7 = 2; // (ガイコツシスター)
const eSpeed8 = 1; // (ゴースト)
const eSpeed9 = 1; // (ゴースト)

/*-- 敵機の攻撃力 --*/
const eAttack0 = 5; // (ゾンビ)
const eAttack1 = 5; // (ゾンビ)
const eAttack2 = 10; // (女ゾンビ)
const eAttack3 = 5; // (ゴースト)
const eAttack4 = 5; // (ゴースト)
const eAttack5 = 10; // (ピエロ)
const eAttack6 = 10; // (ピエロ)
const eAttack7 = 20; // (ガイコツシスター)
const eAttack8 = 10; // (ゴースト)
const eAttack9 = 5; // (ゴースト)

/*-- 敵機の得点 --*/
const eScore0 = 100; // (ゾンビ)
const eScore1 = 100; // (ゾンビ)
const eScore2 = 200; // (女ゾンビ)
const eScore3 = 200; // (ゴースト)
const eScore4 = 200; // (ゴースト)
const eScore5 = 300; // (ピエロ)
const eScore6 = 300; // (ピエロ)
const eScore7 = 500; // (ガイコツシスター)
const eScore8 = 200; // (ゴースト)
const eScore9 = 200; // (ゴースト)

/*------------- ネタ ---------------*/
/*---- 敵機の拡大最大値を個別設定 ----*/

const eSizeMax0 = 200; //(ゾンビ) 画像の横幅がこの値まで大きくなったら自機にダメージ
const eSizeMax1 = 200; //(ゾンビ)
const eSizeMax2 = 200; //(女ゾンビ)
const eSizeMax3 = 200; //(ゴースト)
const eSizeMax4 = 200; //(ゴースト)
const eSizeMax5 = 200; //(ピエロ)
const eSizeMax6 = 200; //(ピエロ)
const eSizeMax7 = 200; //(ガイコツシスター)
const eSizeMax8 = 200; //(ゴースト)
const eSizeMax9 = 200; //(ゴースト)

/*
// 今のところ、敵機が横幅200pxまで大きくなったらダメージを受けるようになっているが、
// 関数enemySizeup(); の 「200」 を "２か所とも" → eSizeMax[i] にすれば、
// UFO は横幅200でダメージ、隕石は横幅300でダメージ、など個別に設定できる。
// 攻撃力、耐久力、スコアも個別設定なので、ボス敵を設定できる。
*/


// for文で使うので配列に入れておく

let eDefaultLife = [ // 手動で入れるしかないんだろうか。
  eDefaultLife0,
  eDefaultLife1,
  eDefaultLife2,
  eDefaultLife3,
  eDefaultLife4,
  eDefaultLife5,
  eDefaultLife6,
  eDefaultLife7,
  eDefaultLife8,
  eDefaultLife9];

let eSpeed = [
  eSpeed0,
  eSpeed1,
  eSpeed2,
  eSpeed3,
  eSpeed4,
  eSpeed5,
  eSpeed6,
  eSpeed7,
  eSpeed8,
  eSpeed9];

let eAttack = [
  eAttack0,
  eAttack1,
  eAttack2,
  eAttack3,
  eAttack4,
  eAttack5,
  eAttack6,
  eAttack7,
  eAttack8,
  eAttack9];

let eScore = [
  eScore0,
  eScore1,
  eScore2,
  eScore3,
  eScore4,
  eScore5,
  eScore6,
  eScore7,
  eScore8,
  eScore9];

let eSizeMax = [
  eSizeMax0,
  eSizeMax1,
  eSizeMax2,
  eSizeMax3,
  eSizeMax4,
  eSizeMax5,
  eSizeMax6,
  eSizeMax7,
  eSizeMax8,
  eSizeMax9];

let enemySizeA = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10];





const enemyA_Max = 10;
// src を書き換えただけなら、耐久力・攻撃力・スコアの書き換えでOK。
// 敵機の最大数 (htmlに設置した id の数)
// Bタイプはないです。

/*-- その他、微調整用変数 --*/

const frameHeight = 500; //px フレームの縦の長さ
const frameWidth = 500; //px フレームの横の長さ
// フレームの縦幅、横幅を自動的に取得するコマンドを知らないので手動で入力する。
// style.width とかで取得できるかも。
// マウス移動による背景移動の限界値計算に使ってる。
// 初期のフレームと背景の位置関係にも使ってる。
// 開発中にフレームの寸法が変わったなら、ここも変更する。

let life = 100;// 自機のHP


let Bullets; // 画面表示のテキスト要素格納用
Bullets = document.querySelector('#Bullets'); // 格納しとく。
let handgunBullets = 12; //拳銃の残弾数。初期値１２ 
const shotShellMax = 6; // ショットガンの最大装填数。６ぐらい？
let shotShell = 6; // ショットガンの装填数。初期値６


let BulletStock; // 画面表示のテキスト要素格納用
BulletStock = document.querySelector('#BulletStock');
let hgMagazines = 100; // 拳銃のマガジンの残り
let sShellStock = 30; // ショットガンの予備の弾数

// let enemySpeed = 1;
// 敵機の拡大の速さ。個別設定も難しくない。
// 個別設定したので廃止。

let level = 0;
// ゲームの段階を示す変数
// ページロード直後 ＝ 0、
// ゲーム開始直後に 1 、点数が上がると 2,3,4,5 が代入される。

const addY = 70;
// 照準は画面中央よりやや高め。
// 照準を何ピクセル上にするか調整する変数。

let scrollrate = 1;
// 背景画像の移動速度係数。かけ算で処理される。
// キー操作 「1」 「2」 「3」 でも変更可能

const interval = 20;
// マウス移動の計算間隔で使っている。
// なんとなく 20 。処理が重いなら遅くする可能性あり。

// 出てくる敵機の種類調整
let firstE = 0; // 配列の中の何番から何番までの敵を出現させるか、の最初の数。初期値　0
let lastE = 0; // 配列の中の何番から何番までの敵を出現させるか、の最後の数。初期値 3
/* (例)
firstE = 0 、 lastE = 3 の場合、
配列の中の　0番 , 1番 , 2番 が500x500フレーム内で動く。他は待機場所で待機
*/

let score = 0; // 得点

let enemyAX = []; // Aタイプの敵機の各x座標
let enemyAY = []; // Aタイプの敵機の各y座標
let enemyA = [];
for (let i = 0; i < enemyA_Max; i++) {
  enemyA[i] = document.querySelector('#enemyA' + i);
}
// ページロード時に格納しておけるか。
// 敵機の要素取得用
// function.js と mouseMove.js が共用してる。
// getElementById や querySelector で要素をその都度入れてる。
// それぞれのローカルで同名の変数を宣言しても問題ない。どちらもローカルなら。



let target;
// mouseMove.js,keyBoard.js,functions.js が同じ要素を参照してるため共用(グローバル)に。
// 設置されてからでないと要素を取得できない。

let Player; // 主人公画像の要素格納
// weapon.js,mouseMove.js,keyBoard.js,functions.js が同じ要素を参照してるため共用(グローバル)に。
// 要素取得は設置されてから。(ゲームスタート時)

let Player_Width; // 主人公画像の画面上の横幅の数値のみを格納する。
let Player0_Width = 500; // 用意した主人公(拳銃)の画像をどれくらいのサイズで表示させたいか。
let Player1_Width = 500; // 用意した主人公(ショットガン)の画像をどれくらいのサイズで表示させたいか。
let Player2_Width = 500; // 未実装だけど念のため宣言・代入しておく。
let Player3_Width = 500; // 未実装だけど念のため宣言・代入しておく。
// css でも設定できるが、あっちは ～～px　と単位つきなので計算に使えない。
// 見落とされる記述なので、２，３も代入しておく。
// どんなにサイズの大きな画像でも横幅500で表示される。
// 縦長でもゆがまないが、頭が画面外にきれるので、ここの記述に気づく必要がある。



let bgimg;
// 背景画像の要素格納用
// mouseMove.js と keyBoard.js が使ってるのでグローバルに。

let callTrickA = 0; // 逆さまオバケ出現管理、出現条件に使う。

let text_esc = document.querySelector('#key__esc'); // 画面表示のテキスト要素を格納
let text_l = document.querySelector('#key__Ins'); // 画面表示のテキスト要素を格納
let text_v = document.querySelector('#key__v'); // 画面表示のテキスト要素を格納

let weaponSelector = 0;
// 構えてる武器の管理用変数。
// 0 はハンドガン
// 1 はショットガンなど

let recoil = 0; // 反動の数字を格納する。weapon.js,functions.js が使う。
let recovery = 'done'; // 射撃の反動から回復しているか否か。weapon.js,functions.js が使う。
// done = 射撃可能。 yet = 反動から回復中

let aTop, aLeft, aRight, aBottom; // 警告の赤い矢印画像の要素格納
aTop = document.querySelector('#alertTop');
aLeft = document.querySelector('#alertLeft');
aRight = document.querySelector('#alertRight');
aBottom = document.querySelector('#alertBottom');




/*--------------------------------
  グローバルブロック ここまで
---------------------------------*/


/*------------------------------
　ローカルブロックここから
-------------------------------*/
document.addEventListener('DOMContentLoaded',
  function () {
    'use strict';

    /* ---- ローカル変数宣言 ---- */


    //let num; // B も C もローカルで 変数num を宣言しているが、エラーにはならない。







    /* ---- 関数 ---- */

    // グローバルで宣言した関数の本定義
    //function = funcFreeA(){ // ← エラーになる。
    //funcFreeA = function(){ // ← この形は通る。
    //funcFreeA = () => {

    //console.log('keyBoard.js から freeSpaceA.js の');
    //console.log('ローカル関数[ funcFreeA ] が呼び出されました。');

    //}

    //console.log('呼ばれなくてもページロード直後に1度だけ処理されるもの : A');

  }, false); // DOMCon... の閉じ


/*------------------
    作業スペース
-------------------*/




/*-----------------------------
    ローカルブロックここまで
-----------------------------*/