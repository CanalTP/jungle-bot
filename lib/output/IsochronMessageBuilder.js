import MessageBuilder from "./MessageBuilder";

export default class IsochronMessageBuilder extends MessageBuilder {
    getReply() {
        let replyMessage = `\`\`\`.I. .~Z  ~.~,. ..: , ..,=7.,Z... ~=.= $...Z~ ...+. :.?::,$  +~ .. ., ,.. ~~.  .:
 ==.,  ~. ,.?.Z:.?.=:....~~ .~+. ===7~ ,.~Z, :..,.~= :~.+. ~..,Z.: ~,=~=,~~=~:,:
7=~+ :~ ,:=+Z+ . 7 Z..~.:=+,.:.===...==~.. ~ :$$~:  +...~ZZ , =. ~.,,. :=:,.   Z
 =~ =~,:~,:.$,,  .Z ..,,=~=:I.I=. ?.= :ZZ?~.IZ.~.~  .  Z:, .:..+=  =.  . ~ ,$.  
  ,,O.:.=8,.~~+=.,.=~ =ZZ.,~$.Z$, =..=.,,. Z,.=.+. O::. ,=,,$==  ,,:.  . ,.., :.
::~7,.+Z:~Z7.?..I $.:, =..+7ZI~.~=== +:.?..$,: ,,.$=+~~~,..= .. ,7~~.:  ., =.=~,
=~O+$7ZI$~  ...=.+. =,I+Z,??$I??:?+.:=  ???.Z:.Z  ., ~..,  ~=$ZO:,:+.:. . =: +.,
+=+~:.:...:.=.ZZ:I , ~$?$,$?$?~::~,  +,?II7=. .=7$.~ZI.N:   . N  ~~=7 ,I  .Z:~=I
:,O$++?$.++=...,?Z,=$ ..,II?????7IZ,.?:???$.O????7?O,.. .~=~ I=.~ +7 ...I$ ,88.,
==+$::...?Z: I..,$,7I??$.$?$??II?$..:7I?I?+$?I$7I,~,..  ~~ .$+.~ $:.,= ..$..~:.:
~7,:=$ .  .   ,.,+,+.7I?,?ZI???7$??????$???Z?I?$::~ Z~, = =.~~:~.? .,.Z   :,,~=:
,,.: ~~..,Z.= O,.Z8OOO7=~7???$?I$I??7??$7???7?I,= + .$ .~ ~,~$OO~7.+,,+:    ~ ..
,:~~ $ Z,. +.Z+$7+,.~II?.7$II???I??????????.?Z..~.. ,.+~::,I..$$.OZ.=.:,.. .~.$7
::=$.:$=~O,. ~8:.=. ~.=..?Z..OI?II?????7?I??I??Z~Z ..:Z~~~~~., +~Z., $:.:~.~.  ,
=.+?.Z,:,::OI7+=+I,. .:Z...7,~=??7III?IZ??????$???~7~:+ZZ  :=:? .O...,. + ==?,O~
~I~.=+~=? ?7I..+:.: :.,  7.:.$?????I??II???$???I???.,$.= :=  . ~:O 7.$O.~.=.  ,O
,:,Z.++.?I?  ,.:=.,.ZI: .. .,I$??O7I?Z?7?I7??$$I????$??$??Z?.Z:.~:..,=.=.:....=,
,?==. ,$?8=  =.,~I..O.$..=.:?I?I?I?7?,~.ZI?I?$???????Z???7?I?I????.?~..  +  ..  
 ,.= ~=I~=Z :=~.Z:Z$?~= ,=,II=~,::$=D~.O..7IZI?ZI?????7??????IZIII?I?7.Z7:.   .7
,?$ .7::,,  Z.. .. , Z.  O .+..,,  ,~ Z =+???DMZZ???I??????$$????$???I???O=??,, 
8  .?, Z~:$.?Z=.+.,~.:$, .I~~O? + =O ~ ,,I???$$O??????????I????7:$..,I.Z$:..=:.,
 :=~$ .~?= =.    .Z..=IO, ,.:  .= .,?+:.=??I???77?Z$??$I7Z???$7~,O:~,,,,,$,,,,,,
:.+=:??,7~~ Z:::,=,Z.+. ~.7,.. ..+. I ..$?I?????Z?I?????????$,.  . ,.,$,,,..$,,,
:+.ZO~.I: ..O  =.,~Z   O,=.,:O....,..=,Z??????$???I?I7I?7??I,,7 $.,,7,,:~:,. :~,
I$ ~+.=.I.,?,.=::,7==.  .=,+  .:7.,7..,??I?II?????7$$??I??.~,,$,$..,,::,,,,:~..=
I.+.::+,+ O.,.O= ,:.+,~,,+..::.Z.,~?$??Z????I????$??77??77.ZZ..,=.7,,.,..... .~.
 . 7ZO  ..,. ~..=$7$.. 7:,O.O?I ....$??$$=:????I????.??Z?O :~~:.,,~~,.,,,,,,:,.,
 : : .. =::=.~..~O ..M=$..,. .:: .?,.7~+:7.????????,IO$7O. .. ~+,,:~=::::::~:::,
.. ?:.~ ,O:.+::=  =..Z+ :NM$, ..::  =  .~.~$7?$.8. = ..=7I..Z.~  .?I+.  $:::~::=
ZZ,:~ = . +:+7.$ ,    ....O?,:.Z7.=$  .=I.:..+ .=O~.. ?..77.~. .=.:. +....,~,,~.
.... .=..,Z....+= . :.. ~ I .~~O .  .,::,,I .:Z::,.Z~. ..+~.,77+8.. $$ .~7O$7 ..
~~   =.~:..=.~ .::~,.::? =. .  ?:  O:. . :IO?Z ~ .  =~:.I,~   .I ?,~:~,.?77=?+=I\`\`\``;
        return super.getReply(replyMessage);
    }
}