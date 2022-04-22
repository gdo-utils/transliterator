```typescript
import { Transliterator, DictionaryBgLat as dictionary } from '@gdo-utils/transliterator';

const wordMatcher: RegExp = /[\wа-я]+/ig; // This is the default
const tl = new Transliterator(dictionary, wordMatcher /* (optional) */).getHandler();

/**
Dictionary & processing order:
1. Fixed, case insensitive match, transliterated as-in dictionary 1:1
2. Irregular, regexp matched, case sensitive transliteration
3. Combination, replace all, case sensitive based on permutations done in the dictionary
4. Letter, replace all that is left, case sensitive.
*/

tl('бЪлгария'); // Bulgaria
tl('дзадзики'); // dzadziki

const poetry = `
Припев:
Guantanamera, хвани ме за водомера,
Guantanamera, хвани ме за водомера.

Мама му стара, к’во означава това,
от испански на български guantanamera,
въобще не знам, въобще не ме интересува,
но звучи добре и да го открехнем си струва.
Затова аз трябва да пея за някоя
красива мексиканка или испанка,
тя на главата си ще има сомбреро,
а аз ще карам моето Паджеро,
ще лежиме на плажа във Пуерто Рико,
а тя ще ми вика на испански “Лико”.
Мургаво лице, черна къдрава коса,
със бели бикини, влезнали в гъза.
После на бара ще пиеме текила,
докато видя, че се е напила,
ще я закарам във бунгалото ми
и се сещаш какво ще направя, нали?

Припев:/х2/

Сигурно знаеш, аз съм Вальо Кита
и съм тук със моята сеньорита,
миналото лято бях във Палма де Майорка
и показах на испанците как се порка.
Всяка вечер обикалях всички дискотеки
и не беше много … тука разберете,
някакъв амиго отиде отиде при моето момиче,
което беше много хубаво момиче.
“Хей, ш-ш-ш, к’ъв си ти , бе?”,
нещо се направи на важен този амиго,
завъртях се и му вкарах един в главата
и показах на испанците,
колко сме добри във борбата.

Припев:/х2/
...ще те хвана за водомера.

Докато ти беше във Майорка,
аз бях във Хавана
и се чудех коя да хвана,
обаче хванах някаква тропическа треска
и изкарах на легло цялата си почивка.
Супер бях ядосан, не ме питай защо,
исках да скъсам брадата на Фидел Кастро,
до леглото сестрата ми пя Guantanamera
и ме държеше за водомера.

Припев:/х3/
...ще те хвана за водомера.
`
tl(poetry);
/**
Pripev:
Guantanamera, hvani me za vodomera,
Guantanamera, hvani me za vodomera.

Mama mu stara, k’vo oznachava tova,
ot ispanski na balgarski guantanamera,
vaobshte ne znam, vaobshte ne me interesuva,
no zvuchi dobre i da go otkrehnem si struva.
Zatova az tryabva da peya za nyakoya
krasiva meksikanka ili ispanka,
tya na glavata si shte ima sombrero,
a az shte karam moeto Padzhero,
shte lezhime na plazha vav Puerto Riko,
a tya shte mi vika na ispanski “Liko”.
Murgavo litse, cherna kadrava kosa,
sas beli bikini, vleznali v gaza.
Posle na bara shte pieme tekila,
dokato vidya, che se e napila,
shte ya zakaram vav bungaloto mi
i se seshtash kakvo shte napravya, nali?

Pripev:/h2/

Sigurno znaesh, az sam Valyo Kita
i sam tuk sas moyata senyorita,
minaloto lyato byah vav Palma de Mayorka
i pokazah na ispantsite kak se porka.
Vsyaka vecher obikalyah vsichki diskoteki
i ne beshe mnogo … tuka razberete,
nyakakav amigo otide otide pri moeto momiche,
koeto beshe mnogo hubavo momiche.
“Hey, sh-sh-sh, k’av si ti , be?”,
neshto se napravi na vazhen tozi amigo,
zavartyah se i mu vkarah edin v glavata
i pokazah na ispantsite,
kolko sme dobri vav borbata.

Pripev:/h2/
...shte te hvana za vodomera.

Dokato ti beshe vav Mayorka,
az byah vav Havana
i se chudeh koya da hvana,
obache hvanah nyakakva tropicheska treska
i izkarah na leglo tsyalata si pochivka.
Super byah yadosan, ne me pitay zashto,
iskah da skasam bradata na Fidel Kastro,
do legloto sestrata mi pya Guantanamera
i me darzheshe za vodomera.

Pripev:/h3/
...shte te hvana za vodomera.
*/

```