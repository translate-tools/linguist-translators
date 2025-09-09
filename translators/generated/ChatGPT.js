var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var ChatGPTLLMTranslator$1 = {};

var languages$1 = {};

var codes = {};

var ISO639LangCodesList = {};

Object.defineProperty(ISO639LangCodesList, "__esModule", {
  value: true
});
ISO639LangCodesList.default = void 0;
// Codes from https://www.loc.gov/standards/iso639-2/php/code_list.php
const languages = [{
  v1: 'aa',
  v2: 'aar'
}, {
  v1: 'ab',
  v2: 'abk'
}, {
  v1: null,
  v2: 'ace'
}, {
  v1: null,
  v2: 'ach'
}, {
  v1: null,
  v2: 'ada'
}, {
  v1: null,
  v2: 'ady'
}, {
  v1: null,
  v2: 'afa'
}, {
  v1: null,
  v2: 'afh'
}, {
  v1: 'af',
  v2: 'afr'
}, {
  v1: null,
  v2: 'ain'
}, {
  v1: 'ak',
  v2: 'aka'
}, {
  v1: null,
  v2: 'akk'
}, {
  v1: 'sq',
  v2: 'alb',
  v2B: 'alb',
  v2T: 'sqi'
}, {
  v1: null,
  v2: 'ale'
}, {
  v1: null,
  v2: 'alg'
}, {
  v1: null,
  v2: 'alt'
}, {
  v1: 'am',
  v2: 'amh'
}, {
  v1: null,
  v2: 'ang'
}, {
  v1: null,
  v2: 'anp'
}, {
  v1: null,
  v2: 'apa'
}, {
  v1: 'ar',
  v2: 'ara'
}, {
  v1: null,
  v2: 'arc'
}, {
  v1: 'an',
  v2: 'arg'
}, {
  v1: 'hy',
  v2: 'arm',
  v2B: 'arm',
  v2T: 'hye'
}, {
  v1: null,
  v2: 'arn'
}, {
  v1: null,
  v2: 'arp'
}, {
  v1: null,
  v2: 'art'
}, {
  v1: null,
  v2: 'arw'
}, {
  v1: 'as',
  v2: 'asm'
}, {
  v1: null,
  v2: 'ast'
}, {
  v1: null,
  v2: 'ath'
}, {
  v1: null,
  v2: 'aus'
}, {
  v1: 'av',
  v2: 'ava'
}, {
  v1: 'ae',
  v2: 'ave'
}, {
  v1: null,
  v2: 'awa'
}, {
  v1: 'ay',
  v2: 'aym'
}, {
  v1: 'az',
  v2: 'aze'
}, {
  v1: null,
  v2: 'bad'
}, {
  v1: null,
  v2: 'bai'
}, {
  v1: 'ba',
  v2: 'bak'
}, {
  v1: null,
  v2: 'bal'
}, {
  v1: 'bm',
  v2: 'bam'
}, {
  v1: null,
  v2: 'ban'
}, {
  v1: 'eu',
  v2: 'baq',
  v2B: 'baq',
  v2T: 'eus'
}, {
  v1: null,
  v2: 'bas'
}, {
  v1: null,
  v2: 'bat'
}, {
  v1: null,
  v2: 'bej'
}, {
  v1: 'be',
  v2: 'bel'
}, {
  v1: null,
  v2: 'bem'
}, {
  v1: 'bn',
  v2: 'ben'
}, {
  v1: null,
  v2: 'ber'
}, {
  v1: null,
  v2: 'bho'
}, {
  v1: 'bh',
  v2: 'bih'
}, {
  v1: null,
  v2: 'bik'
}, {
  v1: null,
  v2: 'bin'
}, {
  v1: 'bi',
  v2: 'bis'
}, {
  v1: null,
  v2: 'bla'
}, {
  v1: null,
  v2: 'bnt'
}, {
  v1: 'bo',
  v2: 'tib',
  v2B: 'tib',
  v2T: 'bod'
}, {
  v1: 'bs',
  v2: 'bos'
}, {
  v1: null,
  v2: 'bra'
}, {
  v1: 'br',
  v2: 'bre'
}, {
  v1: null,
  v2: 'btk'
}, {
  v1: null,
  v2: 'bua'
}, {
  v1: null,
  v2: 'bug'
}, {
  v1: 'bg',
  v2: 'bul'
}, {
  v1: 'my',
  v2: 'bur',
  v2B: 'bur',
  v2T: 'mya'
}, {
  v1: null,
  v2: 'byn'
}, {
  v1: null,
  v2: 'cad'
}, {
  v1: null,
  v2: 'cai'
}, {
  v1: null,
  v2: 'car'
}, {
  v1: 'ca',
  v2: 'cat'
}, {
  v1: null,
  v2: 'cau'
}, {
  v1: null,
  v2: 'ceb'
}, {
  v1: null,
  v2: 'cel'
}, {
  v1: 'cs',
  v2: 'cze',
  v2B: 'cze',
  v2T: 'ces'
}, {
  v1: 'ch',
  v2: 'cha'
}, {
  v1: null,
  v2: 'chb'
}, {
  v1: 'ce',
  v2: 'che'
}, {
  v1: null,
  v2: 'chg'
}, {
  v1: 'zh',
  v2: 'chi',
  v2B: 'chi',
  v2T: 'zho'
}, {
  v1: null,
  v2: 'chk'
}, {
  v1: null,
  v2: 'chm'
}, {
  v1: null,
  v2: 'chn'
}, {
  v1: null,
  v2: 'cho'
}, {
  v1: null,
  v2: 'chp'
}, {
  v1: null,
  v2: 'chr'
}, {
  v1: 'cu',
  v2: 'chu'
}, {
  v1: 'cv',
  v2: 'chv'
}, {
  v1: null,
  v2: 'chy'
}, {
  v1: null,
  v2: 'cmc'
}, {
  v1: null,
  v2: 'cnr'
}, {
  v1: null,
  v2: 'cop'
}, {
  v1: 'kw',
  v2: 'cor'
}, {
  v1: 'co',
  v2: 'cos'
}, {
  v1: null,
  v2: 'cpe'
}, {
  v1: null,
  v2: 'cpf'
}, {
  v1: null,
  v2: 'cpp'
}, {
  v1: 'cr',
  v2: 'cre'
}, {
  v1: null,
  v2: 'crh'
}, {
  v1: null,
  v2: 'crp'
}, {
  v1: null,
  v2: 'csb'
}, {
  v1: null,
  v2: 'cus'
}, {
  v1: 'cy',
  v2: 'wel',
  v2B: 'wel',
  v2T: 'cym'
}, {
  v1: null,
  v2: 'dak'
}, {
  v1: 'da',
  v2: 'dan'
}, {
  v1: null,
  v2: 'dar'
}, {
  v1: null,
  v2: 'day'
}, {
  v1: null,
  v2: 'del'
}, {
  v1: null,
  v2: 'den'
}, {
  v1: 'de',
  v2: 'ger',
  v2B: 'ger',
  v2T: 'deu'
}, {
  v1: null,
  v2: 'dgr'
}, {
  v1: null,
  v2: 'din'
}, {
  v1: 'dv',
  v2: 'div'
}, {
  v1: null,
  v2: 'doi'
}, {
  v1: null,
  v2: 'dra'
}, {
  v1: null,
  v2: 'dsb'
}, {
  v1: null,
  v2: 'dua'
}, {
  v1: null,
  v2: 'dum'
}, {
  v1: 'nl',
  v2: 'dut',
  v2B: 'dut',
  v2T: 'nld'
}, {
  v1: null,
  v2: 'dyu'
}, {
  v1: 'dz',
  v2: 'dzo'
}, {
  v1: null,
  v2: 'efi'
}, {
  v1: null,
  v2: 'egy'
}, {
  v1: null,
  v2: 'eka'
}, {
  v1: 'el',
  v2: 'gre',
  v2B: 'gre',
  v2T: 'ell'
}, {
  v1: null,
  v2: 'elx'
}, {
  v1: 'en',
  v2: 'eng'
}, {
  v1: null,
  v2: 'enm'
}, {
  v1: 'eo',
  v2: 'epo'
}, {
  v1: 'et',
  v2: 'est'
}, {
  v1: 'ee',
  v2: 'ewe'
}, {
  v1: null,
  v2: 'ewo'
}, {
  v1: null,
  v2: 'fan'
}, {
  v1: 'fo',
  v2: 'fao'
}, {
  v1: 'fa',
  v2: 'per',
  v2B: 'per',
  v2T: 'fas'
}, {
  v1: null,
  v2: 'fat'
}, {
  v1: 'fj',
  v2: 'fij'
}, {
  v1: null,
  v2: 'fil'
}, {
  v1: 'fi',
  v2: 'fin'
}, {
  v1: null,
  v2: 'fiu'
}, {
  v1: null,
  v2: 'fon'
}, {
  v1: 'fr',
  v2: 'fre',
  v2B: 'fre',
  v2T: 'fra'
}, {
  v1: null,
  v2: 'frm'
}, {
  v1: null,
  v2: 'fro'
}, {
  v1: null,
  v2: 'frr'
}, {
  v1: null,
  v2: 'frs'
}, {
  v1: 'fy',
  v2: 'fry'
}, {
  v1: 'ff',
  v2: 'ful'
}, {
  v1: null,
  v2: 'fur'
}, {
  v1: null,
  v2: 'gaa'
}, {
  v1: null,
  v2: 'gay'
}, {
  v1: null,
  v2: 'gba'
}, {
  v1: null,
  v2: 'gem'
}, {
  v1: 'ka',
  v2: 'geo',
  v2B: 'geo',
  v2T: 'kat'
}, {
  v1: null,
  v2: 'gez'
}, {
  v1: null,
  v2: 'gil'
}, {
  v1: 'gd',
  v2: 'gla'
}, {
  v1: 'ga',
  v2: 'gle'
}, {
  v1: 'gl',
  v2: 'glg'
}, {
  v1: 'gv',
  v2: 'glv'
}, {
  v1: null,
  v2: 'gmh'
}, {
  v1: null,
  v2: 'goh'
}, {
  v1: null,
  v2: 'gon'
}, {
  v1: null,
  v2: 'gor'
}, {
  v1: null,
  v2: 'got'
}, {
  v1: null,
  v2: 'grb'
}, {
  v1: null,
  v2: 'grc'
}, {
  v1: 'gn',
  v2: 'grn'
}, {
  v1: null,
  v2: 'gsw'
}, {
  v1: 'gu',
  v2: 'guj'
}, {
  v1: null,
  v2: 'gwi'
}, {
  v1: null,
  v2: 'hai'
}, {
  v1: 'ht',
  v2: 'hat'
}, {
  v1: 'ha',
  v2: 'hau'
}, {
  v1: null,
  v2: 'haw'
}, {
  v1: 'he',
  v2: 'heb'
}, {
  v1: 'hz',
  v2: 'her'
}, {
  v1: null,
  v2: 'hil'
}, {
  v1: null,
  v2: 'him'
}, {
  v1: 'hi',
  v2: 'hin'
}, {
  v1: null,
  v2: 'hit'
}, {
  v1: null,
  v2: 'hmn'
}, {
  v1: 'ho',
  v2: 'hmo'
}, {
  v1: 'hr',
  v2: 'hrv'
}, {
  v1: null,
  v2: 'hsb'
}, {
  v1: 'hu',
  v2: 'hun'
}, {
  v1: null,
  v2: 'hup'
}, {
  v1: null,
  v2: 'iba'
}, {
  v1: 'ig',
  v2: 'ibo'
}, {
  v1: 'is',
  v2: 'ice',
  v2B: 'ice',
  v2T: 'isl'
}, {
  v1: 'io',
  v2: 'ido'
}, {
  v1: 'ii',
  v2: 'iii'
}, {
  v1: null,
  v2: 'ijo'
}, {
  v1: 'iu',
  v2: 'iku'
}, {
  v1: 'ie',
  v2: 'ile'
}, {
  v1: null,
  v2: 'ilo'
}, {
  v1: 'ia',
  v2: 'ina'
}, {
  v1: null,
  v2: 'inc'
}, {
  v1: 'id',
  v2: 'ind'
}, {
  v1: null,
  v2: 'ine'
}, {
  v1: null,
  v2: 'inh'
}, {
  v1: 'ik',
  v2: 'ipk'
}, {
  v1: null,
  v2: 'ira'
}, {
  v1: null,
  v2: 'iro'
}, {
  v1: 'it',
  v2: 'ita'
}, {
  v1: 'jv',
  v2: 'jav'
}, {
  v1: null,
  v2: 'jbo'
}, {
  v1: 'ja',
  v2: 'jpn'
}, {
  v1: null,
  v2: 'jpr'
}, {
  v1: null,
  v2: 'jrb'
}, {
  v1: null,
  v2: 'kaa'
}, {
  v1: null,
  v2: 'kab'
}, {
  v1: null,
  v2: 'kac'
}, {
  v1: 'kl',
  v2: 'kal'
}, {
  v1: null,
  v2: 'kam'
}, {
  v1: 'kn',
  v2: 'kan'
}, {
  v1: null,
  v2: 'kar'
}, {
  v1: 'ks',
  v2: 'kas'
}, {
  v1: 'kr',
  v2: 'kau'
}, {
  v1: null,
  v2: 'kaw'
}, {
  v1: 'kk',
  v2: 'kaz'
}, {
  v1: null,
  v2: 'kbd'
}, {
  v1: null,
  v2: 'kha'
}, {
  v1: null,
  v2: 'khi'
}, {
  v1: 'km',
  v2: 'khm'
}, {
  v1: null,
  v2: 'kho'
}, {
  v1: 'ki',
  v2: 'kik'
}, {
  v1: 'rw',
  v2: 'kin'
}, {
  v1: 'ky',
  v2: 'kir'
}, {
  v1: null,
  v2: 'kmb'
}, {
  v1: null,
  v2: 'kok'
}, {
  v1: 'kv',
  v2: 'kom'
}, {
  v1: 'kg',
  v2: 'kon'
}, {
  v1: 'ko',
  v2: 'kor'
}, {
  v1: null,
  v2: 'kos'
}, {
  v1: null,
  v2: 'kpe'
}, {
  v1: null,
  v2: 'krc'
}, {
  v1: null,
  v2: 'krl'
}, {
  v1: null,
  v2: 'kro'
}, {
  v1: null,
  v2: 'kru'
}, {
  v1: 'kj',
  v2: 'kua'
}, {
  v1: null,
  v2: 'kum'
}, {
  v1: 'ku',
  v2: 'kur'
}, {
  v1: null,
  v2: 'kut'
}, {
  v1: null,
  v2: 'lad'
}, {
  v1: null,
  v2: 'lah'
}, {
  v1: null,
  v2: 'lam'
}, {
  v1: 'lo',
  v2: 'lao'
}, {
  v1: 'la',
  v2: 'lat'
}, {
  v1: 'lv',
  v2: 'lav'
}, {
  v1: null,
  v2: 'lez'
}, {
  v1: 'li',
  v2: 'lim'
}, {
  v1: 'ln',
  v2: 'lin'
}, {
  v1: 'lt',
  v2: 'lit'
}, {
  v1: null,
  v2: 'lol'
}, {
  v1: null,
  v2: 'loz'
}, {
  v1: 'lb',
  v2: 'ltz'
}, {
  v1: null,
  v2: 'lua'
}, {
  v1: 'lu',
  v2: 'lub'
}, {
  v1: 'lg',
  v2: 'lug'
}, {
  v1: null,
  v2: 'lui'
}, {
  v1: null,
  v2: 'lun'
}, {
  v1: null,
  v2: 'luo'
}, {
  v1: null,
  v2: 'lus'
}, {
  v1: 'mk',
  v2: 'mac',
  v2B: 'mac',
  v2T: 'mkd'
}, {
  v1: null,
  v2: 'mad'
}, {
  v1: null,
  v2: 'mag'
}, {
  v1: 'mh',
  v2: 'mah'
}, {
  v1: null,
  v2: 'mai'
}, {
  v1: null,
  v2: 'mak'
}, {
  v1: 'ml',
  v2: 'mal'
}, {
  v1: null,
  v2: 'man'
}, {
  v1: 'mi',
  v2: 'mao',
  v2B: 'mao',
  v2T: 'mri'
}, {
  v1: null,
  v2: 'map'
}, {
  v1: 'mr',
  v2: 'mar'
}, {
  v1: null,
  v2: 'mas'
}, {
  v1: 'ms',
  v2: 'may',
  v2B: 'may',
  v2T: 'msa'
}, {
  v1: null,
  v2: 'mdf'
}, {
  v1: null,
  v2: 'mdr'
}, {
  v1: null,
  v2: 'men'
}, {
  v1: null,
  v2: 'mga'
}, {
  v1: null,
  v2: 'mic'
}, {
  v1: null,
  v2: 'min'
}, {
  v1: null,
  v2: 'mis'
}, {
  v1: null,
  v2: 'mkh'
}, {
  v1: 'mg',
  v2: 'mlg'
}, {
  v1: 'mt',
  v2: 'mlt'
}, {
  v1: null,
  v2: 'mnc'
}, {
  v1: null,
  v2: 'mni'
}, {
  v1: null,
  v2: 'mno'
}, {
  v1: null,
  v2: 'moh'
}, {
  v1: 'mn',
  v2: 'mon'
}, {
  v1: null,
  v2: 'mos'
}, {
  v1: null,
  v2: 'mul'
}, {
  v1: null,
  v2: 'mun'
}, {
  v1: null,
  v2: 'mus'
}, {
  v1: null,
  v2: 'mwl'
}, {
  v1: null,
  v2: 'mwr'
}, {
  v1: null,
  v2: 'myn'
}, {
  v1: null,
  v2: 'myv'
}, {
  v1: null,
  v2: 'nah'
}, {
  v1: null,
  v2: 'nai'
}, {
  v1: null,
  v2: 'nap'
}, {
  v1: 'na',
  v2: 'nau'
}, {
  v1: 'nv',
  v2: 'nav'
}, {
  v1: 'nr',
  v2: 'nbl'
}, {
  v1: 'nd',
  v2: 'nde'
}, {
  v1: 'ng',
  v2: 'ndo'
}, {
  v1: null,
  v2: 'nds'
}, {
  v1: 'ne',
  v2: 'nep'
}, {
  v1: null,
  v2: 'new'
}, {
  v1: null,
  v2: 'nia'
}, {
  v1: null,
  v2: 'nic'
}, {
  v1: null,
  v2: 'niu'
}, {
  v1: 'nn',
  v2: 'nno'
}, {
  v1: 'nb',
  v2: 'nob'
}, {
  v1: null,
  v2: 'nog'
}, {
  v1: null,
  v2: 'non'
}, {
  v1: 'no',
  v2: 'nor'
}, {
  v1: null,
  v2: 'nqo'
}, {
  v1: null,
  v2: 'nso'
}, {
  v1: null,
  v2: 'nub'
}, {
  v1: null,
  v2: 'nwc'
}, {
  v1: 'ny',
  v2: 'nya'
}, {
  v1: null,
  v2: 'nym'
}, {
  v1: null,
  v2: 'nyn'
}, {
  v1: null,
  v2: 'nyo'
}, {
  v1: null,
  v2: 'nzi'
}, {
  v1: 'oc',
  v2: 'oci'
}, {
  v1: 'oj',
  v2: 'oji'
}, {
  v1: 'or',
  v2: 'ori'
}, {
  v1: 'om',
  v2: 'orm'
}, {
  v1: null,
  v2: 'osa'
}, {
  v1: 'os',
  v2: 'oss'
}, {
  v1: null,
  v2: 'ota'
}, {
  v1: null,
  v2: 'oto'
}, {
  v1: null,
  v2: 'paa'
}, {
  v1: null,
  v2: 'pag'
}, {
  v1: null,
  v2: 'pal'
}, {
  v1: null,
  v2: 'pam'
}, {
  v1: 'pa',
  v2: 'pan'
}, {
  v1: null,
  v2: 'pap'
}, {
  v1: null,
  v2: 'pau'
}, {
  v1: null,
  v2: 'peo'
}, {
  v1: null,
  v2: 'phi'
}, {
  v1: null,
  v2: 'phn'
}, {
  v1: 'pi',
  v2: 'pli'
}, {
  v1: 'pl',
  v2: 'pol'
}, {
  v1: null,
  v2: 'pon'
}, {
  v1: 'pt',
  v2: 'por'
}, {
  v1: null,
  v2: 'pra'
}, {
  v1: null,
  v2: 'pro'
}, {
  v1: 'ps',
  v2: 'pus'
}, {
  v1: null,
  v2: 'qaa-qtz'
}, {
  v1: 'qu',
  v2: 'que'
}, {
  v1: null,
  v2: 'raj'
}, {
  v1: null,
  v2: 'rap'
}, {
  v1: null,
  v2: 'rar'
}, {
  v1: null,
  v2: 'roa'
}, {
  v1: 'rm',
  v2: 'roh'
}, {
  v1: null,
  v2: 'rom'
}, {
  v1: 'ro',
  v2: 'rum',
  v2B: 'rum',
  v2T: 'ron'
}, {
  v1: 'rn',
  v2: 'run'
}, {
  v1: null,
  v2: 'rup'
}, {
  v1: 'ru',
  v2: 'rus'
}, {
  v1: null,
  v2: 'sad'
}, {
  v1: 'sg',
  v2: 'sag'
}, {
  v1: null,
  v2: 'sah'
}, {
  v1: null,
  v2: 'sai'
}, {
  v1: null,
  v2: 'sal'
}, {
  v1: null,
  v2: 'sam'
}, {
  v1: 'sa',
  v2: 'san'
}, {
  v1: null,
  v2: 'sas'
}, {
  v1: null,
  v2: 'sat'
}, {
  v1: null,
  v2: 'scn'
}, {
  v1: null,
  v2: 'sco'
}, {
  v1: null,
  v2: 'sel'
}, {
  v1: null,
  v2: 'sem'
}, {
  v1: null,
  v2: 'sga'
}, {
  v1: null,
  v2: 'sgn'
}, {
  v1: null,
  v2: 'shn'
}, {
  v1: null,
  v2: 'sid'
}, {
  v1: 'si',
  v2: 'sin'
}, {
  v1: null,
  v2: 'sio'
}, {
  v1: null,
  v2: 'sit'
}, {
  v1: null,
  v2: 'sla'
}, {
  v1: 'sk',
  v2: 'slo',
  v2B: 'slo',
  v2T: 'slk'
}, {
  v1: 'sl',
  v2: 'slv'
}, {
  v1: null,
  v2: 'sma'
}, {
  v1: 'se',
  v2: 'sme'
}, {
  v1: null,
  v2: 'smi'
}, {
  v1: null,
  v2: 'smj'
}, {
  v1: null,
  v2: 'smn'
}, {
  v1: 'sm',
  v2: 'smo'
}, {
  v1: null,
  v2: 'sms'
}, {
  v1: 'sn',
  v2: 'sna'
}, {
  v1: 'sd',
  v2: 'snd'
}, {
  v1: null,
  v2: 'snk'
}, {
  v1: null,
  v2: 'sog'
}, {
  v1: 'so',
  v2: 'som'
}, {
  v1: null,
  v2: 'son'
}, {
  v1: 'st',
  v2: 'sot'
}, {
  v1: 'es',
  v2: 'spa'
}, {
  v1: 'sc',
  v2: 'srd'
}, {
  v1: null,
  v2: 'srn'
}, {
  v1: 'sr',
  v2: 'srp'
}, {
  v1: null,
  v2: 'srr'
}, {
  v1: null,
  v2: 'ssa'
}, {
  v1: 'ss',
  v2: 'ssw'
}, {
  v1: null,
  v2: 'suk'
}, {
  v1: 'su',
  v2: 'sun'
}, {
  v1: null,
  v2: 'sus'
}, {
  v1: null,
  v2: 'sux'
}, {
  v1: 'sw',
  v2: 'swa'
}, {
  v1: 'sv',
  v2: 'swe'
}, {
  v1: null,
  v2: 'syc'
}, {
  v1: null,
  v2: 'syr'
}, {
  v1: 'ty',
  v2: 'tah'
}, {
  v1: null,
  v2: 'tai'
}, {
  v1: 'ta',
  v2: 'tam'
}, {
  v1: 'tt',
  v2: 'tat'
}, {
  v1: 'te',
  v2: 'tel'
}, {
  v1: null,
  v2: 'tem'
}, {
  v1: null,
  v2: 'ter'
}, {
  v1: null,
  v2: 'tet'
}, {
  v1: 'tg',
  v2: 'tgk'
}, {
  v1: 'tl',
  v2: 'tgl'
}, {
  v1: 'th',
  v2: 'tha'
}, {
  v1: null,
  v2: 'tig'
}, {
  v1: 'ti',
  v2: 'tir'
}, {
  v1: null,
  v2: 'tiv'
}, {
  v1: null,
  v2: 'tkl'
}, {
  v1: null,
  v2: 'tlh'
}, {
  v1: null,
  v2: 'tli'
}, {
  v1: null,
  v2: 'tmh'
}, {
  v1: null,
  v2: 'tog'
}, {
  v1: 'to',
  v2: 'ton'
}, {
  v1: null,
  v2: 'tpi'
}, {
  v1: null,
  v2: 'tsi'
}, {
  v1: 'tn',
  v2: 'tsn'
}, {
  v1: 'ts',
  v2: 'tso'
}, {
  v1: 'tk',
  v2: 'tuk'
}, {
  v1: null,
  v2: 'tum'
}, {
  v1: null,
  v2: 'tup'
}, {
  v1: 'tr',
  v2: 'tur'
}, {
  v1: null,
  v2: 'tut'
}, {
  v1: null,
  v2: 'tvl'
}, {
  v1: 'tw',
  v2: 'twi'
}, {
  v1: null,
  v2: 'tyv'
}, {
  v1: null,
  v2: 'udm'
}, {
  v1: null,
  v2: 'uga'
}, {
  v1: 'ug',
  v2: 'uig'
}, {
  v1: 'uk',
  v2: 'ukr'
}, {
  v1: null,
  v2: 'umb'
}, {
  v1: null,
  v2: 'und'
}, {
  v1: 'ur',
  v2: 'urd'
}, {
  v1: 'uz',
  v2: 'uzb'
}, {
  v1: null,
  v2: 'vai'
}, {
  v1: 've',
  v2: 'ven'
}, {
  v1: 'vi',
  v2: 'vie'
}, {
  v1: 'vo',
  v2: 'vol'
}, {
  v1: null,
  v2: 'vot'
}, {
  v1: null,
  v2: 'wak'
}, {
  v1: null,
  v2: 'wal'
}, {
  v1: null,
  v2: 'war'
}, {
  v1: null,
  v2: 'was'
}, {
  v1: null,
  v2: 'wen'
}, {
  v1: 'wa',
  v2: 'wln'
}, {
  v1: 'wo',
  v2: 'wol'
}, {
  v1: null,
  v2: 'xal'
}, {
  v1: 'xh',
  v2: 'xho'
}, {
  v1: null,
  v2: 'yao'
}, {
  v1: null,
  v2: 'yap'
}, {
  v1: 'yi',
  v2: 'yid'
}, {
  v1: 'yo',
  v2: 'yor'
}, {
  v1: null,
  v2: 'ypk'
}, {
  v1: null,
  v2: 'zap'
}, {
  v1: null,
  v2: 'zbl'
}, {
  v1: null,
  v2: 'zen'
}, {
  v1: null,
  v2: 'zgh'
}, {
  v1: 'za',
  v2: 'zha'
}, {
  v1: null,
  v2: 'znd'
}, {
  v1: 'zu',
  v2: 'zul'
}, {
  v1: null,
  v2: 'zun'
}, {
  v1: null,
  v2: 'zxx'
}, {
  v1: null,
  v2: 'zza'
}];
ISO639LangCodesList.default = languages;

Object.defineProperty(codes, "__esModule", {
  value: true
});
codes.isLanguageCodeISO639v2 = codes.isLanguageCodeISO639v1 = codes.getLanguageCodesISO639 = void 0;
var _ISO639LangCodesList = _interopRequireDefault(ISO639LangCodesList);
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Check is string are 639-1 lang code
 *
 * Values are case sensitive, if you need, you have to convert strings to lower case to check
 */
const isLanguageCodeISO639v1 = code => {
  return Boolean(code && _ISO639LangCodesList.default.some(lang => code === lang.v1));
};
/**
 * Check is string are 639-2 lang code
 *
 * Values are case sensitive, if you need, you have to convert strings to lower case to check
 */
codes.isLanguageCodeISO639v1 = isLanguageCodeISO639v1;
const isLanguageCodeISO639v2 = code => {
  return Boolean(code && _ISO639LangCodesList.default.some(lang => code === lang.v2 || code === lang.v2B || code === lang.v2T));
};
/**
 * Return subset of ISO-639 lang codes
 */
codes.isLanguageCodeISO639v2 = isLanguageCodeISO639v2;
const getLanguageCodesISO639 = set => {
  const pickedLanguages = [];
  for (const lang of _ISO639LangCodesList.default) {
    switch (set) {
      case 'v1':
        if (lang.v1) {
          pickedLanguages.push(lang.v1);
        }
        break;
      case 'v2':
        pickedLanguages.push(lang.v2);
        break;
    }
  }
  return pickedLanguages;
};
codes.getLanguageCodesISO639 = getLanguageCodesISO639;

var LanguageAliases$1 = {};

Object.defineProperty(LanguageAliases$1, "__esModule", {
  value: true
});
LanguageAliases$1.createLanguageAliasesMap = LanguageAliases$1.LanguageAliases = void 0;
const createLanguageAliasesMap = languages => {
  const complexLanguages = languages.filter(language => language.includes('-'));
  // Build languages map
  const languagesMap = {};
  for (const language of complexLanguages) {
    const simpleLanguage = language.split('-')[0];
    if (!(simpleLanguage in languagesMap)) {
      languagesMap[simpleLanguage] = [language];
      continue;
    }
    languagesMap[simpleLanguage].push(language);
  }
  return languagesMap;
};
LanguageAliases$1.createLanguageAliasesMap = createLanguageAliasesMap;
class LanguageAliases {
  constructor(languagesList, options = {}) {
    this.languagesList = languagesList;
    this.options = options;
    // Build map
    const languagesMap = createLanguageAliasesMap(languagesList);
    this.languagesMaps = {
      normal: languagesMap,
      reverse: Object.fromEntries(Object.entries(languagesMap).map(([simpleLanguage, aliases]) => aliases.map(alias => [alias, simpleLanguage])).flat())
    };
    this.simpleLanguages = new Set(languagesList);
  }
  getAll() {
    var _a;
    return Array.from(new Set([...this.languagesList, ...Object.keys(this.languagesMaps.normal), ...Object.keys((_a = this.options.map) !== null && _a !== void 0 ? _a : {})]));
  }
  get(language) {
    var _a, _b;
    const mappedLanguage = this.getMappedLanguage(language);
    if (mappedLanguage) return mappedLanguage;
    // Return mapped language
    const languageAliases = this.languagesMaps.normal[language];
    // Check if key is exists
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (languageAliases) return (_a = this.getMappedLanguage(languageAliases[0])) !== null && _a !== void 0 ? _a : languageAliases[0];
    // Return language in list
    if (this.simpleLanguages.has(language)) return (_b = this.getMappedLanguage(language)) !== null && _b !== void 0 ? _b : language;
    return null;
  }
  getMappedLanguage(language) {
    const {
      map = {}
    } = this.options;
    // Return mapped language
    return language in map ? map[language] : null;
  }
}
LanguageAliases$1.LanguageAliases = LanguageAliases;

(function (exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var _codes = codes;
	Object.keys(_codes).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  if (key in exports && exports[key] === _codes[key]) return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function () {
	      return _codes[key];
	    }
	  });
	});
	var _LanguageAliases = LanguageAliases$1;
	Object.keys(_LanguageAliases).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  if (key in exports && exports[key] === _LanguageAliases[key]) return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function () {
	      return _LanguageAliases[key];
	    }
	  });
	});
	
} (languages$1));

var LLMTranslator$1 = {};

var zod = {};

var external = {};

var core$4 = {};

var core$3 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.globalConfig = exports.$ZodEncodeError = exports.$ZodAsyncError = exports.$brand = exports.NEVER = void 0;
	exports.$constructor = $constructor;
	exports.config = config;
	/** A special constant with type `never` */
	exports.NEVER = Object.freeze({
	    status: "aborted",
	});
	function $constructor(name, initializer, params) {
	    function init(inst, def) {
	        var _a;
	        Object.defineProperty(inst, "_zod", {
	            value: inst._zod ?? {},
	            enumerable: false,
	        });
	        (_a = inst._zod).traits ?? (_a.traits = new Set());
	        inst._zod.traits.add(name);
	        initializer(inst, def);
	        // support prototype modifications
	        for (const k in _.prototype) {
	            if (!(k in inst))
	                Object.defineProperty(inst, k, { value: _.prototype[k].bind(inst) });
	        }
	        inst._zod.constr = _;
	        inst._zod.def = def;
	    }
	    // doesn't work if Parent has a constructor with arguments
	    const Parent = params?.Parent ?? Object;
	    class Definition extends Parent {
	    }
	    Object.defineProperty(Definition, "name", { value: name });
	    function _(def) {
	        var _a;
	        const inst = params?.Parent ? new Definition() : this;
	        init(inst, def);
	        (_a = inst._zod).deferred ?? (_a.deferred = []);
	        for (const fn of inst._zod.deferred) {
	            fn();
	        }
	        return inst;
	    }
	    Object.defineProperty(_, "init", { value: init });
	    Object.defineProperty(_, Symbol.hasInstance, {
	        value: (inst) => {
	            if (params?.Parent && inst instanceof params.Parent)
	                return true;
	            return inst?._zod?.traits?.has(name);
	        },
	    });
	    Object.defineProperty(_, "name", { value: name });
	    return _;
	}
	//////////////////////////////   UTILITIES   ///////////////////////////////////////
	exports.$brand = Symbol("zod_brand");
	class $ZodAsyncError extends Error {
	    constructor() {
	        super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
	    }
	}
	exports.$ZodAsyncError = $ZodAsyncError;
	class $ZodEncodeError extends Error {
	    constructor(name) {
	        super(`Encountered unidirectional transform during encode: ${name}`);
	        this.name = "ZodEncodeError";
	    }
	}
	exports.$ZodEncodeError = $ZodEncodeError;
	exports.globalConfig = {};
	function config(newConfig) {
	    if (newConfig)
	        Object.assign(exports.globalConfig, newConfig);
	    return exports.globalConfig;
	} 
} (core$3));

var parse$1 = {};

var errors$1 = {};

var util$3 = {};

Object.defineProperty(util$3, "__esModule", { value: true });
util$3.Class = util$3.BIGINT_FORMAT_RANGES = util$3.NUMBER_FORMAT_RANGES = util$3.primitiveTypes = util$3.propertyKeyTypes = util$3.getParsedType = util$3.allowsEval = util$3.captureStackTrace = void 0;
util$3.assertEqual = assertEqual;
util$3.assertNotEqual = assertNotEqual;
util$3.assertIs = assertIs;
util$3.assertNever = assertNever;
util$3.assert = assert;
util$3.getEnumValues = getEnumValues;
util$3.joinValues = joinValues;
util$3.jsonStringifyReplacer = jsonStringifyReplacer;
util$3.cached = cached;
util$3.nullish = nullish;
util$3.cleanRegex = cleanRegex;
util$3.floatSafeRemainder = floatSafeRemainder;
util$3.defineLazy = defineLazy;
util$3.objectClone = objectClone;
util$3.assignProp = assignProp;
util$3.mergeDefs = mergeDefs;
util$3.cloneDef = cloneDef;
util$3.getElementAtPath = getElementAtPath;
util$3.promiseAllObject = promiseAllObject;
util$3.randomString = randomString;
util$3.esc = esc;
util$3.isObject = isObject;
util$3.isPlainObject = isPlainObject;
util$3.shallowClone = shallowClone;
util$3.numKeys = numKeys;
util$3.escapeRegex = escapeRegex;
util$3.clone = clone;
util$3.normalizeParams = normalizeParams;
util$3.createTransparentProxy = createTransparentProxy;
util$3.stringifyPrimitive = stringifyPrimitive;
util$3.optionalKeys = optionalKeys;
util$3.pick = pick;
util$3.omit = omit;
util$3.extend = extend;
util$3.safeExtend = safeExtend;
util$3.merge = merge;
util$3.partial = partial;
util$3.required = required;
util$3.aborted = aborted;
util$3.prefixIssues = prefixIssues;
util$3.unwrapMessage = unwrapMessage;
util$3.finalizeIssue = finalizeIssue;
util$3.getSizableOrigin = getSizableOrigin;
util$3.getLengthableOrigin = getLengthableOrigin;
util$3.issue = issue;
util$3.cleanEnum = cleanEnum;
util$3.base64ToUint8Array = base64ToUint8Array;
util$3.uint8ArrayToBase64 = uint8ArrayToBase64;
util$3.base64urlToUint8Array = base64urlToUint8Array;
util$3.uint8ArrayToBase64url = uint8ArrayToBase64url;
util$3.hexToUint8Array = hexToUint8Array;
util$3.uint8ArrayToHex = uint8ArrayToHex;
// functions
function assertEqual(val) {
    return val;
}
function assertNotEqual(val) {
    return val;
}
function assertIs(_arg) { }
function assertNever(_x) {
    throw new Error();
}
function assert(_) { }
function getEnumValues(entries) {
    const numericValues = Object.values(entries).filter((v) => typeof v === "number");
    const values = Object.entries(entries)
        .filter(([k, _]) => numericValues.indexOf(+k) === -1)
        .map(([_, v]) => v);
    return values;
}
function joinValues(array, separator = "|") {
    return array.map((val) => stringifyPrimitive(val)).join(separator);
}
function jsonStringifyReplacer(_, value) {
    if (typeof value === "bigint")
        return value.toString();
    return value;
}
function cached(getter) {
    return {
        get value() {
            {
                const value = getter();
                Object.defineProperty(this, "value", { value });
                return value;
            }
        },
    };
}
function nullish(input) {
    return input === null || input === undefined;
}
function cleanRegex(source) {
    const start = source.startsWith("^") ? 1 : 0;
    const end = source.endsWith("$") ? source.length - 1 : source.length;
    return source.slice(start, end);
}
function floatSafeRemainder(val, step) {
    const valDecCount = (val.toString().split(".")[1] || "").length;
    const stepString = step.toString();
    let stepDecCount = (stepString.split(".")[1] || "").length;
    if (stepDecCount === 0 && /\d?e-\d?/.test(stepString)) {
        const match = stepString.match(/\d?e-(\d?)/);
        if (match?.[1]) {
            stepDecCount = Number.parseInt(match[1]);
        }
    }
    const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
    const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
    const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
    return (valInt % stepInt) / 10 ** decCount;
}
const EVALUATING = Symbol("evaluating");
function defineLazy(object, key, getter) {
    let value = undefined;
    Object.defineProperty(object, key, {
        get() {
            if (value === EVALUATING) {
                // Circular reference detected, return undefined to break the cycle
                return undefined;
            }
            if (value === undefined) {
                value = EVALUATING;
                value = getter();
            }
            return value;
        },
        set(v) {
            Object.defineProperty(object, key, {
                value: v,
                // configurable: true,
            });
            // object[key] = v;
        },
        configurable: true,
    });
}
function objectClone(obj) {
    return Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
}
function assignProp(target, prop, value) {
    Object.defineProperty(target, prop, {
        value,
        writable: true,
        enumerable: true,
        configurable: true,
    });
}
function mergeDefs(...defs) {
    const mergedDescriptors = {};
    for (const def of defs) {
        const descriptors = Object.getOwnPropertyDescriptors(def);
        Object.assign(mergedDescriptors, descriptors);
    }
    return Object.defineProperties({}, mergedDescriptors);
}
function cloneDef(schema) {
    return mergeDefs(schema._zod.def);
}
function getElementAtPath(obj, path) {
    if (!path)
        return obj;
    return path.reduce((acc, key) => acc?.[key], obj);
}
function promiseAllObject(promisesObj) {
    const keys = Object.keys(promisesObj);
    const promises = keys.map((key) => promisesObj[key]);
    return Promise.all(promises).then((results) => {
        const resolvedObj = {};
        for (let i = 0; i < keys.length; i++) {
            resolvedObj[keys[i]] = results[i];
        }
        return resolvedObj;
    });
}
function randomString(length = 10) {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    let str = "";
    for (let i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}
function esc(str) {
    return JSON.stringify(str);
}
util$3.captureStackTrace = ("captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => { });
function isObject(data) {
    return typeof data === "object" && data !== null && !Array.isArray(data);
}
util$3.allowsEval = cached(() => {
    // @ts-ignore
    if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) {
        return false;
    }
    try {
        const F = Function;
        new F("");
        return true;
    }
    catch (_) {
        return false;
    }
});
function isPlainObject(o) {
    if (isObject(o) === false)
        return false;
    // modified constructor
    const ctor = o.constructor;
    if (ctor === undefined)
        return true;
    // modified prototype
    const prot = ctor.prototype;
    if (isObject(prot) === false)
        return false;
    // ctor doesn't have static `isPrototypeOf`
    if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) {
        return false;
    }
    return true;
}
function shallowClone(o) {
    if (isPlainObject(o))
        return { ...o };
    return o;
}
function numKeys(data) {
    let keyCount = 0;
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            keyCount++;
        }
    }
    return keyCount;
}
const getParsedType = (data) => {
    const t = typeof data;
    switch (t) {
        case "undefined":
            return "undefined";
        case "string":
            return "string";
        case "number":
            return Number.isNaN(data) ? "nan" : "number";
        case "boolean":
            return "boolean";
        case "function":
            return "function";
        case "bigint":
            return "bigint";
        case "symbol":
            return "symbol";
        case "object":
            if (Array.isArray(data)) {
                return "array";
            }
            if (data === null) {
                return "null";
            }
            if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
                return "promise";
            }
            if (typeof Map !== "undefined" && data instanceof Map) {
                return "map";
            }
            if (typeof Set !== "undefined" && data instanceof Set) {
                return "set";
            }
            if (typeof Date !== "undefined" && data instanceof Date) {
                return "date";
            }
            // @ts-ignore
            if (typeof File !== "undefined" && data instanceof File) {
                return "file";
            }
            return "object";
        default:
            throw new Error(`Unknown data type: ${t}`);
    }
};
util$3.getParsedType = getParsedType;
util$3.propertyKeyTypes = new Set(["string", "number", "symbol"]);
util$3.primitiveTypes = new Set(["string", "number", "bigint", "boolean", "symbol", "undefined"]);
function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
// zod-specific utils
function clone(inst, def, params) {
    const cl = new inst._zod.constr(def ?? inst._zod.def);
    if (!def || params?.parent)
        cl._zod.parent = inst;
    return cl;
}
function normalizeParams(_params) {
    const params = _params;
    if (!params)
        return {};
    if (typeof params === "string")
        return { error: () => params };
    if (params?.message !== undefined) {
        if (params?.error !== undefined)
            throw new Error("Cannot specify both `message` and `error` params");
        params.error = params.message;
    }
    delete params.message;
    if (typeof params.error === "string")
        return { ...params, error: () => params.error };
    return params;
}
function createTransparentProxy(getter) {
    let target;
    return new Proxy({}, {
        get(_, prop, receiver) {
            target ?? (target = getter());
            return Reflect.get(target, prop, receiver);
        },
        set(_, prop, value, receiver) {
            target ?? (target = getter());
            return Reflect.set(target, prop, value, receiver);
        },
        has(_, prop) {
            target ?? (target = getter());
            return Reflect.has(target, prop);
        },
        deleteProperty(_, prop) {
            target ?? (target = getter());
            return Reflect.deleteProperty(target, prop);
        },
        ownKeys(_) {
            target ?? (target = getter());
            return Reflect.ownKeys(target);
        },
        getOwnPropertyDescriptor(_, prop) {
            target ?? (target = getter());
            return Reflect.getOwnPropertyDescriptor(target, prop);
        },
        defineProperty(_, prop, descriptor) {
            target ?? (target = getter());
            return Reflect.defineProperty(target, prop, descriptor);
        },
    });
}
function stringifyPrimitive(value) {
    if (typeof value === "bigint")
        return value.toString() + "n";
    if (typeof value === "string")
        return `"${value}"`;
    return `${value}`;
}
function optionalKeys(shape) {
    return Object.keys(shape).filter((k) => {
        return shape[k]._zod.optin === "optional" && shape[k]._zod.optout === "optional";
    });
}
util$3.NUMBER_FORMAT_RANGES = {
    safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
    int32: [-2147483648, 2147483647],
    uint32: [0, 4294967295],
    float32: [-3.4028234663852886e38, 3.4028234663852886e38],
    float64: [-Number.MAX_VALUE, Number.MAX_VALUE],
};
util$3.BIGINT_FORMAT_RANGES = {
    int64: [/* @__PURE__*/ BigInt("-9223372036854775808"), /* @__PURE__*/ BigInt("9223372036854775807")],
    uint64: [/* @__PURE__*/ BigInt(0), /* @__PURE__*/ BigInt("18446744073709551615")],
};
function pick(schema, mask) {
    const currDef = schema._zod.def;
    const def = mergeDefs(schema._zod.def, {
        get shape() {
            const newShape = {};
            for (const key in mask) {
                if (!(key in currDef.shape)) {
                    throw new Error(`Unrecognized key: "${key}"`);
                }
                if (!mask[key])
                    continue;
                newShape[key] = currDef.shape[key];
            }
            assignProp(this, "shape", newShape); // self-caching
            return newShape;
        },
        checks: [],
    });
    return clone(schema, def);
}
function omit(schema, mask) {
    const currDef = schema._zod.def;
    const def = mergeDefs(schema._zod.def, {
        get shape() {
            const newShape = { ...schema._zod.def.shape };
            for (const key in mask) {
                if (!(key in currDef.shape)) {
                    throw new Error(`Unrecognized key: "${key}"`);
                }
                if (!mask[key])
                    continue;
                delete newShape[key];
            }
            assignProp(this, "shape", newShape); // self-caching
            return newShape;
        },
        checks: [],
    });
    return clone(schema, def);
}
function extend(schema, shape) {
    if (!isPlainObject(shape)) {
        throw new Error("Invalid input to extend: expected a plain object");
    }
    const checks = schema._zod.def.checks;
    const hasChecks = checks && checks.length > 0;
    if (hasChecks) {
        throw new Error("Object schemas containing refinements cannot be extended. Use `.safeExtend()` instead.");
    }
    const def = mergeDefs(schema._zod.def, {
        get shape() {
            const _shape = { ...schema._zod.def.shape, ...shape };
            assignProp(this, "shape", _shape); // self-caching
            return _shape;
        },
        checks: [],
    });
    return clone(schema, def);
}
function safeExtend(schema, shape) {
    if (!isPlainObject(shape)) {
        throw new Error("Invalid input to safeExtend: expected a plain object");
    }
    const def = {
        ...schema._zod.def,
        get shape() {
            const _shape = { ...schema._zod.def.shape, ...shape };
            assignProp(this, "shape", _shape); // self-caching
            return _shape;
        },
        checks: schema._zod.def.checks,
    };
    return clone(schema, def);
}
function merge(a, b) {
    const def = mergeDefs(a._zod.def, {
        get shape() {
            const _shape = { ...a._zod.def.shape, ...b._zod.def.shape };
            assignProp(this, "shape", _shape); // self-caching
            return _shape;
        },
        get catchall() {
            return b._zod.def.catchall;
        },
        checks: [], // delete existing checks
    });
    return clone(a, def);
}
function partial(Class, schema, mask) {
    const def = mergeDefs(schema._zod.def, {
        get shape() {
            const oldShape = schema._zod.def.shape;
            const shape = { ...oldShape };
            if (mask) {
                for (const key in mask) {
                    if (!(key in oldShape)) {
                        throw new Error(`Unrecognized key: "${key}"`);
                    }
                    if (!mask[key])
                        continue;
                    // if (oldShape[key]!._zod.optin === "optional") continue;
                    shape[key] = Class
                        ? new Class({
                            type: "optional",
                            innerType: oldShape[key],
                        })
                        : oldShape[key];
                }
            }
            else {
                for (const key in oldShape) {
                    // if (oldShape[key]!._zod.optin === "optional") continue;
                    shape[key] = Class
                        ? new Class({
                            type: "optional",
                            innerType: oldShape[key],
                        })
                        : oldShape[key];
                }
            }
            assignProp(this, "shape", shape); // self-caching
            return shape;
        },
        checks: [],
    });
    return clone(schema, def);
}
function required(Class, schema, mask) {
    const def = mergeDefs(schema._zod.def, {
        get shape() {
            const oldShape = schema._zod.def.shape;
            const shape = { ...oldShape };
            if (mask) {
                for (const key in mask) {
                    if (!(key in shape)) {
                        throw new Error(`Unrecognized key: "${key}"`);
                    }
                    if (!mask[key])
                        continue;
                    // overwrite with non-optional
                    shape[key] = new Class({
                        type: "nonoptional",
                        innerType: oldShape[key],
                    });
                }
            }
            else {
                for (const key in oldShape) {
                    // overwrite with non-optional
                    shape[key] = new Class({
                        type: "nonoptional",
                        innerType: oldShape[key],
                    });
                }
            }
            assignProp(this, "shape", shape); // self-caching
            return shape;
        },
        checks: [],
    });
    return clone(schema, def);
}
// invalid_type | too_big | too_small | invalid_format | not_multiple_of | unrecognized_keys | invalid_union | invalid_key | invalid_element | invalid_value | custom
function aborted(x, startIndex = 0) {
    if (x.aborted === true)
        return true;
    for (let i = startIndex; i < x.issues.length; i++) {
        if (x.issues[i]?.continue !== true) {
            return true;
        }
    }
    return false;
}
function prefixIssues(path, issues) {
    return issues.map((iss) => {
        var _a;
        (_a = iss).path ?? (_a.path = []);
        iss.path.unshift(path);
        return iss;
    });
}
function unwrapMessage(message) {
    return typeof message === "string" ? message : message?.message;
}
function finalizeIssue(iss, ctx, config) {
    const full = { ...iss, path: iss.path ?? [] };
    // for backwards compatibility
    if (!iss.message) {
        const message = unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ??
            unwrapMessage(ctx?.error?.(iss)) ??
            unwrapMessage(config.customError?.(iss)) ??
            unwrapMessage(config.localeError?.(iss)) ??
            "Invalid input";
        full.message = message;
    }
    // delete (full as any).def;
    delete full.inst;
    delete full.continue;
    if (!ctx?.reportInput) {
        delete full.input;
    }
    return full;
}
function getSizableOrigin(input) {
    if (input instanceof Set)
        return "set";
    if (input instanceof Map)
        return "map";
    // @ts-ignore
    if (input instanceof File)
        return "file";
    return "unknown";
}
function getLengthableOrigin(input) {
    if (Array.isArray(input))
        return "array";
    if (typeof input === "string")
        return "string";
    return "unknown";
}
function issue(...args) {
    const [iss, input, inst] = args;
    if (typeof iss === "string") {
        return {
            message: iss,
            code: "custom",
            input,
            inst,
        };
    }
    return { ...iss };
}
function cleanEnum(obj) {
    return Object.entries(obj)
        .filter(([k, _]) => {
        // return true if NaN, meaning it's not a number, thus a string key
        return Number.isNaN(Number.parseInt(k, 10));
    })
        .map((el) => el[1]);
}
// Codec utility functions
function base64ToUint8Array(base64) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}
function uint8ArrayToBase64(bytes) {
    let binaryString = "";
    for (let i = 0; i < bytes.length; i++) {
        binaryString += String.fromCharCode(bytes[i]);
    }
    return btoa(binaryString);
}
function base64urlToUint8Array(base64url) {
    const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
    const padding = "=".repeat((4 - (base64.length % 4)) % 4);
    return base64ToUint8Array(base64 + padding);
}
function uint8ArrayToBase64url(bytes) {
    return uint8ArrayToBase64(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function hexToUint8Array(hex) {
    const cleanHex = hex.replace(/^0x/, "");
    if (cleanHex.length % 2 !== 0) {
        throw new Error("Invalid hex string length");
    }
    const bytes = new Uint8Array(cleanHex.length / 2);
    for (let i = 0; i < cleanHex.length; i += 2) {
        bytes[i / 2] = Number.parseInt(cleanHex.slice(i, i + 2), 16);
    }
    return bytes;
}
function uint8ArrayToHex(bytes) {
    return Array.from(bytes)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
}
// instanceof
class Class {
    constructor(..._args) { }
}
util$3.Class = Class;

var __createBinding$4 = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault$4 = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar$4 = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding$4(result, mod, k);
    __setModuleDefault$4(result, mod);
    return result;
};
Object.defineProperty(errors$1, "__esModule", { value: true });
errors$1.$ZodRealError = errors$1.$ZodError = void 0;
errors$1.flattenError = flattenError;
errors$1.formatError = formatError;
errors$1.treeifyError = treeifyError;
errors$1.toDotPath = toDotPath;
errors$1.prettifyError = prettifyError;
const core_js_1 = core$3;
const util$2 = __importStar$4(util$3);
const initializer$1 = (inst, def) => {
    inst.name = "$ZodError";
    Object.defineProperty(inst, "_zod", {
        value: inst._zod,
        enumerable: false,
    });
    Object.defineProperty(inst, "issues", {
        value: def,
        enumerable: false,
    });
    inst.message = JSON.stringify(def, util$2.jsonStringifyReplacer, 2);
    Object.defineProperty(inst, "toString", {
        value: () => inst.message,
        enumerable: false,
    });
};
errors$1.$ZodError = (0, core_js_1.$constructor)("$ZodError", initializer$1);
errors$1.$ZodRealError = (0, core_js_1.$constructor)("$ZodError", initializer$1, { Parent: Error });
function flattenError(error, mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of error.issues) {
        if (sub.path.length > 0) {
            fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
            fieldErrors[sub.path[0]].push(mapper(sub));
        }
        else {
            formErrors.push(mapper(sub));
        }
    }
    return { formErrors, fieldErrors };
}
function formatError(error, _mapper) {
    const mapper = _mapper ||
        function (issue) {
            return issue.message;
        };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
        for (const issue of error.issues) {
            if (issue.code === "invalid_union" && issue.errors.length) {
                issue.errors.map((issues) => processError({ issues }));
            }
            else if (issue.code === "invalid_key") {
                processError({ issues: issue.issues });
            }
            else if (issue.code === "invalid_element") {
                processError({ issues: issue.issues });
            }
            else if (issue.path.length === 0) {
                fieldErrors._errors.push(mapper(issue));
            }
            else {
                let curr = fieldErrors;
                let i = 0;
                while (i < issue.path.length) {
                    const el = issue.path[i];
                    const terminal = i === issue.path.length - 1;
                    if (!terminal) {
                        curr[el] = curr[el] || { _errors: [] };
                    }
                    else {
                        curr[el] = curr[el] || { _errors: [] };
                        curr[el]._errors.push(mapper(issue));
                    }
                    curr = curr[el];
                    i++;
                }
            }
        }
    };
    processError(error);
    return fieldErrors;
}
function treeifyError(error, _mapper) {
    const mapper = _mapper ||
        function (issue) {
            return issue.message;
        };
    const result = { errors: [] };
    const processError = (error, path = []) => {
        var _a, _b;
        for (const issue of error.issues) {
            if (issue.code === "invalid_union" && issue.errors.length) {
                // regular union error
                issue.errors.map((issues) => processError({ issues }, issue.path));
            }
            else if (issue.code === "invalid_key") {
                processError({ issues: issue.issues }, issue.path);
            }
            else if (issue.code === "invalid_element") {
                processError({ issues: issue.issues }, issue.path);
            }
            else {
                const fullpath = [...path, ...issue.path];
                if (fullpath.length === 0) {
                    result.errors.push(mapper(issue));
                    continue;
                }
                let curr = result;
                let i = 0;
                while (i < fullpath.length) {
                    const el = fullpath[i];
                    const terminal = i === fullpath.length - 1;
                    if (typeof el === "string") {
                        curr.properties ?? (curr.properties = {});
                        (_a = curr.properties)[el] ?? (_a[el] = { errors: [] });
                        curr = curr.properties[el];
                    }
                    else {
                        curr.items ?? (curr.items = []);
                        (_b = curr.items)[el] ?? (_b[el] = { errors: [] });
                        curr = curr.items[el];
                    }
                    if (terminal) {
                        curr.errors.push(mapper(issue));
                    }
                    i++;
                }
            }
        }
    };
    processError(error);
    return result;
}
/** Format a ZodError as a human-readable string in the following form.
 *
 * From
 *
 * ```ts
 * ZodError {
 *   issues: [
 *     {
 *       expected: 'string',
 *       code: 'invalid_type',
 *       path: [ 'username' ],
 *       message: 'Invalid input: expected string'
 *     },
 *     {
 *       expected: 'number',
 *       code: 'invalid_type',
 *       path: [ 'favoriteNumbers', 1 ],
 *       message: 'Invalid input: expected number'
 *     }
 *   ];
 * }
 * ```
 *
 * to
 *
 * ```
 * username
 *   ✖ Expected number, received string at "username
 * favoriteNumbers[0]
 *   ✖ Invalid input: expected number
 * ```
 */
function toDotPath(_path) {
    const segs = [];
    const path = _path.map((seg) => (typeof seg === "object" ? seg.key : seg));
    for (const seg of path) {
        if (typeof seg === "number")
            segs.push(`[${seg}]`);
        else if (typeof seg === "symbol")
            segs.push(`[${JSON.stringify(String(seg))}]`);
        else if (/[^\w$]/.test(seg))
            segs.push(`[${JSON.stringify(seg)}]`);
        else {
            if (segs.length)
                segs.push(".");
            segs.push(seg);
        }
    }
    return segs.join("");
}
function prettifyError(error) {
    const lines = [];
    // sort by path length
    const issues = [...error.issues].sort((a, b) => (a.path ?? []).length - (b.path ?? []).length);
    // Process each issue
    for (const issue of issues) {
        lines.push(`✖ ${issue.message}`);
        if (issue.path?.length)
            lines.push(`  → at ${toDotPath(issue.path)}`);
    }
    // Convert Map to formatted string
    return lines.join("\n");
}

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.safeDecodeAsync = exports._safeDecodeAsync = exports.safeEncodeAsync = exports._safeEncodeAsync = exports.safeDecode = exports._safeDecode = exports.safeEncode = exports._safeEncode = exports.decodeAsync = exports._decodeAsync = exports.encodeAsync = exports._encodeAsync = exports.decode = exports._decode = exports.encode = exports._encode = exports.safeParseAsync = exports._safeParseAsync = exports.safeParse = exports._safeParse = exports.parseAsync = exports._parseAsync = exports.parse = exports._parse = void 0;
	const core = __importStar(core$3);
	const errors = __importStar(errors$1);
	const util = __importStar(util$3);
	const _parse = (_Err) => (schema, value, _ctx, _params) => {
	    const ctx = _ctx ? Object.assign(_ctx, { async: false }) : { async: false };
	    const result = schema._zod.run({ value, issues: [] }, ctx);
	    if (result instanceof Promise) {
	        throw new core.$ZodAsyncError();
	    }
	    if (result.issues.length) {
	        const e = new (_params?.Err ?? _Err)(result.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config())));
	        util.captureStackTrace(e, _params?.callee);
	        throw e;
	    }
	    return result.value;
	};
	exports._parse = _parse;
	exports.parse = (0, exports._parse)(errors.$ZodRealError);
	const _parseAsync = (_Err) => async (schema, value, _ctx, params) => {
	    const ctx = _ctx ? Object.assign(_ctx, { async: true }) : { async: true };
	    let result = schema._zod.run({ value, issues: [] }, ctx);
	    if (result instanceof Promise)
	        result = await result;
	    if (result.issues.length) {
	        const e = new (params?.Err ?? _Err)(result.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config())));
	        util.captureStackTrace(e, params?.callee);
	        throw e;
	    }
	    return result.value;
	};
	exports._parseAsync = _parseAsync;
	exports.parseAsync = (0, exports._parseAsync)(errors.$ZodRealError);
	const _safeParse = (_Err) => (schema, value, _ctx) => {
	    const ctx = _ctx ? { ..._ctx, async: false } : { async: false };
	    const result = schema._zod.run({ value, issues: [] }, ctx);
	    if (result instanceof Promise) {
	        throw new core.$ZodAsyncError();
	    }
	    return result.issues.length
	        ? {
	            success: false,
	            error: new (_Err ?? errors.$ZodError)(result.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config()))),
	        }
	        : { success: true, data: result.value };
	};
	exports._safeParse = _safeParse;
	exports.safeParse = (0, exports._safeParse)(errors.$ZodRealError);
	const _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
	    const ctx = _ctx ? Object.assign(_ctx, { async: true }) : { async: true };
	    let result = schema._zod.run({ value, issues: [] }, ctx);
	    if (result instanceof Promise)
	        result = await result;
	    return result.issues.length
	        ? {
	            success: false,
	            error: new _Err(result.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config()))),
	        }
	        : { success: true, data: result.value };
	};
	exports._safeParseAsync = _safeParseAsync;
	exports.safeParseAsync = (0, exports._safeParseAsync)(errors.$ZodRealError);
	const _encode = (_Err) => (schema, value, _ctx) => {
	    const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
	    return (0, exports._parse)(_Err)(schema, value, ctx);
	};
	exports._encode = _encode;
	exports.encode = (0, exports._encode)(errors.$ZodRealError);
	const _decode = (_Err) => (schema, value, _ctx) => {
	    return (0, exports._parse)(_Err)(schema, value, _ctx);
	};
	exports._decode = _decode;
	exports.decode = (0, exports._decode)(errors.$ZodRealError);
	const _encodeAsync = (_Err) => async (schema, value, _ctx) => {
	    const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
	    return (0, exports._parseAsync)(_Err)(schema, value, ctx);
	};
	exports._encodeAsync = _encodeAsync;
	exports.encodeAsync = (0, exports._encodeAsync)(errors.$ZodRealError);
	const _decodeAsync = (_Err) => async (schema, value, _ctx) => {
	    return (0, exports._parseAsync)(_Err)(schema, value, _ctx);
	};
	exports._decodeAsync = _decodeAsync;
	exports.decodeAsync = (0, exports._decodeAsync)(errors.$ZodRealError);
	const _safeEncode = (_Err) => (schema, value, _ctx) => {
	    const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
	    return (0, exports._safeParse)(_Err)(schema, value, ctx);
	};
	exports._safeEncode = _safeEncode;
	exports.safeEncode = (0, exports._safeEncode)(errors.$ZodRealError);
	const _safeDecode = (_Err) => (schema, value, _ctx) => {
	    return (0, exports._safeParse)(_Err)(schema, value, _ctx);
	};
	exports._safeDecode = _safeDecode;
	exports.safeDecode = (0, exports._safeDecode)(errors.$ZodRealError);
	const _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
	    const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
	    return (0, exports._safeParseAsync)(_Err)(schema, value, ctx);
	};
	exports._safeEncodeAsync = _safeEncodeAsync;
	exports.safeEncodeAsync = (0, exports._safeEncodeAsync)(errors.$ZodRealError);
	const _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
	    return (0, exports._safeParseAsync)(_Err)(schema, value, _ctx);
	};
	exports._safeDecodeAsync = _safeDecodeAsync;
	exports.safeDecodeAsync = (0, exports._safeDecodeAsync)(errors.$ZodRealError); 
} (parse$1));

var schemas$3 = {};

var checks$2 = {};

var regexes = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.sha384_base64 = exports.sha384_hex = exports.sha256_base64url = exports.sha256_base64 = exports.sha256_hex = exports.sha1_base64url = exports.sha1_base64 = exports.sha1_hex = exports.md5_base64url = exports.md5_base64 = exports.md5_hex = exports.hex = exports.uppercase = exports.lowercase = exports.undefined = exports.null = exports.boolean = exports.number = exports.integer = exports.bigint = exports.string = exports.date = exports.e164 = exports.domain = exports.hostname = exports.base64url = exports.base64 = exports.cidrv6 = exports.cidrv4 = exports.ipv6 = exports.ipv4 = exports.browserEmail = exports.idnEmail = exports.unicodeEmail = exports.rfc5322Email = exports.html5Email = exports.email = exports.uuid7 = exports.uuid6 = exports.uuid4 = exports.uuid = exports.guid = exports.extendedDuration = exports.duration = exports.nanoid = exports.ksuid = exports.xid = exports.ulid = exports.cuid2 = exports.cuid = void 0;
	exports.sha512_base64url = exports.sha512_base64 = exports.sha512_hex = exports.sha384_base64url = void 0;
	exports.emoji = emoji;
	exports.time = time;
	exports.datetime = datetime;
	exports.cuid = /^[cC][^\s-]{8,}$/;
	exports.cuid2 = /^[0-9a-z]+$/;
	exports.ulid = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/;
	exports.xid = /^[0-9a-vA-V]{20}$/;
	exports.ksuid = /^[A-Za-z0-9]{27}$/;
	exports.nanoid = /^[a-zA-Z0-9_-]{21}$/;
	/** ISO 8601-1 duration regex. Does not support the 8601-2 extensions like negative durations or fractional/negative components. */
	exports.duration = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
	/** Implements ISO 8601-2 extensions like explicit +- prefixes, mixing weeks with other units, and fractional/negative components. */
	exports.extendedDuration = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
	/** A regex for any UUID-like identifier: 8-4-4-4-12 hex pattern */
	exports.guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
	/** Returns a regex for validating an RFC 9562/4122 UUID.
	 *
	 * @param version Optionally specify a version 1-8. If no version is specified, all versions are supported. */
	const uuid = (version) => {
	    if (!version)
	        return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
	    return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
	};
	exports.uuid = uuid;
	exports.uuid4 = (0, exports.uuid)(4);
	exports.uuid6 = (0, exports.uuid)(6);
	exports.uuid7 = (0, exports.uuid)(7);
	/** Practical email validation */
	exports.email = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
	/** Equivalent to the HTML5 input[type=email] validation implemented by browsers. Source: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email */
	exports.html5Email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	/** The classic emailregex.com regex for RFC 5322-compliant emails */
	exports.rfc5322Email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	/** A loose regex that allows Unicode characters, enforces length limits, and that's about it. */
	exports.unicodeEmail = /^[^\s@"]{1,64}@[^\s@]{1,255}$/u;
	exports.idnEmail = /^[^\s@"]{1,64}@[^\s@]{1,255}$/u;
	exports.browserEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	// from https://thekevinscott.com/emojis-in-javascript/#writing-a-regular-expression
	const _emoji = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
	function emoji() {
	    return new RegExp(_emoji, "u");
	}
	exports.ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
	exports.ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})$/;
	exports.cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
	exports.cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
	// https://stackoverflow.com/questions/7860392/determine-if-string-is-in-base64-using-javascript
	exports.base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
	exports.base64url = /^[A-Za-z0-9_-]*$/;
	// based on https://stackoverflow.com/questions/106179/regular-expression-to-match-dns-hostname-or-ip-address
	// export const hostname: RegExp = /^([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+$/;
	exports.hostname = /^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/;
	exports.domain = /^([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
	// https://blog.stevenlevithan.com/archives/validate-phone-number#r4-3 (regex sans spaces)
	exports.e164 = /^\+(?:[0-9]){6,14}[0-9]$/;
	// const dateSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
	const dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
	exports.date = new RegExp(`^${dateSource}$`);
	function timeSource(args) {
	    const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
	    const regex = typeof args.precision === "number"
	        ? args.precision === -1
	            ? `${hhmm}`
	            : args.precision === 0
	                ? `${hhmm}:[0-5]\\d`
	                : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}`
	        : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
	    return regex;
	}
	function time(args) {
	    return new RegExp(`^${timeSource(args)}$`);
	}
	// Adapted from https://stackoverflow.com/a/3143231
	function datetime(args) {
	    const time = timeSource({ precision: args.precision });
	    const opts = ["Z"];
	    if (args.local)
	        opts.push("");
	    // if (args.offset) opts.push(`([+-]\\d{2}:\\d{2})`);
	    if (args.offset)
	        opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
	    const timeRegex = `${time}(?:${opts.join("|")})`;
	    return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
	}
	const string = (params) => {
	    const regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : `[\\s\\S]*`;
	    return new RegExp(`^${regex}$`);
	};
	exports.string = string;
	exports.bigint = /^\d+n?$/;
	exports.integer = /^\d+$/;
	exports.number = /^-?\d+(?:\.\d+)?/i;
	exports.boolean = /true|false/i;
	const _null = /null/i;
	exports.null = _null;
	const _undefined = /undefined/i;
	exports.undefined = _undefined;
	// regex for string with no uppercase letters
	exports.lowercase = /^[^A-Z]*$/;
	// regex for string with no lowercase letters
	exports.uppercase = /^[^a-z]*$/;
	// regex for hexadecimal strings (any length)
	exports.hex = /^[0-9a-fA-F]*$/;
	// Hash regexes for different algorithms and encodings
	// Helper function to create base64 regex with exact length and padding
	function fixedBase64(bodyLength, padding) {
	    return new RegExp(`^[A-Za-z0-9+/]{${bodyLength}}${padding}$`);
	}
	// Helper function to create base64url regex with exact length (no padding)
	function fixedBase64url(length) {
	    return new RegExp(`^[A-Za-z0-9-_]{${length}}$`);
	}
	// MD5 (16 bytes): base64 = 24 chars total (22 + "==")
	exports.md5_hex = /^[0-9a-fA-F]{32}$/;
	exports.md5_base64 = fixedBase64(22, "==");
	exports.md5_base64url = fixedBase64url(22);
	// SHA1 (20 bytes): base64 = 28 chars total (27 + "=")
	exports.sha1_hex = /^[0-9a-fA-F]{40}$/;
	exports.sha1_base64 = fixedBase64(27, "=");
	exports.sha1_base64url = fixedBase64url(27);
	// SHA256 (32 bytes): base64 = 44 chars total (43 + "=")
	exports.sha256_hex = /^[0-9a-fA-F]{64}$/;
	exports.sha256_base64 = fixedBase64(43, "=");
	exports.sha256_base64url = fixedBase64url(43);
	// SHA384 (48 bytes): base64 = 64 chars total (no padding)
	exports.sha384_hex = /^[0-9a-fA-F]{96}$/;
	exports.sha384_base64 = fixedBase64(64, "");
	exports.sha384_base64url = fixedBase64url(64);
	// SHA512 (64 bytes): base64 = 88 chars total (86 + "==")
	exports.sha512_hex = /^[0-9a-fA-F]{128}$/;
	exports.sha512_base64 = fixedBase64(86, "==");
	exports.sha512_base64url = fixedBase64url(86); 
} (regexes));

(function (exports) {
	// import { $ZodType } from "./schemas.js";
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.$ZodCheckOverwrite = exports.$ZodCheckMimeType = exports.$ZodCheckProperty = exports.$ZodCheckEndsWith = exports.$ZodCheckStartsWith = exports.$ZodCheckIncludes = exports.$ZodCheckUpperCase = exports.$ZodCheckLowerCase = exports.$ZodCheckRegex = exports.$ZodCheckStringFormat = exports.$ZodCheckLengthEquals = exports.$ZodCheckMinLength = exports.$ZodCheckMaxLength = exports.$ZodCheckSizeEquals = exports.$ZodCheckMinSize = exports.$ZodCheckMaxSize = exports.$ZodCheckBigIntFormat = exports.$ZodCheckNumberFormat = exports.$ZodCheckMultipleOf = exports.$ZodCheckGreaterThan = exports.$ZodCheckLessThan = exports.$ZodCheck = void 0;
	const core = __importStar(core$3);
	const regexes$1 = __importStar(regexes);
	const util = __importStar(util$3);
	exports.$ZodCheck = core.$constructor("$ZodCheck", (inst, def) => {
	    var _a;
	    inst._zod ?? (inst._zod = {});
	    inst._zod.def = def;
	    (_a = inst._zod).onattach ?? (_a.onattach = []);
	});
	const numericOriginMap = {
	    number: "number",
	    bigint: "bigint",
	    object: "date",
	};
	exports.$ZodCheckLessThan = core.$constructor("$ZodCheckLessThan", (inst, def) => {
	    exports.$ZodCheck.init(inst, def);
	    const origin = numericOriginMap[typeof def.value];
	    inst._zod.onattach.push((inst) => {
	        const bag = inst._zod.bag;
	        const curr = (def.inclusive ? bag.maximum : bag.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
	        if (def.value < curr) {
	            if (def.inclusive)
	                bag.maximum = def.value;
	            else
	                bag.exclusiveMaximum = def.value;
	        }
	    });
	    inst._zod.check = (payload) => {
	        if (def.inclusive ? payload.value <= def.value : payload.value < def.value) {
	            return;
	        }
	        payload.issues.push({
	            origin,
	            code: "too_big",
	            maximum: def.value,
	            input: payload.value,
	            inclusive: def.inclusive,
	            inst,
	            continue: !def.abort,
	        });
	    };
	});
	exports.$ZodCheckGreaterThan = core.$constructor("$ZodCheckGreaterThan", (inst, def) => {
	    exports.$ZodCheck.init(inst, def);
	    const origin = numericOriginMap[typeof def.value];
	    inst._zod.onattach.push((inst) => {
	        const bag = inst._zod.bag;
	        const curr = (def.inclusive ? bag.minimum : bag.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
	        if (def.value > curr) {
	            if (def.inclusive)
	                bag.minimum = def.value;
	            else
	                bag.exclusiveMinimum = def.value;
	        }
	    });
	    inst._zod.check = (payload) => {
	        if (def.inclusive ? payload.value >= def.value : payload.value > def.value) {
	            return;
	        }
	        payload.issues.push({
	            origin,
	            code: "too_small",
	            minimum: def.value,
	            input: payload.value,
	            inclusive: def.inclusive,
	            inst,
	            continue: !def.abort,
	        });
	    };
	});
	exports.$ZodCheckMultipleOf = 
	/*@__PURE__*/ core.$constructor("$ZodCheckMultipleOf", (inst, def) => {
	    exports.$ZodCheck.init(inst, def);
	    inst._zod.onattach.push((inst) => {
	        var _a;
	        (_a = inst._zod.bag).multipleOf ?? (_a.multipleOf = def.value);
	    });
	    inst._zod.check = (payload) => {
	        if (typeof payload.value !== typeof def.value)
	            throw new Error("Cannot mix number and bigint in multiple_of check.");
	        const isMultiple = typeof payload.value === "bigint"
	            ? payload.value % def.value === BigInt(0)
	            : util.floatSafeRemainder(payload.value, def.value) === 0;
	        if (isMultiple)
	            return;
	        payload.issues.push({
	            origin: typeof payload.value,
	            code: "not_multiple_of",
	            divisor: def.value,
	            input: payload.value,
	            inst,
	            continue: !def.abort,
	        });
	    };
	});
	exports.$ZodCheckNumberFormat = core.$constructor("$ZodCheckNumberFormat", (inst, def) => {
	    exports.$ZodCheck.init(inst, def); // no format checks
	    def.format = def.format || "float64";
	    const isInt = def.format?.includes("int");
	    const origin = isInt ? "int" : "number";
	    const [minimum, maximum] = util.NUMBER_FORMAT_RANGES[def.format];
	    inst._zod.onattach.push((inst) => {
	        const bag = inst._zod.bag;
	        bag.format = def.format;
	        bag.minimum = minimum;
	        bag.maximum = maximum;
	        if (isInt)
	            bag.pattern = regexes$1.integer;
	    });
	    inst._zod.check = (payload) => {
	        const input = payload.value;
	        if (isInt) {
	            if (!Number.isInteger(input)) {
	                // invalid_format issue
	                // payload.issues.push({
	                //   expected: def.format,
	                //   format: def.format,
	                //   code: "invalid_format",
	                //   input,
	                //   inst,
	                // });
	                // invalid_type issue
	                payload.issues.push({
	                    expected: origin,
	                    format: def.format,
	                    code: "invalid_type",
	                    continue: false,
	                    input,
	                    inst,
	                });
	                return;
	                // not_multiple_of issue
	                // payload.issues.push({
	                //   code: "not_multiple_of",
	                //   origin: "number",
	                //   input,
	                //   inst,
	                //   divisor: 1,
	                // });
	            }
	            if (!Number.isSafeInteger(input)) {
	                if (input > 0) {
	                    // too_big
	                    payload.issues.push({
	                        input,
	                        code: "too_big",
	                        maximum: Number.MAX_SAFE_INTEGER,
	                        note: "Integers must be within the safe integer range.",
	                        inst,
	                        origin,
	                        continue: !def.abort,
	                    });
	                }
	                else {
	                    // too_small
	                    payload.issues.push({
	                        input,
	                        code: "too_small",
	                        minimum: Number.MIN_SAFE_INTEGER,
	                        note: "Integers must be within the safe integer range.",
	                        inst,
	                        origin,
	                        continue: !def.abort,
	                    });
	                }
	                return;
	            }
	        }
	        if (input < minimum) {
	            payload.issues.push({
	                origin: "number",
	                input,
	                code: "too_small",
	                minimum,
	                inclusive: true,
	                inst,
	                continue: !def.abort,
	            });
	        }
	        if (input > maximum) {
	            payload.issues.push({
	                origin: "number",
	                input,
	                code: "too_big",
	                maximum,
	                inst,
	            });
	        }
	    };
	});
	exports.$ZodCheckBigIntFormat = core.$constructor("$ZodCheckBigIntFormat", (inst, def) => {
	    exports.$ZodCheck.init(inst, def); // no format checks
	    const [minimum, maximum] = util.BIGINT_FORMAT_RANGES[def.format];
	    inst._zod.onattach.push((inst) => {
	        const bag = inst._zod.bag;
	        bag.format = def.format;
	        bag.minimum = minimum;
	        bag.maximum = maximum;
	    });
	    inst._zod.check = (payload) => {
	        const input = payload.value;
	        if (input < minimum) {
	            payload.issues.push({
	                origin: "bigint",
	                input,
	                code: "too_small",
	                minimum: minimum,
	                inclusive: true,
	                inst,
	                continue: !def.abort,
	            });
	        }
	        if (input > maximum) {
	            payload.issues.push({
	                origin: "bigint",
	                input,
	                code: "too_big",
	                maximum,
	                inst,
	            });
	        }
	    };
	});
	exports.$ZodCheckMaxSize = core.$constructor("$ZodCheckMaxSize", (inst, def) => {
	    var _a;
	    exports.$ZodCheck.init(inst, def);
	    (_a = inst._zod.def).when ?? (_a.when = (payload) => {
	        const val = payload.value;
	        return !util.nullish(val) && val.size !== undefined;
	    });
	    inst._zod.onattach.push((inst) => {
	        const curr = (inst._zod.bag.maximum ?? Number.POSITIVE_INFINITY);
	        if (def.maximum < curr)
	            inst._zod.bag.maximum = def.maximum;
	    });
	    inst._zod.check = (payload) => {
	        const input = payload.value;
	        const size = input.size;
	        if (size <= def.maximum)
	            return;
	        payload.issues.push({
	            origin: util.getSizableOrigin(input),
	            code: "too_big",
	            maximum: def.maximum,
	            inclusive: true,
	            input,
	            inst,
	            continue: !def.abort,
	        });
	    };
	});
	exports.$ZodCheckMinSize = core.$constructor("$ZodCheckMinSize", (inst, def) => {
	    var _a;
	    exports.$ZodCheck.init(inst, def);
	    (_a = inst._zod.def).when ?? (_a.when = (payload) => {
	        const val = payload.value;
	        return !util.nullish(val) && val.size !== undefined;
	    });
	    inst._zod.onattach.push((inst) => {
	        const curr = (inst._zod.bag.minimum ?? Number.NEGATIVE_INFINITY);
	        if (def.minimum > curr)
	            inst._zod.bag.minimum = def.minimum;
	    });
	    inst._zod.check = (payload) => {
	        const input = payload.value;
	        const size = input.size;
	        if (size >= def.minimum)
	            return;
	        payload.issues.push({
	            origin: util.getSizableOrigin(input),
	            code: "too_small",
	            minimum: def.minimum,
	            inclusive: true,
	            input,
	            inst,
	            continue: !def.abort,
	        });
	    };
	});
	exports.$ZodCheckSizeEquals = core.$constructor("$ZodCheckSizeEquals", (inst, def) => {
	    var _a;
	    exports.$ZodCheck.init(inst, def);
	    (_a = inst._zod.def).when ?? (_a.when = (payload) => {
	        const val = payload.value;
	        return !util.nullish(val) && val.size !== undefined;
	    });
	    inst._zod.onattach.push((inst) => {
	        const bag = inst._zod.bag;
	        bag.minimum = def.size;
	        bag.maximum = def.size;
	        bag.size = def.size;
	    });
	    inst._zod.check = (payload) => {
	        const input = payload.value;
	        const size = input.size;
	        if (size === def.size)
	            return;
	        const tooBig = size > def.size;
	        payload.issues.push({
	            origin: util.getSizableOrigin(input),
	            ...(tooBig ? { code: "too_big", maximum: def.size } : { code: "too_small", minimum: def.size }),
	            inclusive: true,
	            exact: true,
	            input: payload.value,
	            inst,
	            continue: !def.abort,
	        });
	    };
	});
	exports.$ZodCheckMaxLength = core.$constructor("$ZodCheckMaxLength", (inst, def) => {
	    var _a;
	    exports.$ZodCheck.init(inst, def);
	    (_a = inst._zod.def).when ?? (_a.when = (payload) => {
	        const val = payload.value;
	        return !util.nullish(val) && val.length !== undefined;
	    });
	    inst._zod.onattach.push((inst) => {
	        const curr = (inst._zod.bag.maximum ?? Number.POSITIVE_INFINITY);
	        if (def.maximum < curr)
	            inst._zod.bag.maximum = def.maximum;
	    });
	    inst._zod.check = (payload) => {
	        const input = payload.value;
	        const length = input.length;
	        if (length <= def.maximum)
	            return;
	        const origin = util.getLengthableOrigin(input);
	        payload.issues.push({
	            origin,
	            code: "too_big",
	            maximum: def.maximum,
	            inclusive: true,
	            input,
	            inst,
	            continue: !def.abort,
	        });
	    };
	});
	exports.$ZodCheckMinLength = core.$constructor("$ZodCheckMinLength", (inst, def) => {
	    var _a;
	    exports.$ZodCheck.init(inst, def);
	    (_a = inst._zod.def).when ?? (_a.when = (payload) => {
	        const val = payload.value;
	        return !util.nullish(val) && val.length !== undefined;
	    });
	    inst._zod.onattach.push((inst) => {
	        const curr = (inst._zod.bag.minimum ?? Number.NEGATIVE_INFINITY);
	        if (def.minimum > curr)
	            inst._zod.bag.minimum = def.minimum;
	    });
	    inst._zod.check = (payload) => {
	        const input = payload.value;
	        const length = input.length;
	        if (length >= def.minimum)
	            return;
	        const origin = util.getLengthableOrigin(input);
	        payload.issues.push({
	            origin,
	            code: "too_small",
	            minimum: def.minimum,
	            inclusive: true,
	            input,
	            inst,
	            continue: !def.abort,
	        });
	    };
	});
	exports.$ZodCheckLengthEquals = core.$constructor("$ZodCheckLengthEquals", (inst, def) => {
	    var _a;
	    exports.$ZodCheck.init(inst, def);
	    (_a = inst._zod.def).when ?? (_a.when = (payload) => {
	        const val = payload.value;
	        return !util.nullish(val) && val.length !== undefined;
	    });
	    inst._zod.onattach.push((inst) => {
	        const bag = inst._zod.bag;
	        bag.minimum = def.length;
	        bag.maximum = def.length;
	        bag.length = def.length;
	    });
	    inst._zod.check = (payload) => {
	        const input = payload.value;
	        const length = input.length;
	        if (length === def.length)
	            return;
	        const origin = util.getLengthableOrigin(input);
	        const tooBig = length > def.length;
	        payload.issues.push({
	            origin,
	            ...(tooBig ? { code: "too_big", maximum: def.length } : { code: "too_small", minimum: def.length }),
	            inclusive: true,
	            exact: true,
	            input: payload.value,
	            inst,
	            continue: !def.abort,
	        });
	    };
	});
	exports.$ZodCheckStringFormat = core.$constructor("$ZodCheckStringFormat", (inst, def) => {
	    var _a, _b;
	    exports.$ZodCheck.init(inst, def);
	    inst._zod.onattach.push((inst) => {
	        const bag = inst._zod.bag;
	        bag.format = def.format;
	        if (def.pattern) {
	            bag.patterns ?? (bag.patterns = new Set());
	            bag.patterns.add(def.pattern);
	        }
	    });
	    if (def.pattern)
	        (_a = inst._zod).check ?? (_a.check = (payload) => {
	            def.pattern.lastIndex = 0;
	            if (def.pattern.test(payload.value))
	                return;
	            payload.issues.push({
	                origin: "string",
	                code: "invalid_format",
	                format: def.format,
	                input: payload.value,
	                ...(def.pattern ? { pattern: def.pattern.toString() } : {}),
	                inst,
	                continue: !def.abort,
	            });
	        });
	    else
	        (_b = inst._zod).check ?? (_b.check = () => { });
	});
	exports.$ZodCheckRegex = core.$constructor("$ZodCheckRegex", (inst, def) => {
	    exports.$ZodCheckStringFormat.init(inst, def);
	    inst._zod.check = (payload) => {
	        def.pattern.lastIndex = 0;
	        if (def.pattern.test(payload.value))
	            return;
	        payload.issues.push({
	            origin: "string",
	            code: "invalid_format",
	            format: "regex",
	            input: payload.value,
	            pattern: def.pattern.toString(),
	            inst,
	            continue: !def.abort,
	        });
	    };
	});
	exports.$ZodCheckLowerCase = core.$constructor("$ZodCheckLowerCase", (inst, def) => {
	    def.pattern ?? (def.pattern = regexes$1.lowercase);
	    exports.$ZodCheckStringFormat.init(inst, def);
	});
	exports.$ZodCheckUpperCase = core.$constructor("$ZodCheckUpperCase", (inst, def) => {
	    def.pattern ?? (def.pattern = regexes$1.uppercase);
	    exports.$ZodCheckStringFormat.init(inst, def);
	});
	exports.$ZodCheckIncludes = core.$constructor("$ZodCheckIncludes", (inst, def) => {
	    exports.$ZodCheck.init(inst, def);
	    const escapedRegex = util.escapeRegex(def.includes);
	    const pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position}}${escapedRegex}` : escapedRegex);
	    def.pattern = pattern;
	    inst._zod.onattach.push((inst) => {
	        const bag = inst._zod.bag;
	        bag.patterns ?? (bag.patterns = new Set());
	        bag.patterns.add(pattern);
	    });
	    inst._zod.check = (payload) => {
	        if (payload.value.includes(def.includes, def.position))
	            return;
	        payload.issues.push({
	            origin: "string",
	            code: "invalid_format",
	            format: "includes",
	            includes: def.includes,
	            input: payload.value,
	            inst,
	            continue: !def.abort,
	        });
	    };
	});
	exports.$ZodCheckStartsWith = core.$constructor("$ZodCheckStartsWith", (inst, def) => {
	    exports.$ZodCheck.init(inst, def);
	    const pattern = new RegExp(`^${util.escapeRegex(def.prefix)}.*`);
	    def.pattern ?? (def.pattern = pattern);
	    inst._zod.onattach.push((inst) => {
	        const bag = inst._zod.bag;
	        bag.patterns ?? (bag.patterns = new Set());
	        bag.patterns.add(pattern);
	    });
	    inst._zod.check = (payload) => {
	        if (payload.value.startsWith(def.prefix))
	            return;
	        payload.issues.push({
	            origin: "string",
	            code: "invalid_format",
	            format: "starts_with",
	            prefix: def.prefix,
	            input: payload.value,
	            inst,
	            continue: !def.abort,
	        });
	    };
	});
	exports.$ZodCheckEndsWith = core.$constructor("$ZodCheckEndsWith", (inst, def) => {
	    exports.$ZodCheck.init(inst, def);
	    const pattern = new RegExp(`.*${util.escapeRegex(def.suffix)}$`);
	    def.pattern ?? (def.pattern = pattern);
	    inst._zod.onattach.push((inst) => {
	        const bag = inst._zod.bag;
	        bag.patterns ?? (bag.patterns = new Set());
	        bag.patterns.add(pattern);
	    });
	    inst._zod.check = (payload) => {
	        if (payload.value.endsWith(def.suffix))
	            return;
	        payload.issues.push({
	            origin: "string",
	            code: "invalid_format",
	            format: "ends_with",
	            suffix: def.suffix,
	            input: payload.value,
	            inst,
	            continue: !def.abort,
	        });
	    };
	});
	///////////////////////////////////
	/////    $ZodCheckProperty    /////
	///////////////////////////////////
	function handleCheckPropertyResult(result, payload, property) {
	    if (result.issues.length) {
	        payload.issues.push(...util.prefixIssues(property, result.issues));
	    }
	}
	exports.$ZodCheckProperty = core.$constructor("$ZodCheckProperty", (inst, def) => {
	    exports.$ZodCheck.init(inst, def);
	    inst._zod.check = (payload) => {
	        const result = def.schema._zod.run({
	            value: payload.value[def.property],
	            issues: [],
	        }, {});
	        if (result instanceof Promise) {
	            return result.then((result) => handleCheckPropertyResult(result, payload, def.property));
	        }
	        handleCheckPropertyResult(result, payload, def.property);
	        return;
	    };
	});
	exports.$ZodCheckMimeType = core.$constructor("$ZodCheckMimeType", (inst, def) => {
	    exports.$ZodCheck.init(inst, def);
	    const mimeSet = new Set(def.mime);
	    inst._zod.onattach.push((inst) => {
	        inst._zod.bag.mime = def.mime;
	    });
	    inst._zod.check = (payload) => {
	        if (mimeSet.has(payload.value.type))
	            return;
	        payload.issues.push({
	            code: "invalid_value",
	            values: def.mime,
	            input: payload.value.type,
	            inst,
	            continue: !def.abort,
	        });
	    };
	});
	exports.$ZodCheckOverwrite = core.$constructor("$ZodCheckOverwrite", (inst, def) => {
	    exports.$ZodCheck.init(inst, def);
	    inst._zod.check = (payload) => {
	        payload.value = def.tx(payload.value);
	    };
	}); 
} (checks$2));

var doc = {};

Object.defineProperty(doc, "__esModule", { value: true });
doc.Doc = void 0;
class Doc {
    constructor(args = []) {
        this.content = [];
        this.indent = 0;
        if (this)
            this.args = args;
    }
    indented(fn) {
        this.indent += 1;
        fn(this);
        this.indent -= 1;
    }
    write(arg) {
        if (typeof arg === "function") {
            arg(this, { execution: "sync" });
            arg(this, { execution: "async" });
            return;
        }
        const content = arg;
        const lines = content.split("\n").filter((x) => x);
        const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
        const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
        for (const line of dedented) {
            this.content.push(line);
        }
    }
    compile() {
        const F = Function;
        const args = this?.args;
        const content = this?.content ?? [``];
        const lines = [...content.map((x) => `  ${x}`)];
        // console.log(lines.join("\n"));
        return new F(...args, lines.join("\n"));
    }
}
doc.Doc = Doc;

var versions = {};

Object.defineProperty(versions, "__esModule", { value: true });
versions.version = void 0;
versions.version = {
    major: 4,
    minor: 1,
    patch: 5,
};

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.$ZodMap = exports.$ZodRecord = exports.$ZodTuple = exports.$ZodIntersection = exports.$ZodDiscriminatedUnion = exports.$ZodUnion = exports.$ZodObjectJIT = exports.$ZodObject = exports.$ZodArray = exports.$ZodDate = exports.$ZodVoid = exports.$ZodNever = exports.$ZodUnknown = exports.$ZodAny = exports.$ZodNull = exports.$ZodUndefined = exports.$ZodSymbol = exports.$ZodBigIntFormat = exports.$ZodBigInt = exports.$ZodBoolean = exports.$ZodNumberFormat = exports.$ZodNumber = exports.$ZodCustomStringFormat = exports.$ZodJWT = exports.$ZodE164 = exports.$ZodBase64URL = exports.$ZodBase64 = exports.$ZodCIDRv6 = exports.$ZodCIDRv4 = exports.$ZodIPv6 = exports.$ZodIPv4 = exports.$ZodISODuration = exports.$ZodISOTime = exports.$ZodISODate = exports.$ZodISODateTime = exports.$ZodKSUID = exports.$ZodXID = exports.$ZodULID = exports.$ZodCUID2 = exports.$ZodCUID = exports.$ZodNanoID = exports.$ZodEmoji = exports.$ZodURL = exports.$ZodEmail = exports.$ZodUUID = exports.$ZodGUID = exports.$ZodStringFormat = exports.$ZodString = exports.clone = exports.$ZodType = void 0;
	exports.$ZodCustom = exports.$ZodLazy = exports.$ZodPromise = exports.$ZodFunction = exports.$ZodTemplateLiteral = exports.$ZodReadonly = exports.$ZodCodec = exports.$ZodPipe = exports.$ZodNaN = exports.$ZodCatch = exports.$ZodSuccess = exports.$ZodNonOptional = exports.$ZodPrefault = exports.$ZodDefault = exports.$ZodNullable = exports.$ZodOptional = exports.$ZodTransform = exports.$ZodFile = exports.$ZodLiteral = exports.$ZodEnum = exports.$ZodSet = void 0;
	exports.isValidBase64 = isValidBase64;
	exports.isValidBase64URL = isValidBase64URL;
	exports.isValidJWT = isValidJWT;
	const checks = __importStar(checks$2);
	const core = __importStar(core$3);
	const doc_js_1 = doc;
	const parse_js_1 = parse$1;
	const regexes$1 = __importStar(regexes);
	const util = __importStar(util$3);
	const versions_js_1 = versions;
	exports.$ZodType = core.$constructor("$ZodType", (inst, def) => {
	    var _a;
	    inst ?? (inst = {});
	    inst._zod.def = def; // set _def property
	    inst._zod.bag = inst._zod.bag || {}; // initialize _bag object
	    inst._zod.version = versions_js_1.version;
	    const checks = [...(inst._zod.def.checks ?? [])];
	    // if inst is itself a checks.$ZodCheck, run it as a check
	    if (inst._zod.traits.has("$ZodCheck")) {
	        checks.unshift(inst);
	    }
	    for (const ch of checks) {
	        for (const fn of ch._zod.onattach) {
	            fn(inst);
	        }
	    }
	    if (checks.length === 0) {
	        // deferred initializer
	        // inst._zod.parse is not yet defined
	        (_a = inst._zod).deferred ?? (_a.deferred = []);
	        inst._zod.deferred?.push(() => {
	            inst._zod.run = inst._zod.parse;
	        });
	    }
	    else {
	        const runChecks = (payload, checks, ctx) => {
	            let isAborted = util.aborted(payload);
	            let asyncResult;
	            for (const ch of checks) {
	                if (ch._zod.def.when) {
	                    const shouldRun = ch._zod.def.when(payload);
	                    if (!shouldRun)
	                        continue;
	                }
	                else if (isAborted) {
	                    continue;
	                }
	                const currLen = payload.issues.length;
	                const _ = ch._zod.check(payload);
	                if (_ instanceof Promise && ctx?.async === false) {
	                    throw new core.$ZodAsyncError();
	                }
	                if (asyncResult || _ instanceof Promise) {
	                    asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
	                        await _;
	                        const nextLen = payload.issues.length;
	                        if (nextLen === currLen)
	                            return;
	                        if (!isAborted)
	                            isAborted = util.aborted(payload, currLen);
	                    });
	                }
	                else {
	                    const nextLen = payload.issues.length;
	                    if (nextLen === currLen)
	                        continue;
	                    if (!isAborted)
	                        isAborted = util.aborted(payload, currLen);
	                }
	            }
	            if (asyncResult) {
	                return asyncResult.then(() => {
	                    return payload;
	                });
	            }
	            return payload;
	        };
	        // const handleChecksResult = (
	        //   checkResult: ParsePayload,
	        //   originalResult: ParsePayload,
	        //   ctx: ParseContextInternal
	        // ): util.MaybeAsync<ParsePayload> => {
	        //   // if the checks mutated the value && there are no issues, re-parse the result
	        //   if (checkResult.value !== originalResult.value && !checkResult.issues.length)
	        //     return inst._zod.parse(checkResult, ctx);
	        //   return originalResult;
	        // };
	        const handleCanaryResult = (canary, payload, ctx) => {
	            // abort if the canary is aborted
	            if (util.aborted(canary)) {
	                canary.aborted = true;
	                return canary;
	            }
	            // run checks first, then
	            const checkResult = runChecks(payload, checks, ctx);
	            if (checkResult instanceof Promise) {
	                if (ctx.async === false)
	                    throw new core.$ZodAsyncError();
	                return checkResult.then((checkResult) => inst._zod.parse(checkResult, ctx));
	            }
	            return inst._zod.parse(checkResult, ctx);
	        };
	        inst._zod.run = (payload, ctx) => {
	            if (ctx.skipChecks) {
	                return inst._zod.parse(payload, ctx);
	            }
	            if (ctx.direction === "backward") {
	                // run canary
	                // initial pass (no checks)
	                const canary = inst._zod.parse({ value: payload.value, issues: [] }, { ...ctx, skipChecks: true });
	                if (canary instanceof Promise) {
	                    return canary.then((canary) => {
	                        return handleCanaryResult(canary, payload, ctx);
	                    });
	                }
	                return handleCanaryResult(canary, payload, ctx);
	            }
	            // forward
	            const result = inst._zod.parse(payload, ctx);
	            if (result instanceof Promise) {
	                if (ctx.async === false)
	                    throw new core.$ZodAsyncError();
	                return result.then((result) => runChecks(result, checks, ctx));
	            }
	            return runChecks(result, checks, ctx);
	        };
	    }
	    inst["~standard"] = {
	        validate: (value) => {
	            try {
	                const r = (0, parse_js_1.safeParse)(inst, value);
	                return r.success ? { value: r.data } : { issues: r.error?.issues };
	            }
	            catch (_) {
	                return (0, parse_js_1.safeParseAsync)(inst, value).then((r) => (r.success ? { value: r.data } : { issues: r.error?.issues }));
	            }
	        },
	        vendor: "zod",
	        version: 1,
	    };
	});
	var util_js_1 = util$3;
	Object.defineProperty(exports, "clone", { enumerable: true, get: function () { return util_js_1.clone; } });
	exports.$ZodString = core.$constructor("$ZodString", (inst, def) => {
	    exports.$ZodType.init(inst, def);
	    inst._zod.pattern = [...(inst?._zod.bag?.patterns ?? [])].pop() ?? regexes$1.string(inst._zod.bag);
	    inst._zod.parse = (payload, _) => {
	        if (def.coerce)
	            try {
	                payload.value = String(payload.value);
	            }
	            catch (_) { }
	        if (typeof payload.value === "string")
	            return payload;
	        payload.issues.push({
	            expected: "string",
	            code: "invalid_type",
	            input: payload.value,
	            inst,
	        });
	        return payload;
	    };
	});
	exports.$ZodStringFormat = core.$constructor("$ZodStringFormat", (inst, def) => {
	    // check initialization must come first
	    checks.$ZodCheckStringFormat.init(inst, def);
	    exports.$ZodString.init(inst, def);
	});
	exports.$ZodGUID = core.$constructor("$ZodGUID", (inst, def) => {
	    def.pattern ?? (def.pattern = regexes$1.guid);
	    exports.$ZodStringFormat.init(inst, def);
	});
	exports.$ZodUUID = core.$constructor("$ZodUUID", (inst, def) => {
	    if (def.version) {
	        const versionMap = {
	            v1: 1,
	            v2: 2,
	            v3: 3,
	            v4: 4,
	            v5: 5,
	            v6: 6,
	            v7: 7,
	            v8: 8,
	        };
	        const v = versionMap[def.version];
	        if (v === undefined)
	            throw new Error(`Invalid UUID version: "${def.version}"`);
	        def.pattern ?? (def.pattern = regexes$1.uuid(v));
	    }
	    else
	        def.pattern ?? (def.pattern = regexes$1.uuid());
	    exports.$ZodStringFormat.init(inst, def);
	});
	exports.$ZodEmail = core.$constructor("$ZodEmail", (inst, def) => {
	    def.pattern ?? (def.pattern = regexes$1.email);
	    exports.$ZodStringFormat.init(inst, def);
	});
	exports.$ZodURL = core.$constructor("$ZodURL", (inst, def) => {
	    exports.$ZodStringFormat.init(inst, def);
	    inst._zod.check = (payload) => {
	        try {
	            // Trim whitespace from input
	            const trimmed = payload.value.trim();
	            // @ts-ignore
	            const url = new URL(trimmed);
	            if (def.hostname) {
	                def.hostname.lastIndex = 0;
	                if (!def.hostname.test(url.hostname)) {
	                    payload.issues.push({
	                        code: "invalid_format",
	                        format: "url",
	                        note: "Invalid hostname",
	                        pattern: regexes$1.hostname.source,
	                        input: payload.value,
	                        inst,
	                        continue: !def.abort,
	                    });
	                }
	            }
	            if (def.protocol) {
	                def.protocol.lastIndex = 0;
	                if (!def.protocol.test(url.protocol.endsWith(":") ? url.protocol.slice(0, -1) : url.protocol)) {
	                    payload.issues.push({
	                        code: "invalid_format",
	                        format: "url",
	                        note: "Invalid protocol",
	                        pattern: def.protocol.source,
	                        input: payload.value,
	                        inst,
	                        continue: !def.abort,
	                    });
	                }
	            }
	            // Set the output value based on normalize flag
	            if (def.normalize) {
	                // Use normalized URL
	                payload.value = url.href;
	            }
	            else {
	                // Preserve the original input (trimmed)
	                payload.value = trimmed;
	            }
	            return;
	        }
	        catch (_) {
	            payload.issues.push({
	                code: "invalid_format",
	                format: "url",
	                input: payload.value,
	                inst,
	                continue: !def.abort,
	            });
	        }
	    };
	});
	exports.$ZodEmoji = core.$constructor("$ZodEmoji", (inst, def) => {
	    def.pattern ?? (def.pattern = regexes$1.emoji());
	    exports.$ZodStringFormat.init(inst, def);
	});
	exports.$ZodNanoID = core.$constructor("$ZodNanoID", (inst, def) => {
	    def.pattern ?? (def.pattern = regexes$1.nanoid);
	    exports.$ZodStringFormat.init(inst, def);
	});
	exports.$ZodCUID = core.$constructor("$ZodCUID", (inst, def) => {
	    def.pattern ?? (def.pattern = regexes$1.cuid);
	    exports.$ZodStringFormat.init(inst, def);
	});
	exports.$ZodCUID2 = core.$constructor("$ZodCUID2", (inst, def) => {
	    def.pattern ?? (def.pattern = regexes$1.cuid2);
	    exports.$ZodStringFormat.init(inst, def);
	});
	exports.$ZodULID = core.$constructor("$ZodULID", (inst, def) => {
	    def.pattern ?? (def.pattern = regexes$1.ulid);
	    exports.$ZodStringFormat.init(inst, def);
	});
	exports.$ZodXID = core.$constructor("$ZodXID", (inst, def) => {
	    def.pattern ?? (def.pattern = regexes$1.xid);
	    exports.$ZodStringFormat.init(inst, def);
	});
	exports.$ZodKSUID = core.$constructor("$ZodKSUID", (inst, def) => {
	    def.pattern ?? (def.pattern = regexes$1.ksuid);
	    exports.$ZodStringFormat.init(inst, def);
	});
	exports.$ZodISODateTime = core.$constructor("$ZodISODateTime", (inst, def) => {
	    def.pattern ?? (def.pattern = regexes$1.datetime(def));
	    exports.$ZodStringFormat.init(inst, def);
	});
	exports.$ZodISODate = core.$constructor("$ZodISODate", (inst, def) => {
	    def.pattern ?? (def.pattern = regexes$1.date);
	    exports.$ZodStringFormat.init(inst, def);
	});
	exports.$ZodISOTime = core.$constructor("$ZodISOTime", (inst, def) => {
	    def.pattern ?? (def.pattern = regexes$1.time(def));
	    exports.$ZodStringFormat.init(inst, def);
	});
	exports.$ZodISODuration = core.$constructor("$ZodISODuration", (inst, def) => {
	    def.pattern ?? (def.pattern = regexes$1.duration);
	    exports.$ZodStringFormat.init(inst, def);
	});
	exports.$ZodIPv4 = core.$constructor("$ZodIPv4", (inst, def) => {
	    def.pattern ?? (def.pattern = regexes$1.ipv4);
	    exports.$ZodStringFormat.init(inst, def);
	    inst._zod.onattach.push((inst) => {
	        const bag = inst._zod.bag;
	        bag.format = `ipv4`;
	    });
	});
	exports.$ZodIPv6 = core.$constructor("$ZodIPv6", (inst, def) => {
	    def.pattern ?? (def.pattern = regexes$1.ipv6);
	    exports.$ZodStringFormat.init(inst, def);
	    inst._zod.onattach.push((inst) => {
	        const bag = inst._zod.bag;
	        bag.format = `ipv6`;
	    });
	    inst._zod.check = (payload) => {
	        try {
	            // @ts-ignore
	            new URL(`http://[${payload.value}]`);
	            // return;
	        }
	        catch {
	            payload.issues.push({
	                code: "invalid_format",
	                format: "ipv6",
	                input: payload.value,
	                inst,
	                continue: !def.abort,
	            });
	        }
	    };
	});
	exports.$ZodCIDRv4 = core.$constructor("$ZodCIDRv4", (inst, def) => {
	    def.pattern ?? (def.pattern = regexes$1.cidrv4);
	    exports.$ZodStringFormat.init(inst, def);
	});
	exports.$ZodCIDRv6 = core.$constructor("$ZodCIDRv6", (inst, def) => {
	    def.pattern ?? (def.pattern = regexes$1.cidrv6); // not used for validation
	    exports.$ZodStringFormat.init(inst, def);
	    inst._zod.check = (payload) => {
	        const [address, prefix] = payload.value.split("/");
	        try {
	            if (!prefix)
	                throw new Error();
	            const prefixNum = Number(prefix);
	            if (`${prefixNum}` !== prefix)
	                throw new Error();
	            if (prefixNum < 0 || prefixNum > 128)
	                throw new Error();
	            // @ts-ignore
	            new URL(`http://[${address}]`);
	        }
	        catch {
	            payload.issues.push({
	                code: "invalid_format",
	                format: "cidrv6",
	                input: payload.value,
	                inst,
	                continue: !def.abort,
	            });
	        }
	    };
	});
	//////////////////////////////   ZodBase64   //////////////////////////////
	function isValidBase64(data) {
	    if (data === "")
	        return true;
	    if (data.length % 4 !== 0)
	        return false;
	    try {
	        // @ts-ignore
	        atob(data);
	        return true;
	    }
	    catch {
	        return false;
	    }
	}
	exports.$ZodBase64 = core.$constructor("$ZodBase64", (inst, def) => {
	    def.pattern ?? (def.pattern = regexes$1.base64);
	    exports.$ZodStringFormat.init(inst, def);
	    inst._zod.onattach.push((inst) => {
	        inst._zod.bag.contentEncoding = "base64";
	    });
	    inst._zod.check = (payload) => {
	        if (isValidBase64(payload.value))
	            return;
	        payload.issues.push({
	            code: "invalid_format",
	            format: "base64",
	            input: payload.value,
	            inst,
	            continue: !def.abort,
	        });
	    };
	});
	//////////////////////////////   ZodBase64   //////////////////////////////
	function isValidBase64URL(data) {
	    if (!regexes$1.base64url.test(data))
	        return false;
	    const base64 = data.replace(/[-_]/g, (c) => (c === "-" ? "+" : "/"));
	    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
	    return isValidBase64(padded);
	}
	exports.$ZodBase64URL = core.$constructor("$ZodBase64URL", (inst, def) => {
	    def.pattern ?? (def.pattern = regexes$1.base64url);
	    exports.$ZodStringFormat.init(inst, def);
	    inst._zod.onattach.push((inst) => {
	        inst._zod.bag.contentEncoding = "base64url";
	    });
	    inst._zod.check = (payload) => {
	        if (isValidBase64URL(payload.value))
	            return;
	        payload.issues.push({
	            code: "invalid_format",
	            format: "base64url",
	            input: payload.value,
	            inst,
	            continue: !def.abort,
	        });
	    };
	});
	exports.$ZodE164 = core.$constructor("$ZodE164", (inst, def) => {
	    def.pattern ?? (def.pattern = regexes$1.e164);
	    exports.$ZodStringFormat.init(inst, def);
	});
	//////////////////////////////   ZodJWT   //////////////////////////////
	function isValidJWT(token, algorithm = null) {
	    try {
	        const tokensParts = token.split(".");
	        if (tokensParts.length !== 3)
	            return false;
	        const [header] = tokensParts;
	        if (!header)
	            return false;
	        // @ts-ignore
	        const parsedHeader = JSON.parse(atob(header));
	        if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT")
	            return false;
	        if (!parsedHeader.alg)
	            return false;
	        if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm))
	            return false;
	        return true;
	    }
	    catch {
	        return false;
	    }
	}
	exports.$ZodJWT = core.$constructor("$ZodJWT", (inst, def) => {
	    exports.$ZodStringFormat.init(inst, def);
	    inst._zod.check = (payload) => {
	        if (isValidJWT(payload.value, def.alg))
	            return;
	        payload.issues.push({
	            code: "invalid_format",
	            format: "jwt",
	            input: payload.value,
	            inst,
	            continue: !def.abort,
	        });
	    };
	});
	exports.$ZodCustomStringFormat = core.$constructor("$ZodCustomStringFormat", (inst, def) => {
	    exports.$ZodStringFormat.init(inst, def);
	    inst._zod.check = (payload) => {
	        if (def.fn(payload.value))
	            return;
	        payload.issues.push({
	            code: "invalid_format",
	            format: def.format,
	            input: payload.value,
	            inst,
	            continue: !def.abort,
	        });
	    };
	});
	exports.$ZodNumber = core.$constructor("$ZodNumber", (inst, def) => {
	    exports.$ZodType.init(inst, def);
	    inst._zod.pattern = inst._zod.bag.pattern ?? regexes$1.number;
	    inst._zod.parse = (payload, _ctx) => {
	        if (def.coerce)
	            try {
	                payload.value = Number(payload.value);
	            }
	            catch (_) { }
	        const input = payload.value;
	        if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) {
	            return payload;
	        }
	        const received = typeof input === "number"
	            ? Number.isNaN(input)
	                ? "NaN"
	                : !Number.isFinite(input)
	                    ? "Infinity"
	                    : undefined
	            : undefined;
	        payload.issues.push({
	            expected: "number",
	            code: "invalid_type",
	            input,
	            inst,
	            ...(received ? { received } : {}),
	        });
	        return payload;
	    };
	});
	exports.$ZodNumberFormat = core.$constructor("$ZodNumber", (inst, def) => {
	    checks.$ZodCheckNumberFormat.init(inst, def);
	    exports.$ZodNumber.init(inst, def); // no format checksp
	});
	exports.$ZodBoolean = core.$constructor("$ZodBoolean", (inst, def) => {
	    exports.$ZodType.init(inst, def);
	    inst._zod.pattern = regexes$1.boolean;
	    inst._zod.parse = (payload, _ctx) => {
	        if (def.coerce)
	            try {
	                payload.value = Boolean(payload.value);
	            }
	            catch (_) { }
	        const input = payload.value;
	        if (typeof input === "boolean")
	            return payload;
	        payload.issues.push({
	            expected: "boolean",
	            code: "invalid_type",
	            input,
	            inst,
	        });
	        return payload;
	    };
	});
	exports.$ZodBigInt = core.$constructor("$ZodBigInt", (inst, def) => {
	    exports.$ZodType.init(inst, def);
	    inst._zod.pattern = regexes$1.bigint;
	    inst._zod.parse = (payload, _ctx) => {
	        if (def.coerce)
	            try {
	                payload.value = BigInt(payload.value);
	            }
	            catch (_) { }
	        if (typeof payload.value === "bigint")
	            return payload;
	        payload.issues.push({
	            expected: "bigint",
	            code: "invalid_type",
	            input: payload.value,
	            inst,
	        });
	        return payload;
	    };
	});
	exports.$ZodBigIntFormat = core.$constructor("$ZodBigInt", (inst, def) => {
	    checks.$ZodCheckBigIntFormat.init(inst, def);
	    exports.$ZodBigInt.init(inst, def); // no format checks
	});
	exports.$ZodSymbol = core.$constructor("$ZodSymbol", (inst, def) => {
	    exports.$ZodType.init(inst, def);
	    inst._zod.parse = (payload, _ctx) => {
	        const input = payload.value;
	        if (typeof input === "symbol")
	            return payload;
	        payload.issues.push({
	            expected: "symbol",
	            code: "invalid_type",
	            input,
	            inst,
	        });
	        return payload;
	    };
	});
	exports.$ZodUndefined = core.$constructor("$ZodUndefined", (inst, def) => {
	    exports.$ZodType.init(inst, def);
	    inst._zod.pattern = regexes$1.undefined;
	    inst._zod.values = new Set([undefined]);
	    inst._zod.optin = "optional";
	    inst._zod.optout = "optional";
	    inst._zod.parse = (payload, _ctx) => {
	        const input = payload.value;
	        if (typeof input === "undefined")
	            return payload;
	        payload.issues.push({
	            expected: "undefined",
	            code: "invalid_type",
	            input,
	            inst,
	        });
	        return payload;
	    };
	});
	exports.$ZodNull = core.$constructor("$ZodNull", (inst, def) => {
	    exports.$ZodType.init(inst, def);
	    inst._zod.pattern = regexes$1.null;
	    inst._zod.values = new Set([null]);
	    inst._zod.parse = (payload, _ctx) => {
	        const input = payload.value;
	        if (input === null)
	            return payload;
	        payload.issues.push({
	            expected: "null",
	            code: "invalid_type",
	            input,
	            inst,
	        });
	        return payload;
	    };
	});
	exports.$ZodAny = core.$constructor("$ZodAny", (inst, def) => {
	    exports.$ZodType.init(inst, def);
	    inst._zod.parse = (payload) => payload;
	});
	exports.$ZodUnknown = core.$constructor("$ZodUnknown", (inst, def) => {
	    exports.$ZodType.init(inst, def);
	    inst._zod.parse = (payload) => payload;
	});
	exports.$ZodNever = core.$constructor("$ZodNever", (inst, def) => {
	    exports.$ZodType.init(inst, def);
	    inst._zod.parse = (payload, _ctx) => {
	        payload.issues.push({
	            expected: "never",
	            code: "invalid_type",
	            input: payload.value,
	            inst,
	        });
	        return payload;
	    };
	});
	exports.$ZodVoid = core.$constructor("$ZodVoid", (inst, def) => {
	    exports.$ZodType.init(inst, def);
	    inst._zod.parse = (payload, _ctx) => {
	        const input = payload.value;
	        if (typeof input === "undefined")
	            return payload;
	        payload.issues.push({
	            expected: "void",
	            code: "invalid_type",
	            input,
	            inst,
	        });
	        return payload;
	    };
	});
	exports.$ZodDate = core.$constructor("$ZodDate", (inst, def) => {
	    exports.$ZodType.init(inst, def);
	    inst._zod.parse = (payload, _ctx) => {
	        if (def.coerce) {
	            try {
	                payload.value = new Date(payload.value);
	            }
	            catch (_err) { }
	        }
	        const input = payload.value;
	        const isDate = input instanceof Date;
	        const isValidDate = isDate && !Number.isNaN(input.getTime());
	        if (isValidDate)
	            return payload;
	        payload.issues.push({
	            expected: "date",
	            code: "invalid_type",
	            input,
	            ...(isDate ? { received: "Invalid Date" } : {}),
	            inst,
	        });
	        return payload;
	    };
	});
	function handleArrayResult(result, final, index) {
	    if (result.issues.length) {
	        final.issues.push(...util.prefixIssues(index, result.issues));
	    }
	    final.value[index] = result.value;
	}
	exports.$ZodArray = core.$constructor("$ZodArray", (inst, def) => {
	    exports.$ZodType.init(inst, def);
	    inst._zod.parse = (payload, ctx) => {
	        const input = payload.value;
	        if (!Array.isArray(input)) {
	            payload.issues.push({
	                expected: "array",
	                code: "invalid_type",
	                input,
	                inst,
	            });
	            return payload;
	        }
	        payload.value = Array(input.length);
	        const proms = [];
	        for (let i = 0; i < input.length; i++) {
	            const item = input[i];
	            const result = def.element._zod.run({
	                value: item,
	                issues: [],
	            }, ctx);
	            if (result instanceof Promise) {
	                proms.push(result.then((result) => handleArrayResult(result, payload, i)));
	            }
	            else {
	                handleArrayResult(result, payload, i);
	            }
	        }
	        if (proms.length) {
	            return Promise.all(proms).then(() => payload);
	        }
	        return payload; //handleArrayResultsAsync(parseResults, final);
	    };
	});
	function handlePropertyResult(result, final, key, input) {
	    if (result.issues.length) {
	        final.issues.push(...util.prefixIssues(key, result.issues));
	    }
	    if (result.value === undefined) {
	        if (key in input) {
	            final.value[key] = undefined;
	        }
	    }
	    else {
	        final.value[key] = result.value;
	    }
	}
	function normalizeDef(def) {
	    const keys = Object.keys(def.shape);
	    for (const k of keys) {
	        if (!def.shape[k]._zod.traits.has("$ZodType")) {
	            throw new Error(`Invalid element at key "${k}": expected a Zod schema`);
	        }
	    }
	    const okeys = util.optionalKeys(def.shape);
	    return {
	        ...def,
	        keys,
	        keySet: new Set(keys),
	        numKeys: keys.length,
	        optionalKeys: new Set(okeys),
	    };
	}
	function handleCatchall(proms, input, payload, ctx, def, inst) {
	    const unrecognized = [];
	    // iterate over input keys
	    const keySet = def.keySet;
	    const _catchall = def.catchall._zod;
	    const t = _catchall.def.type;
	    for (const key of Object.keys(input)) {
	        if (keySet.has(key))
	            continue;
	        if (t === "never") {
	            unrecognized.push(key);
	            continue;
	        }
	        const r = _catchall.run({ value: input[key], issues: [] }, ctx);
	        if (r instanceof Promise) {
	            proms.push(r.then((r) => handlePropertyResult(r, payload, key, input)));
	        }
	        else {
	            handlePropertyResult(r, payload, key, input);
	        }
	    }
	    if (unrecognized.length) {
	        payload.issues.push({
	            code: "unrecognized_keys",
	            keys: unrecognized,
	            input,
	            inst,
	        });
	    }
	    if (!proms.length)
	        return payload;
	    return Promise.all(proms).then(() => {
	        return payload;
	    });
	}
	exports.$ZodObject = core.$constructor("$ZodObject", (inst, def) => {
	    // requires cast because technically $ZodObject doesn't extend
	    exports.$ZodType.init(inst, def);
	    const _normalized = util.cached(() => normalizeDef(def));
	    util.defineLazy(inst._zod, "propValues", () => {
	        const shape = def.shape;
	        const propValues = {};
	        for (const key in shape) {
	            const field = shape[key]._zod;
	            if (field.values) {
	                propValues[key] ?? (propValues[key] = new Set());
	                for (const v of field.values)
	                    propValues[key].add(v);
	            }
	        }
	        return propValues;
	    });
	    const isObject = util.isObject;
	    const catchall = def.catchall;
	    let value;
	    inst._zod.parse = (payload, ctx) => {
	        value ?? (value = _normalized.value);
	        const input = payload.value;
	        if (!isObject(input)) {
	            payload.issues.push({
	                expected: "object",
	                code: "invalid_type",
	                input,
	                inst,
	            });
	            return payload;
	        }
	        payload.value = {};
	        const proms = [];
	        const shape = value.shape;
	        for (const key of value.keys) {
	            const el = shape[key];
	            const r = el._zod.run({ value: input[key], issues: [] }, ctx);
	            if (r instanceof Promise) {
	                proms.push(r.then((r) => handlePropertyResult(r, payload, key, input)));
	            }
	            else {
	                handlePropertyResult(r, payload, key, input);
	            }
	        }
	        if (!catchall) {
	            return proms.length ? Promise.all(proms).then(() => payload) : payload;
	        }
	        return handleCatchall(proms, input, payload, ctx, _normalized.value, inst);
	    };
	});
	exports.$ZodObjectJIT = core.$constructor("$ZodObjectJIT", (inst, def) => {
	    // requires cast because technically $ZodObject doesn't extend
	    exports.$ZodObject.init(inst, def);
	    const superParse = inst._zod.parse;
	    const _normalized = util.cached(() => normalizeDef(def));
	    const generateFastpass = (shape) => {
	        const doc = new doc_js_1.Doc(["shape", "payload", "ctx"]);
	        const normalized = _normalized.value;
	        const parseStr = (key) => {
	            const k = util.esc(key);
	            return `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
	        };
	        doc.write(`const input = payload.value;`);
	        const ids = Object.create(null);
	        let counter = 0;
	        for (const key of normalized.keys) {
	            ids[key] = `key_${counter++}`;
	        }
	        // A: preserve key order {
	        doc.write(`const newResult = {}`);
	        for (const key of normalized.keys) {
	            const id = ids[key];
	            const k = util.esc(key);
	            doc.write(`const ${id} = ${parseStr(key)};`);
	            doc.write(`
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
      `);
	        }
	        doc.write(`payload.value = newResult;`);
	        doc.write(`return payload;`);
	        const fn = doc.compile();
	        return (payload, ctx) => fn(shape, payload, ctx);
	    };
	    let fastpass;
	    const isObject = util.isObject;
	    const jit = !core.globalConfig.jitless;
	    const allowsEval = util.allowsEval;
	    const fastEnabled = jit && allowsEval.value; // && !def.catchall;
	    const catchall = def.catchall;
	    let value;
	    inst._zod.parse = (payload, ctx) => {
	        value ?? (value = _normalized.value);
	        const input = payload.value;
	        if (!isObject(input)) {
	            payload.issues.push({
	                expected: "object",
	                code: "invalid_type",
	                input,
	                inst,
	            });
	            return payload;
	        }
	        if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
	            // always synchronous
	            if (!fastpass)
	                fastpass = generateFastpass(def.shape);
	            payload = fastpass(payload, ctx);
	            if (!catchall)
	                return payload;
	            return handleCatchall([], input, payload, ctx, value, inst);
	        }
	        return superParse(payload, ctx);
	    };
	});
	function handleUnionResults(results, final, inst, ctx) {
	    for (const result of results) {
	        if (result.issues.length === 0) {
	            final.value = result.value;
	            return final;
	        }
	    }
	    const nonaborted = results.filter((r) => !util.aborted(r));
	    if (nonaborted.length === 1) {
	        final.value = nonaborted[0].value;
	        return nonaborted[0];
	    }
	    final.issues.push({
	        code: "invalid_union",
	        input: final.value,
	        inst,
	        errors: results.map((result) => result.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config()))),
	    });
	    return final;
	}
	exports.$ZodUnion = core.$constructor("$ZodUnion", (inst, def) => {
	    exports.$ZodType.init(inst, def);
	    util.defineLazy(inst._zod, "optin", () => def.options.some((o) => o._zod.optin === "optional") ? "optional" : undefined);
	    util.defineLazy(inst._zod, "optout", () => def.options.some((o) => o._zod.optout === "optional") ? "optional" : undefined);
	    util.defineLazy(inst._zod, "values", () => {
	        if (def.options.every((o) => o._zod.values)) {
	            return new Set(def.options.flatMap((option) => Array.from(option._zod.values)));
	        }
	        return undefined;
	    });
	    util.defineLazy(inst._zod, "pattern", () => {
	        if (def.options.every((o) => o._zod.pattern)) {
	            const patterns = def.options.map((o) => o._zod.pattern);
	            return new RegExp(`^(${patterns.map((p) => util.cleanRegex(p.source)).join("|")})$`);
	        }
	        return undefined;
	    });
	    const single = def.options.length === 1;
	    const first = def.options[0]._zod.run;
	    inst._zod.parse = (payload, ctx) => {
	        if (single) {
	            return first(payload, ctx);
	        }
	        let async = false;
	        const results = [];
	        for (const option of def.options) {
	            const result = option._zod.run({
	                value: payload.value,
	                issues: [],
	            }, ctx);
	            if (result instanceof Promise) {
	                results.push(result);
	                async = true;
	            }
	            else {
	                if (result.issues.length === 0)
	                    return result;
	                results.push(result);
	            }
	        }
	        if (!async)
	            return handleUnionResults(results, payload, inst, ctx);
	        return Promise.all(results).then((results) => {
	            return handleUnionResults(results, payload, inst, ctx);
	        });
	    };
	});
	exports.$ZodDiscriminatedUnion = 
	/*@__PURE__*/
	core.$constructor("$ZodDiscriminatedUnion", (inst, def) => {
	    exports.$ZodUnion.init(inst, def);
	    const _super = inst._zod.parse;
	    util.defineLazy(inst._zod, "propValues", () => {
	        const propValues = {};
	        for (const option of def.options) {
	            const pv = option._zod.propValues;
	            if (!pv || Object.keys(pv).length === 0)
	                throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(option)}"`);
	            for (const [k, v] of Object.entries(pv)) {
	                if (!propValues[k])
	                    propValues[k] = new Set();
	                for (const val of v) {
	                    propValues[k].add(val);
	                }
	            }
	        }
	        return propValues;
	    });
	    const disc = util.cached(() => {
	        const opts = def.options;
	        const map = new Map();
	        for (const o of opts) {
	            const values = o._zod.propValues?.[def.discriminator];
	            if (!values || values.size === 0)
	                throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(o)}"`);
	            for (const v of values) {
	                if (map.has(v)) {
	                    throw new Error(`Duplicate discriminator value "${String(v)}"`);
	                }
	                map.set(v, o);
	            }
	        }
	        return map;
	    });
	    inst._zod.parse = (payload, ctx) => {
	        const input = payload.value;
	        if (!util.isObject(input)) {
	            payload.issues.push({
	                code: "invalid_type",
	                expected: "object",
	                input,
	                inst,
	            });
	            return payload;
	        }
	        const opt = disc.value.get(input?.[def.discriminator]);
	        if (opt) {
	            return opt._zod.run(payload, ctx);
	        }
	        if (def.unionFallback) {
	            return _super(payload, ctx);
	        }
	        // no matching discriminator
	        payload.issues.push({
	            code: "invalid_union",
	            errors: [],
	            note: "No matching discriminator",
	            discriminator: def.discriminator,
	            input,
	            path: [def.discriminator],
	            inst,
	        });
	        return payload;
	    };
	});
	exports.$ZodIntersection = core.$constructor("$ZodIntersection", (inst, def) => {
	    exports.$ZodType.init(inst, def);
	    inst._zod.parse = (payload, ctx) => {
	        const input = payload.value;
	        const left = def.left._zod.run({ value: input, issues: [] }, ctx);
	        const right = def.right._zod.run({ value: input, issues: [] }, ctx);
	        const async = left instanceof Promise || right instanceof Promise;
	        if (async) {
	            return Promise.all([left, right]).then(([left, right]) => {
	                return handleIntersectionResults(payload, left, right);
	            });
	        }
	        return handleIntersectionResults(payload, left, right);
	    };
	});
	function mergeValues(a, b) {
	    // const aType = parse.t(a);
	    // const bType = parse.t(b);
	    if (a === b) {
	        return { valid: true, data: a };
	    }
	    if (a instanceof Date && b instanceof Date && +a === +b) {
	        return { valid: true, data: a };
	    }
	    if (util.isPlainObject(a) && util.isPlainObject(b)) {
	        const bKeys = Object.keys(b);
	        const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
	        const newObj = { ...a, ...b };
	        for (const key of sharedKeys) {
	            const sharedValue = mergeValues(a[key], b[key]);
	            if (!sharedValue.valid) {
	                return {
	                    valid: false,
	                    mergeErrorPath: [key, ...sharedValue.mergeErrorPath],
	                };
	            }
	            newObj[key] = sharedValue.data;
	        }
	        return { valid: true, data: newObj };
	    }
	    if (Array.isArray(a) && Array.isArray(b)) {
	        if (a.length !== b.length) {
	            return { valid: false, mergeErrorPath: [] };
	        }
	        const newArray = [];
	        for (let index = 0; index < a.length; index++) {
	            const itemA = a[index];
	            const itemB = b[index];
	            const sharedValue = mergeValues(itemA, itemB);
	            if (!sharedValue.valid) {
	                return {
	                    valid: false,
	                    mergeErrorPath: [index, ...sharedValue.mergeErrorPath],
	                };
	            }
	            newArray.push(sharedValue.data);
	        }
	        return { valid: true, data: newArray };
	    }
	    return { valid: false, mergeErrorPath: [] };
	}
	function handleIntersectionResults(result, left, right) {
	    if (left.issues.length) {
	        result.issues.push(...left.issues);
	    }
	    if (right.issues.length) {
	        result.issues.push(...right.issues);
	    }
	    if (util.aborted(result))
	        return result;
	    const merged = mergeValues(left.value, right.value);
	    if (!merged.valid) {
	        throw new Error(`Unmergable intersection. Error path: ` + `${JSON.stringify(merged.mergeErrorPath)}`);
	    }
	    result.value = merged.data;
	    return result;
	}
	exports.$ZodTuple = core.$constructor("$ZodTuple", (inst, def) => {
	    exports.$ZodType.init(inst, def);
	    const items = def.items;
	    const optStart = items.length - [...items].reverse().findIndex((item) => item._zod.optin !== "optional");
	    inst._zod.parse = (payload, ctx) => {
	        const input = payload.value;
	        if (!Array.isArray(input)) {
	            payload.issues.push({
	                input,
	                inst,
	                expected: "tuple",
	                code: "invalid_type",
	            });
	            return payload;
	        }
	        payload.value = [];
	        const proms = [];
	        if (!def.rest) {
	            const tooBig = input.length > items.length;
	            const tooSmall = input.length < optStart - 1;
	            if (tooBig || tooSmall) {
	                payload.issues.push({
	                    ...(tooBig ? { code: "too_big", maximum: items.length } : { code: "too_small", minimum: items.length }),
	                    input,
	                    inst,
	                    origin: "array",
	                });
	                return payload;
	            }
	        }
	        let i = -1;
	        for (const item of items) {
	            i++;
	            if (i >= input.length)
	                if (i >= optStart)
	                    continue;
	            const result = item._zod.run({
	                value: input[i],
	                issues: [],
	            }, ctx);
	            if (result instanceof Promise) {
	                proms.push(result.then((result) => handleTupleResult(result, payload, i)));
	            }
	            else {
	                handleTupleResult(result, payload, i);
	            }
	        }
	        if (def.rest) {
	            const rest = input.slice(items.length);
	            for (const el of rest) {
	                i++;
	                const result = def.rest._zod.run({
	                    value: el,
	                    issues: [],
	                }, ctx);
	                if (result instanceof Promise) {
	                    proms.push(result.then((result) => handleTupleResult(result, payload, i)));
	                }
	                else {
	                    handleTupleResult(result, payload, i);
	                }
	            }
	        }
	        if (proms.length)
	            return Promise.all(proms).then(() => payload);
	        return payload;
	    };
	});
	function handleTupleResult(result, final, index) {
	    if (result.issues.length) {
	        final.issues.push(...util.prefixIssues(index, result.issues));
	    }
	    final.value[index] = result.value;
	}
	exports.$ZodRecord = core.$constructor("$ZodRecord", (inst, def) => {
	    exports.$ZodType.init(inst, def);
	    inst._zod.parse = (payload, ctx) => {
	        const input = payload.value;
	        if (!util.isPlainObject(input)) {
	            payload.issues.push({
	                expected: "record",
	                code: "invalid_type",
	                input,
	                inst,
	            });
	            return payload;
	        }
	        const proms = [];
	        if (def.keyType._zod.values) {
	            const values = def.keyType._zod.values;
	            payload.value = {};
	            for (const key of values) {
	                if (typeof key === "string" || typeof key === "number" || typeof key === "symbol") {
	                    const result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
	                    if (result instanceof Promise) {
	                        proms.push(result.then((result) => {
	                            if (result.issues.length) {
	                                payload.issues.push(...util.prefixIssues(key, result.issues));
	                            }
	                            payload.value[key] = result.value;
	                        }));
	                    }
	                    else {
	                        if (result.issues.length) {
	                            payload.issues.push(...util.prefixIssues(key, result.issues));
	                        }
	                        payload.value[key] = result.value;
	                    }
	                }
	            }
	            let unrecognized;
	            for (const key in input) {
	                if (!values.has(key)) {
	                    unrecognized = unrecognized ?? [];
	                    unrecognized.push(key);
	                }
	            }
	            if (unrecognized && unrecognized.length > 0) {
	                payload.issues.push({
	                    code: "unrecognized_keys",
	                    input,
	                    inst,
	                    keys: unrecognized,
	                });
	            }
	        }
	        else {
	            payload.value = {};
	            for (const key of Reflect.ownKeys(input)) {
	                if (key === "__proto__")
	                    continue;
	                const keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
	                if (keyResult instanceof Promise) {
	                    throw new Error("Async schemas not supported in object keys currently");
	                }
	                if (keyResult.issues.length) {
	                    payload.issues.push({
	                        code: "invalid_key",
	                        origin: "record",
	                        issues: keyResult.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config())),
	                        input: key,
	                        path: [key],
	                        inst,
	                    });
	                    payload.value[keyResult.value] = keyResult.value;
	                    continue;
	                }
	                const result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
	                if (result instanceof Promise) {
	                    proms.push(result.then((result) => {
	                        if (result.issues.length) {
	                            payload.issues.push(...util.prefixIssues(key, result.issues));
	                        }
	                        payload.value[keyResult.value] = result.value;
	                    }));
	                }
	                else {
	                    if (result.issues.length) {
	                        payload.issues.push(...util.prefixIssues(key, result.issues));
	                    }
	                    payload.value[keyResult.value] = result.value;
	                }
	            }
	        }
	        if (proms.length) {
	            return Promise.all(proms).then(() => payload);
	        }
	        return payload;
	    };
	});
	exports.$ZodMap = core.$constructor("$ZodMap", (inst, def) => {
	    exports.$ZodType.init(inst, def);
	    inst._zod.parse = (payload, ctx) => {
	        const input = payload.value;
	        if (!(input instanceof Map)) {
	            payload.issues.push({
	                expected: "map",
	                code: "invalid_type",
	                input,
	                inst,
	            });
	            return payload;
	        }
	        const proms = [];
	        payload.value = new Map();
	        for (const [key, value] of input) {
	            const keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
	            const valueResult = def.valueType._zod.run({ value: value, issues: [] }, ctx);
	            if (keyResult instanceof Promise || valueResult instanceof Promise) {
	                proms.push(Promise.all([keyResult, valueResult]).then(([keyResult, valueResult]) => {
	                    handleMapResult(keyResult, valueResult, payload, key, input, inst, ctx);
	                }));
	            }
	            else {
	                handleMapResult(keyResult, valueResult, payload, key, input, inst, ctx);
	            }
	        }
	        if (proms.length)
	            return Promise.all(proms).then(() => payload);
	        return payload;
	    };
	});
	function handleMapResult(keyResult, valueResult, final, key, input, inst, ctx) {
	    if (keyResult.issues.length) {
	        if (util.propertyKeyTypes.has(typeof key)) {
	            final.issues.push(...util.prefixIssues(key, keyResult.issues));
	        }
	        else {
	            final.issues.push({
	                code: "invalid_key",
	                origin: "map",
	                input,
	                inst,
	                issues: keyResult.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config())),
	            });
	        }
	    }
	    if (valueResult.issues.length) {
	        if (util.propertyKeyTypes.has(typeof key)) {
	            final.issues.push(...util.prefixIssues(key, valueResult.issues));
	        }
	        else {
	            final.issues.push({
	                origin: "map",
	                code: "invalid_element",
	                input,
	                inst,
	                key: key,
	                issues: valueResult.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config())),
	            });
	        }
	    }
	    final.value.set(keyResult.value, valueResult.value);
	}
	exports.$ZodSet = core.$constructor("$ZodSet", (inst, def) => {
	    exports.$ZodType.init(inst, def);
	    inst._zod.parse = (payload, ctx) => {
	        const input = payload.value;
	        if (!(input instanceof Set)) {
	            payload.issues.push({
	                input,
	                inst,
	                expected: "set",
	                code: "invalid_type",
	            });
	            return payload;
	        }
	        const proms = [];
	        payload.value = new Set();
	        for (const item of input) {
	            const result = def.valueType._zod.run({ value: item, issues: [] }, ctx);
	            if (result instanceof Promise) {
	                proms.push(result.then((result) => handleSetResult(result, payload)));
	            }
	            else
	                handleSetResult(result, payload);
	        }
	        if (proms.length)
	            return Promise.all(proms).then(() => payload);
	        return payload;
	    };
	});
	function handleSetResult(result, final) {
	    if (result.issues.length) {
	        final.issues.push(...result.issues);
	    }
	    final.value.add(result.value);
	}
	exports.$ZodEnum = core.$constructor("$ZodEnum", (inst, def) => {
	    exports.$ZodType.init(inst, def);
	    const values = util.getEnumValues(def.entries);
	    const valuesSet = new Set(values);
	    inst._zod.values = valuesSet;
	    inst._zod.pattern = new RegExp(`^(${values
	        .filter((k) => util.propertyKeyTypes.has(typeof k))
	        .map((o) => (typeof o === "string" ? util.escapeRegex(o) : o.toString()))
	        .join("|")})$`);
	    inst._zod.parse = (payload, _ctx) => {
	        const input = payload.value;
	        if (valuesSet.has(input)) {
	            return payload;
	        }
	        payload.issues.push({
	            code: "invalid_value",
	            values,
	            input,
	            inst,
	        });
	        return payload;
	    };
	});
	exports.$ZodLiteral = core.$constructor("$ZodLiteral", (inst, def) => {
	    exports.$ZodType.init(inst, def);
	    if (def.values.length === 0) {
	        throw new Error("Cannot create literal schema with no valid values");
	    }
	    inst._zod.values = new Set(def.values);
	    inst._zod.pattern = new RegExp(`^(${def.values
	        .map((o) => (typeof o === "string" ? util.escapeRegex(o) : o ? util.escapeRegex(o.toString()) : String(o)))
	        .join("|")})$`);
	    inst._zod.parse = (payload, _ctx) => {
	        const input = payload.value;
	        if (inst._zod.values.has(input)) {
	            return payload;
	        }
	        payload.issues.push({
	            code: "invalid_value",
	            values: def.values,
	            input,
	            inst,
	        });
	        return payload;
	    };
	});
	exports.$ZodFile = core.$constructor("$ZodFile", (inst, def) => {
	    exports.$ZodType.init(inst, def);
	    inst._zod.parse = (payload, _ctx) => {
	        const input = payload.value;
	        // @ts-ignore
	        if (input instanceof File)
	            return payload;
	        payload.issues.push({
	            expected: "file",
	            code: "invalid_type",
	            input,
	            inst,
	        });
	        return payload;
	    };
	});
	exports.$ZodTransform = core.$constructor("$ZodTransform", (inst, def) => {
	    exports.$ZodType.init(inst, def);
	    inst._zod.parse = (payload, ctx) => {
	        if (ctx.direction === "backward") {
	            throw new core.$ZodEncodeError(inst.constructor.name);
	        }
	        const _out = def.transform(payload.value, payload);
	        if (ctx.async) {
	            const output = _out instanceof Promise ? _out : Promise.resolve(_out);
	            return output.then((output) => {
	                payload.value = output;
	                return payload;
	            });
	        }
	        if (_out instanceof Promise) {
	            throw new core.$ZodAsyncError();
	        }
	        payload.value = _out;
	        return payload;
	    };
	});
	function handleOptionalResult(result, input) {
	    if (result.issues.length && input === undefined) {
	        return { issues: [], value: undefined };
	    }
	    return result;
	}
	exports.$ZodOptional = core.$constructor("$ZodOptional", (inst, def) => {
	    exports.$ZodType.init(inst, def);
	    inst._zod.optin = "optional";
	    inst._zod.optout = "optional";
	    util.defineLazy(inst._zod, "values", () => {
	        return def.innerType._zod.values ? new Set([...def.innerType._zod.values, undefined]) : undefined;
	    });
	    util.defineLazy(inst._zod, "pattern", () => {
	        const pattern = def.innerType._zod.pattern;
	        return pattern ? new RegExp(`^(${util.cleanRegex(pattern.source)})?$`) : undefined;
	    });
	    inst._zod.parse = (payload, ctx) => {
	        if (def.innerType._zod.optin === "optional") {
	            const result = def.innerType._zod.run(payload, ctx);
	            if (result instanceof Promise)
	                return result.then((r) => handleOptionalResult(r, payload.value));
	            return handleOptionalResult(result, payload.value);
	        }
	        if (payload.value === undefined) {
	            return payload;
	        }
	        return def.innerType._zod.run(payload, ctx);
	    };
	});
	exports.$ZodNullable = core.$constructor("$ZodNullable", (inst, def) => {
	    exports.$ZodType.init(inst, def);
	    util.defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
	    util.defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
	    util.defineLazy(inst._zod, "pattern", () => {
	        const pattern = def.innerType._zod.pattern;
	        return pattern ? new RegExp(`^(${util.cleanRegex(pattern.source)}|null)$`) : undefined;
	    });
	    util.defineLazy(inst._zod, "values", () => {
	        return def.innerType._zod.values ? new Set([...def.innerType._zod.values, null]) : undefined;
	    });
	    inst._zod.parse = (payload, ctx) => {
	        // Forward direction (decode): allow null to pass through
	        if (payload.value === null)
	            return payload;
	        return def.innerType._zod.run(payload, ctx);
	    };
	});
	exports.$ZodDefault = core.$constructor("$ZodDefault", (inst, def) => {
	    exports.$ZodType.init(inst, def);
	    // inst._zod.qin = "true";
	    inst._zod.optin = "optional";
	    util.defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	    inst._zod.parse = (payload, ctx) => {
	        if (ctx.direction === "backward") {
	            return def.innerType._zod.run(payload, ctx);
	        }
	        // Forward direction (decode): apply defaults for undefined input
	        if (payload.value === undefined) {
	            payload.value = def.defaultValue;
	            /**
	             * $ZodDefault returns the default value immediately in forward direction.
	             * It doesn't pass the default value into the validator ("prefault"). There's no reason to pass the default value through validation. The validity of the default is enforced by TypeScript statically. Otherwise, it's the responsibility of the user to ensure the default is valid. In the case of pipes with divergent in/out types, you can specify the default on the `in` schema of your ZodPipe to set a "prefault" for the pipe.   */
	            return payload;
	        }
	        // Forward direction: continue with default handling
	        const result = def.innerType._zod.run(payload, ctx);
	        if (result instanceof Promise) {
	            return result.then((result) => handleDefaultResult(result, def));
	        }
	        return handleDefaultResult(result, def);
	    };
	});
	function handleDefaultResult(payload, def) {
	    if (payload.value === undefined) {
	        payload.value = def.defaultValue;
	    }
	    return payload;
	}
	exports.$ZodPrefault = core.$constructor("$ZodPrefault", (inst, def) => {
	    exports.$ZodType.init(inst, def);
	    inst._zod.optin = "optional";
	    util.defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	    inst._zod.parse = (payload, ctx) => {
	        if (ctx.direction === "backward") {
	            return def.innerType._zod.run(payload, ctx);
	        }
	        // Forward direction (decode): apply prefault for undefined input
	        if (payload.value === undefined) {
	            payload.value = def.defaultValue;
	        }
	        return def.innerType._zod.run(payload, ctx);
	    };
	});
	exports.$ZodNonOptional = core.$constructor("$ZodNonOptional", (inst, def) => {
	    exports.$ZodType.init(inst, def);
	    util.defineLazy(inst._zod, "values", () => {
	        const v = def.innerType._zod.values;
	        return v ? new Set([...v].filter((x) => x !== undefined)) : undefined;
	    });
	    inst._zod.parse = (payload, ctx) => {
	        const result = def.innerType._zod.run(payload, ctx);
	        if (result instanceof Promise) {
	            return result.then((result) => handleNonOptionalResult(result, inst));
	        }
	        return handleNonOptionalResult(result, inst);
	    };
	});
	function handleNonOptionalResult(payload, inst) {
	    if (!payload.issues.length && payload.value === undefined) {
	        payload.issues.push({
	            code: "invalid_type",
	            expected: "nonoptional",
	            input: payload.value,
	            inst,
	        });
	    }
	    return payload;
	}
	exports.$ZodSuccess = core.$constructor("$ZodSuccess", (inst, def) => {
	    exports.$ZodType.init(inst, def);
	    inst._zod.parse = (payload, ctx) => {
	        if (ctx.direction === "backward") {
	            throw new core.$ZodEncodeError("ZodSuccess");
	        }
	        const result = def.innerType._zod.run(payload, ctx);
	        if (result instanceof Promise) {
	            return result.then((result) => {
	                payload.value = result.issues.length === 0;
	                return payload;
	            });
	        }
	        payload.value = result.issues.length === 0;
	        return payload;
	    };
	});
	exports.$ZodCatch = core.$constructor("$ZodCatch", (inst, def) => {
	    exports.$ZodType.init(inst, def);
	    util.defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
	    util.defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
	    util.defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	    inst._zod.parse = (payload, ctx) => {
	        if (ctx.direction === "backward") {
	            return def.innerType._zod.run(payload, ctx);
	        }
	        // Forward direction (decode): apply catch logic
	        const result = def.innerType._zod.run(payload, ctx);
	        if (result instanceof Promise) {
	            return result.then((result) => {
	                payload.value = result.value;
	                if (result.issues.length) {
	                    payload.value = def.catchValue({
	                        ...payload,
	                        error: {
	                            issues: result.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config())),
	                        },
	                        input: payload.value,
	                    });
	                    payload.issues = [];
	                }
	                return payload;
	            });
	        }
	        payload.value = result.value;
	        if (result.issues.length) {
	            payload.value = def.catchValue({
	                ...payload,
	                error: {
	                    issues: result.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config())),
	                },
	                input: payload.value,
	            });
	            payload.issues = [];
	        }
	        return payload;
	    };
	});
	exports.$ZodNaN = core.$constructor("$ZodNaN", (inst, def) => {
	    exports.$ZodType.init(inst, def);
	    inst._zod.parse = (payload, _ctx) => {
	        if (typeof payload.value !== "number" || !Number.isNaN(payload.value)) {
	            payload.issues.push({
	                input: payload.value,
	                inst,
	                expected: "nan",
	                code: "invalid_type",
	            });
	            return payload;
	        }
	        return payload;
	    };
	});
	exports.$ZodPipe = core.$constructor("$ZodPipe", (inst, def) => {
	    exports.$ZodType.init(inst, def);
	    util.defineLazy(inst._zod, "values", () => def.in._zod.values);
	    util.defineLazy(inst._zod, "optin", () => def.in._zod.optin);
	    util.defineLazy(inst._zod, "optout", () => def.out._zod.optout);
	    util.defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
	    inst._zod.parse = (payload, ctx) => {
	        if (ctx.direction === "backward") {
	            const right = def.out._zod.run(payload, ctx);
	            if (right instanceof Promise) {
	                return right.then((right) => handlePipeResult(right, def.in, ctx));
	            }
	            return handlePipeResult(right, def.in, ctx);
	        }
	        const left = def.in._zod.run(payload, ctx);
	        if (left instanceof Promise) {
	            return left.then((left) => handlePipeResult(left, def.out, ctx));
	        }
	        return handlePipeResult(left, def.out, ctx);
	    };
	});
	function handlePipeResult(left, next, ctx) {
	    if (left.issues.length) {
	        // prevent further checks
	        left.aborted = true;
	        return left;
	    }
	    return next._zod.run({ value: left.value, issues: left.issues }, ctx);
	}
	exports.$ZodCodec = core.$constructor("$ZodCodec", (inst, def) => {
	    exports.$ZodType.init(inst, def);
	    util.defineLazy(inst._zod, "values", () => def.in._zod.values);
	    util.defineLazy(inst._zod, "optin", () => def.in._zod.optin);
	    util.defineLazy(inst._zod, "optout", () => def.out._zod.optout);
	    util.defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
	    inst._zod.parse = (payload, ctx) => {
	        const direction = ctx.direction || "forward";
	        if (direction === "forward") {
	            const left = def.in._zod.run(payload, ctx);
	            if (left instanceof Promise) {
	                return left.then((left) => handleCodecAResult(left, def, ctx));
	            }
	            return handleCodecAResult(left, def, ctx);
	        }
	        else {
	            const right = def.out._zod.run(payload, ctx);
	            if (right instanceof Promise) {
	                return right.then((right) => handleCodecAResult(right, def, ctx));
	            }
	            return handleCodecAResult(right, def, ctx);
	        }
	    };
	});
	function handleCodecAResult(result, def, ctx) {
	    if (result.issues.length) {
	        // prevent further checks
	        result.aborted = true;
	        return result;
	    }
	    const direction = ctx.direction || "forward";
	    if (direction === "forward") {
	        const transformed = def.transform(result.value, result);
	        if (transformed instanceof Promise) {
	            return transformed.then((value) => handleCodecTxResult(result, value, def.out, ctx));
	        }
	        return handleCodecTxResult(result, transformed, def.out, ctx);
	    }
	    else {
	        const transformed = def.reverseTransform(result.value, result);
	        if (transformed instanceof Promise) {
	            return transformed.then((value) => handleCodecTxResult(result, value, def.in, ctx));
	        }
	        return handleCodecTxResult(result, transformed, def.in, ctx);
	    }
	}
	function handleCodecTxResult(left, value, nextSchema, ctx) {
	    // Check if transform added any issues
	    if (left.issues.length) {
	        left.aborted = true;
	        return left;
	    }
	    return nextSchema._zod.run({ value, issues: left.issues }, ctx);
	}
	exports.$ZodReadonly = core.$constructor("$ZodReadonly", (inst, def) => {
	    exports.$ZodType.init(inst, def);
	    util.defineLazy(inst._zod, "propValues", () => def.innerType._zod.propValues);
	    util.defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	    util.defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
	    util.defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
	    inst._zod.parse = (payload, ctx) => {
	        if (ctx.direction === "backward") {
	            return def.innerType._zod.run(payload, ctx);
	        }
	        const result = def.innerType._zod.run(payload, ctx);
	        if (result instanceof Promise) {
	            return result.then(handleReadonlyResult);
	        }
	        return handleReadonlyResult(result);
	    };
	});
	function handleReadonlyResult(payload) {
	    payload.value = Object.freeze(payload.value);
	    return payload;
	}
	exports.$ZodTemplateLiteral = core.$constructor("$ZodTemplateLiteral", (inst, def) => {
	    exports.$ZodType.init(inst, def);
	    const regexParts = [];
	    for (const part of def.parts) {
	        if (typeof part === "object" && part !== null) {
	            // is Zod schema
	            if (!part._zod.pattern) {
	                // if (!source)
	                throw new Error(`Invalid template literal part, no pattern found: ${[...part._zod.traits].shift()}`);
	            }
	            const source = part._zod.pattern instanceof RegExp ? part._zod.pattern.source : part._zod.pattern;
	            if (!source)
	                throw new Error(`Invalid template literal part: ${part._zod.traits}`);
	            const start = source.startsWith("^") ? 1 : 0;
	            const end = source.endsWith("$") ? source.length - 1 : source.length;
	            regexParts.push(source.slice(start, end));
	        }
	        else if (part === null || util.primitiveTypes.has(typeof part)) {
	            regexParts.push(util.escapeRegex(`${part}`));
	        }
	        else {
	            throw new Error(`Invalid template literal part: ${part}`);
	        }
	    }
	    inst._zod.pattern = new RegExp(`^${regexParts.join("")}$`);
	    inst._zod.parse = (payload, _ctx) => {
	        if (typeof payload.value !== "string") {
	            payload.issues.push({
	                input: payload.value,
	                inst,
	                expected: "template_literal",
	                code: "invalid_type",
	            });
	            return payload;
	        }
	        inst._zod.pattern.lastIndex = 0;
	        if (!inst._zod.pattern.test(payload.value)) {
	            payload.issues.push({
	                input: payload.value,
	                inst,
	                code: "invalid_format",
	                format: def.format ?? "template_literal",
	                pattern: inst._zod.pattern.source,
	            });
	            return payload;
	        }
	        return payload;
	    };
	});
	exports.$ZodFunction = core.$constructor("$ZodFunction", (inst, def) => {
	    exports.$ZodType.init(inst, def);
	    inst._def = def;
	    inst._zod.def = def;
	    inst.implement = (func) => {
	        if (typeof func !== "function") {
	            throw new Error("implement() must be called with a function");
	        }
	        return function (...args) {
	            const parsedArgs = inst._def.input ? (0, parse_js_1.parse)(inst._def.input, args) : args;
	            const result = Reflect.apply(func, this, parsedArgs);
	            if (inst._def.output) {
	                return (0, parse_js_1.parse)(inst._def.output, result);
	            }
	            return result;
	        };
	    };
	    inst.implementAsync = (func) => {
	        if (typeof func !== "function") {
	            throw new Error("implementAsync() must be called with a function");
	        }
	        return async function (...args) {
	            const parsedArgs = inst._def.input ? await (0, parse_js_1.parseAsync)(inst._def.input, args) : args;
	            const result = await Reflect.apply(func, this, parsedArgs);
	            if (inst._def.output) {
	                return await (0, parse_js_1.parseAsync)(inst._def.output, result);
	            }
	            return result;
	        };
	    };
	    inst._zod.parse = (payload, _ctx) => {
	        if (typeof payload.value !== "function") {
	            payload.issues.push({
	                code: "invalid_type",
	                expected: "function",
	                input: payload.value,
	                inst,
	            });
	            return payload;
	        }
	        // Check if output is a promise type to determine if we should use async implementation
	        const hasPromiseOutput = inst._def.output && inst._def.output._zod.def.type === "promise";
	        if (hasPromiseOutput) {
	            payload.value = inst.implementAsync(payload.value);
	        }
	        else {
	            payload.value = inst.implement(payload.value);
	        }
	        return payload;
	    };
	    inst.input = (...args) => {
	        const F = inst.constructor;
	        if (Array.isArray(args[0])) {
	            return new F({
	                type: "function",
	                input: new exports.$ZodTuple({
	                    type: "tuple",
	                    items: args[0],
	                    rest: args[1],
	                }),
	                output: inst._def.output,
	            });
	        }
	        return new F({
	            type: "function",
	            input: args[0],
	            output: inst._def.output,
	        });
	    };
	    inst.output = (output) => {
	        const F = inst.constructor;
	        return new F({
	            type: "function",
	            input: inst._def.input,
	            output,
	        });
	    };
	    return inst;
	});
	exports.$ZodPromise = core.$constructor("$ZodPromise", (inst, def) => {
	    exports.$ZodType.init(inst, def);
	    inst._zod.parse = (payload, ctx) => {
	        return Promise.resolve(payload.value).then((inner) => def.innerType._zod.run({ value: inner, issues: [] }, ctx));
	    };
	});
	exports.$ZodLazy = core.$constructor("$ZodLazy", (inst, def) => {
	    exports.$ZodType.init(inst, def);
	    // let _innerType!: any;
	    // util.defineLazy(def, "getter", () => {
	    //   if (!_innerType) {
	    //     _innerType = def.getter();
	    //   }
	    //   return () => _innerType;
	    // });
	    util.defineLazy(inst._zod, "innerType", () => def.getter());
	    util.defineLazy(inst._zod, "pattern", () => inst._zod.innerType._zod.pattern);
	    util.defineLazy(inst._zod, "propValues", () => inst._zod.innerType._zod.propValues);
	    util.defineLazy(inst._zod, "optin", () => inst._zod.innerType._zod.optin ?? undefined);
	    util.defineLazy(inst._zod, "optout", () => inst._zod.innerType._zod.optout ?? undefined);
	    inst._zod.parse = (payload, ctx) => {
	        const inner = inst._zod.innerType;
	        return inner._zod.run(payload, ctx);
	    };
	});
	exports.$ZodCustom = core.$constructor("$ZodCustom", (inst, def) => {
	    checks.$ZodCheck.init(inst, def);
	    exports.$ZodType.init(inst, def);
	    inst._zod.parse = (payload, _) => {
	        return payload;
	    };
	    inst._zod.check = (payload) => {
	        const input = payload.value;
	        const r = def.fn(input);
	        if (r instanceof Promise) {
	            return r.then((r) => handleRefineResult(r, payload, input, inst));
	        }
	        handleRefineResult(r, payload, input, inst);
	        return;
	    };
	});
	function handleRefineResult(result, payload, input, inst) {
	    if (!result) {
	        const _iss = {
	            code: "custom",
	            input,
	            inst, // incorporates params.error into issue reporting
	            path: [...(inst._zod.def.path ?? [])], // incorporates params.error into issue reporting
	            continue: !inst._zod.def.abort,
	            // params: inst._zod.def.params,
	        };
	        if (inst._zod.def.params)
	            _iss.params = inst._zod.def.params;
	        payload.issues.push(util.issue(_iss));
	    }
	} 
} (schemas$3));

var locales = {};

var ar = {exports: {}};

(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	const util = __importStar(util$3);
	const error = () => {
	    const Sizable = {
	        string: { unit: "حرف", verb: "أن يحوي" },
	        file: { unit: "بايت", verb: "أن يحوي" },
	        array: { unit: "عنصر", verb: "أن يحوي" },
	        set: { unit: "عنصر", verb: "أن يحوي" },
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    const parsedType = (data) => {
	        const t = typeof data;
	        switch (t) {
	            case "number": {
	                return Number.isNaN(data) ? "NaN" : "number";
	            }
	            case "object": {
	                if (Array.isArray(data)) {
	                    return "array";
	                }
	                if (data === null) {
	                    return "null";
	                }
	                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
	                    return data.constructor.name;
	                }
	            }
	        }
	        return t;
	    };
	    const Nouns = {
	        regex: "مدخل",
	        email: "بريد إلكتروني",
	        url: "رابط",
	        emoji: "إيموجي",
	        uuid: "UUID",
	        uuidv4: "UUIDv4",
	        uuidv6: "UUIDv6",
	        nanoid: "nanoid",
	        guid: "GUID",
	        cuid: "cuid",
	        cuid2: "cuid2",
	        ulid: "ULID",
	        xid: "XID",
	        ksuid: "KSUID",
	        datetime: "تاريخ ووقت بمعيار ISO",
	        date: "تاريخ بمعيار ISO",
	        time: "وقت بمعيار ISO",
	        duration: "مدة بمعيار ISO",
	        ipv4: "عنوان IPv4",
	        ipv6: "عنوان IPv6",
	        cidrv4: "مدى عناوين بصيغة IPv4",
	        cidrv6: "مدى عناوين بصيغة IPv6",
	        base64: "نَص بترميز base64-encoded",
	        base64url: "نَص بترميز base64url-encoded",
	        json_string: "نَص على هيئة JSON",
	        e164: "رقم هاتف بمعيار E.164",
	        jwt: "JWT",
	        template_literal: "مدخل",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `مدخلات غير مقبولة: يفترض إدخال ${issue.expected}، ولكن تم إدخال ${parsedType(issue.input)}`;
	            case "invalid_value":
	                if (issue.values.length === 1)
	                    return `مدخلات غير مقبولة: يفترض إدخال ${util.stringifyPrimitive(issue.values[0])}`;
	                return `اختيار غير مقبول: يتوقع انتقاء أحد هذه الخيارات: ${util.joinValues(issue.values, "|")}`;
	            case "too_big": {
	                const adj = issue.inclusive ? "<=" : "<";
	                const sizing = getSizing(issue.origin);
	                if (sizing)
	                    return ` أكبر من اللازم: يفترض أن تكون ${issue.origin ?? "القيمة"} ${adj} ${issue.maximum.toString()} ${sizing.unit ?? "عنصر"}`;
	                return `أكبر من اللازم: يفترض أن تكون ${issue.origin ?? "القيمة"} ${adj} ${issue.maximum.toString()}`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? ">=" : ">";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    return `أصغر من اللازم: يفترض لـ ${issue.origin} أن يكون ${adj} ${issue.minimum.toString()} ${sizing.unit}`;
	                }
	                return `أصغر من اللازم: يفترض لـ ${issue.origin} أن يكون ${adj} ${issue.minimum.toString()}`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with")
	                    return `نَص غير مقبول: يجب أن يبدأ بـ "${issue.prefix}"`;
	                if (_issue.format === "ends_with")
	                    return `نَص غير مقبول: يجب أن ينتهي بـ "${_issue.suffix}"`;
	                if (_issue.format === "includes")
	                    return `نَص غير مقبول: يجب أن يتضمَّن "${_issue.includes}"`;
	                if (_issue.format === "regex")
	                    return `نَص غير مقبول: يجب أن يطابق النمط ${_issue.pattern}`;
	                return `${Nouns[_issue.format] ?? issue.format} غير مقبول`;
	            }
	            case "not_multiple_of":
	                return `رقم غير مقبول: يجب أن يكون من مضاعفات ${issue.divisor}`;
	            case "unrecognized_keys":
	                return `معرف${issue.keys.length > 1 ? "ات" : ""} غريب${issue.keys.length > 1 ? "ة" : ""}: ${util.joinValues(issue.keys, "، ")}`;
	            case "invalid_key":
	                return `معرف غير مقبول في ${issue.origin}`;
	            case "invalid_union":
	                return "مدخل غير مقبول";
	            case "invalid_element":
	                return `مدخل غير مقبول في ${issue.origin}`;
	            default:
	                return "مدخل غير مقبول";
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	}
	module.exports = exports.default; 
} (ar, ar.exports));

var arExports = ar.exports;

var az = {exports: {}};

(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	const util = __importStar(util$3);
	const error = () => {
	    const Sizable = {
	        string: { unit: "simvol", verb: "olmalıdır" },
	        file: { unit: "bayt", verb: "olmalıdır" },
	        array: { unit: "element", verb: "olmalıdır" },
	        set: { unit: "element", verb: "olmalıdır" },
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    const parsedType = (data) => {
	        const t = typeof data;
	        switch (t) {
	            case "number": {
	                return Number.isNaN(data) ? "NaN" : "number";
	            }
	            case "object": {
	                if (Array.isArray(data)) {
	                    return "array";
	                }
	                if (data === null) {
	                    return "null";
	                }
	                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
	                    return data.constructor.name;
	                }
	            }
	        }
	        return t;
	    };
	    const Nouns = {
	        regex: "input",
	        email: "email address",
	        url: "URL",
	        emoji: "emoji",
	        uuid: "UUID",
	        uuidv4: "UUIDv4",
	        uuidv6: "UUIDv6",
	        nanoid: "nanoid",
	        guid: "GUID",
	        cuid: "cuid",
	        cuid2: "cuid2",
	        ulid: "ULID",
	        xid: "XID",
	        ksuid: "KSUID",
	        datetime: "ISO datetime",
	        date: "ISO date",
	        time: "ISO time",
	        duration: "ISO duration",
	        ipv4: "IPv4 address",
	        ipv6: "IPv6 address",
	        cidrv4: "IPv4 range",
	        cidrv6: "IPv6 range",
	        base64: "base64-encoded string",
	        base64url: "base64url-encoded string",
	        json_string: "JSON string",
	        e164: "E.164 number",
	        jwt: "JWT",
	        template_literal: "input",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `Yanlış dəyər: gözlənilən ${issue.expected}, daxil olan ${parsedType(issue.input)}`;
	            case "invalid_value":
	                if (issue.values.length === 1)
	                    return `Yanlış dəyər: gözlənilən ${util.stringifyPrimitive(issue.values[0])}`;
	                return `Yanlış seçim: aşağıdakılardan biri olmalıdır: ${util.joinValues(issue.values, "|")}`;
	            case "too_big": {
	                const adj = issue.inclusive ? "<=" : "<";
	                const sizing = getSizing(issue.origin);
	                if (sizing)
	                    return `Çox böyük: gözlənilən ${issue.origin ?? "dəyər"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "element"}`;
	                return `Çox böyük: gözlənilən ${issue.origin ?? "dəyər"} ${adj}${issue.maximum.toString()}`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? ">=" : ">";
	                const sizing = getSizing(issue.origin);
	                if (sizing)
	                    return `Çox kiçik: gözlənilən ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
	                return `Çox kiçik: gözlənilən ${issue.origin} ${adj}${issue.minimum.toString()}`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with")
	                    return `Yanlış mətn: "${_issue.prefix}" ilə başlamalıdır`;
	                if (_issue.format === "ends_with")
	                    return `Yanlış mətn: "${_issue.suffix}" ilə bitməlidir`;
	                if (_issue.format === "includes")
	                    return `Yanlış mətn: "${_issue.includes}" daxil olmalıdır`;
	                if (_issue.format === "regex")
	                    return `Yanlış mətn: ${_issue.pattern} şablonuna uyğun olmalıdır`;
	                return `Yanlış ${Nouns[_issue.format] ?? issue.format}`;
	            }
	            case "not_multiple_of":
	                return `Yanlış ədəd: ${issue.divisor} ilə bölünə bilən olmalıdır`;
	            case "unrecognized_keys":
	                return `Tanınmayan açar${issue.keys.length > 1 ? "lar" : ""}: ${util.joinValues(issue.keys, ", ")}`;
	            case "invalid_key":
	                return `${issue.origin} daxilində yanlış açar`;
	            case "invalid_union":
	                return "Yanlış dəyər";
	            case "invalid_element":
	                return `${issue.origin} daxilində yanlış dəyər`;
	            default:
	                return `Yanlış dəyər`;
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	}
	module.exports = exports.default; 
} (az, az.exports));

var azExports = az.exports;

var be = {exports: {}};

(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	const util = __importStar(util$3);
	function getBelarusianPlural(count, one, few, many) {
	    const absCount = Math.abs(count);
	    const lastDigit = absCount % 10;
	    const lastTwoDigits = absCount % 100;
	    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
	        return many;
	    }
	    if (lastDigit === 1) {
	        return one;
	    }
	    if (lastDigit >= 2 && lastDigit <= 4) {
	        return few;
	    }
	    return many;
	}
	const error = () => {
	    const Sizable = {
	        string: {
	            unit: {
	                one: "сімвал",
	                few: "сімвалы",
	                many: "сімвалаў",
	            },
	            verb: "мець",
	        },
	        array: {
	            unit: {
	                one: "элемент",
	                few: "элементы",
	                many: "элементаў",
	            },
	            verb: "мець",
	        },
	        set: {
	            unit: {
	                one: "элемент",
	                few: "элементы",
	                many: "элементаў",
	            },
	            verb: "мець",
	        },
	        file: {
	            unit: {
	                one: "байт",
	                few: "байты",
	                many: "байтаў",
	            },
	            verb: "мець",
	        },
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    const parsedType = (data) => {
	        const t = typeof data;
	        switch (t) {
	            case "number": {
	                return Number.isNaN(data) ? "NaN" : "лік";
	            }
	            case "object": {
	                if (Array.isArray(data)) {
	                    return "масіў";
	                }
	                if (data === null) {
	                    return "null";
	                }
	                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
	                    return data.constructor.name;
	                }
	            }
	        }
	        return t;
	    };
	    const Nouns = {
	        regex: "увод",
	        email: "email адрас",
	        url: "URL",
	        emoji: "эмодзі",
	        uuid: "UUID",
	        uuidv4: "UUIDv4",
	        uuidv6: "UUIDv6",
	        nanoid: "nanoid",
	        guid: "GUID",
	        cuid: "cuid",
	        cuid2: "cuid2",
	        ulid: "ULID",
	        xid: "XID",
	        ksuid: "KSUID",
	        datetime: "ISO дата і час",
	        date: "ISO дата",
	        time: "ISO час",
	        duration: "ISO працягласць",
	        ipv4: "IPv4 адрас",
	        ipv6: "IPv6 адрас",
	        cidrv4: "IPv4 дыяпазон",
	        cidrv6: "IPv6 дыяпазон",
	        base64: "радок у фармаце base64",
	        base64url: "радок у фармаце base64url",
	        json_string: "JSON радок",
	        e164: "нумар E.164",
	        jwt: "JWT",
	        template_literal: "увод",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `Няправільны ўвод: чакаўся ${issue.expected}, атрымана ${parsedType(issue.input)}`;
	            case "invalid_value":
	                if (issue.values.length === 1)
	                    return `Няправільны ўвод: чакалася ${util.stringifyPrimitive(issue.values[0])}`;
	                return `Няправільны варыянт: чакаўся адзін з ${util.joinValues(issue.values, "|")}`;
	            case "too_big": {
	                const adj = issue.inclusive ? "<=" : "<";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    const maxValue = Number(issue.maximum);
	                    const unit = getBelarusianPlural(maxValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
	                    return `Занадта вялікі: чакалася, што ${issue.origin ?? "значэнне"} павінна ${sizing.verb} ${adj}${issue.maximum.toString()} ${unit}`;
	                }
	                return `Занадта вялікі: чакалася, што ${issue.origin ?? "значэнне"} павінна быць ${adj}${issue.maximum.toString()}`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? ">=" : ">";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    const minValue = Number(issue.minimum);
	                    const unit = getBelarusianPlural(minValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
	                    return `Занадта малы: чакалася, што ${issue.origin} павінна ${sizing.verb} ${adj}${issue.minimum.toString()} ${unit}`;
	                }
	                return `Занадта малы: чакалася, што ${issue.origin} павінна быць ${adj}${issue.minimum.toString()}`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with")
	                    return `Няправільны радок: павінен пачынацца з "${_issue.prefix}"`;
	                if (_issue.format === "ends_with")
	                    return `Няправільны радок: павінен заканчвацца на "${_issue.suffix}"`;
	                if (_issue.format === "includes")
	                    return `Няправільны радок: павінен змяшчаць "${_issue.includes}"`;
	                if (_issue.format === "regex")
	                    return `Няправільны радок: павінен адпавядаць шаблону ${_issue.pattern}`;
	                return `Няправільны ${Nouns[_issue.format] ?? issue.format}`;
	            }
	            case "not_multiple_of":
	                return `Няправільны лік: павінен быць кратным ${issue.divisor}`;
	            case "unrecognized_keys":
	                return `Нераспазнаны ${issue.keys.length > 1 ? "ключы" : "ключ"}: ${util.joinValues(issue.keys, ", ")}`;
	            case "invalid_key":
	                return `Няправільны ключ у ${issue.origin}`;
	            case "invalid_union":
	                return "Няправільны ўвод";
	            case "invalid_element":
	                return `Няправільнае значэнне ў ${issue.origin}`;
	            default:
	                return `Няправільны ўвод`;
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	}
	module.exports = exports.default; 
} (be, be.exports));

var beExports = be.exports;

var ca = {exports: {}};

(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	const util = __importStar(util$3);
	const error = () => {
	    const Sizable = {
	        string: { unit: "caràcters", verb: "contenir" },
	        file: { unit: "bytes", verb: "contenir" },
	        array: { unit: "elements", verb: "contenir" },
	        set: { unit: "elements", verb: "contenir" },
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    const parsedType = (data) => {
	        const t = typeof data;
	        switch (t) {
	            case "number": {
	                return Number.isNaN(data) ? "NaN" : "number";
	            }
	            case "object": {
	                if (Array.isArray(data)) {
	                    return "array";
	                }
	                if (data === null) {
	                    return "null";
	                }
	                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
	                    return data.constructor.name;
	                }
	            }
	        }
	        return t;
	    };
	    const Nouns = {
	        regex: "entrada",
	        email: "adreça electrònica",
	        url: "URL",
	        emoji: "emoji",
	        uuid: "UUID",
	        uuidv4: "UUIDv4",
	        uuidv6: "UUIDv6",
	        nanoid: "nanoid",
	        guid: "GUID",
	        cuid: "cuid",
	        cuid2: "cuid2",
	        ulid: "ULID",
	        xid: "XID",
	        ksuid: "KSUID",
	        datetime: "data i hora ISO",
	        date: "data ISO",
	        time: "hora ISO",
	        duration: "durada ISO",
	        ipv4: "adreça IPv4",
	        ipv6: "adreça IPv6",
	        cidrv4: "rang IPv4",
	        cidrv6: "rang IPv6",
	        base64: "cadena codificada en base64",
	        base64url: "cadena codificada en base64url",
	        json_string: "cadena JSON",
	        e164: "número E.164",
	        jwt: "JWT",
	        template_literal: "entrada",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `Tipus invàlid: s'esperava ${issue.expected}, s'ha rebut ${parsedType(issue.input)}`;
	            // return `Tipus invàlid: s'esperava ${issue.expected}, s'ha rebut ${util.getParsedType(issue.input)}`;
	            case "invalid_value":
	                if (issue.values.length === 1)
	                    return `Valor invàlid: s'esperava ${util.stringifyPrimitive(issue.values[0])}`;
	                return `Opció invàlida: s'esperava una de ${util.joinValues(issue.values, " o ")}`;
	            case "too_big": {
	                const adj = issue.inclusive ? "com a màxim" : "menys de";
	                const sizing = getSizing(issue.origin);
	                if (sizing)
	                    return `Massa gran: s'esperava que ${issue.origin ?? "el valor"} contingués ${adj} ${issue.maximum.toString()} ${sizing.unit ?? "elements"}`;
	                return `Massa gran: s'esperava que ${issue.origin ?? "el valor"} fos ${adj} ${issue.maximum.toString()}`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? "com a mínim" : "més de";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    return `Massa petit: s'esperava que ${issue.origin} contingués ${adj} ${issue.minimum.toString()} ${sizing.unit}`;
	                }
	                return `Massa petit: s'esperava que ${issue.origin} fos ${adj} ${issue.minimum.toString()}`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with") {
	                    return `Format invàlid: ha de començar amb "${_issue.prefix}"`;
	                }
	                if (_issue.format === "ends_with")
	                    return `Format invàlid: ha d'acabar amb "${_issue.suffix}"`;
	                if (_issue.format === "includes")
	                    return `Format invàlid: ha d'incloure "${_issue.includes}"`;
	                if (_issue.format === "regex")
	                    return `Format invàlid: ha de coincidir amb el patró ${_issue.pattern}`;
	                return `Format invàlid per a ${Nouns[_issue.format] ?? issue.format}`;
	            }
	            case "not_multiple_of":
	                return `Número invàlid: ha de ser múltiple de ${issue.divisor}`;
	            case "unrecognized_keys":
	                return `Clau${issue.keys.length > 1 ? "s" : ""} no reconeguda${issue.keys.length > 1 ? "s" : ""}: ${util.joinValues(issue.keys, ", ")}`;
	            case "invalid_key":
	                return `Clau invàlida a ${issue.origin}`;
	            case "invalid_union":
	                return "Entrada invàlida"; // Could also be "Tipus d'unió invàlid" but "Entrada invàlida" is more general
	            case "invalid_element":
	                return `Element invàlid a ${issue.origin}`;
	            default:
	                return `Entrada invàlida`;
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	}
	module.exports = exports.default; 
} (ca, ca.exports));

var caExports = ca.exports;

var cs = {exports: {}};

(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	const util = __importStar(util$3);
	const error = () => {
	    const Sizable = {
	        string: { unit: "znaků", verb: "mít" },
	        file: { unit: "bajtů", verb: "mít" },
	        array: { unit: "prvků", verb: "mít" },
	        set: { unit: "prvků", verb: "mít" },
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    const parsedType = (data) => {
	        const t = typeof data;
	        switch (t) {
	            case "number": {
	                return Number.isNaN(data) ? "NaN" : "číslo";
	            }
	            case "string": {
	                return "řetězec";
	            }
	            case "boolean": {
	                return "boolean";
	            }
	            case "bigint": {
	                return "bigint";
	            }
	            case "function": {
	                return "funkce";
	            }
	            case "symbol": {
	                return "symbol";
	            }
	            case "undefined": {
	                return "undefined";
	            }
	            case "object": {
	                if (Array.isArray(data)) {
	                    return "pole";
	                }
	                if (data === null) {
	                    return "null";
	                }
	                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
	                    return data.constructor.name;
	                }
	            }
	        }
	        return t;
	    };
	    const Nouns = {
	        regex: "regulární výraz",
	        email: "e-mailová adresa",
	        url: "URL",
	        emoji: "emoji",
	        uuid: "UUID",
	        uuidv4: "UUIDv4",
	        uuidv6: "UUIDv6",
	        nanoid: "nanoid",
	        guid: "GUID",
	        cuid: "cuid",
	        cuid2: "cuid2",
	        ulid: "ULID",
	        xid: "XID",
	        ksuid: "KSUID",
	        datetime: "datum a čas ve formátu ISO",
	        date: "datum ve formátu ISO",
	        time: "čas ve formátu ISO",
	        duration: "doba trvání ISO",
	        ipv4: "IPv4 adresa",
	        ipv6: "IPv6 adresa",
	        cidrv4: "rozsah IPv4",
	        cidrv6: "rozsah IPv6",
	        base64: "řetězec zakódovaný ve formátu base64",
	        base64url: "řetězec zakódovaný ve formátu base64url",
	        json_string: "řetězec ve formátu JSON",
	        e164: "číslo E.164",
	        jwt: "JWT",
	        template_literal: "vstup",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `Neplatný vstup: očekáváno ${issue.expected}, obdrženo ${parsedType(issue.input)}`;
	            case "invalid_value":
	                if (issue.values.length === 1)
	                    return `Neplatný vstup: očekáváno ${util.stringifyPrimitive(issue.values[0])}`;
	                return `Neplatná možnost: očekávána jedna z hodnot ${util.joinValues(issue.values, "|")}`;
	            case "too_big": {
	                const adj = issue.inclusive ? "<=" : "<";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    return `Hodnota je příliš velká: ${issue.origin ?? "hodnota"} musí mít ${adj}${issue.maximum.toString()} ${sizing.unit ?? "prvků"}`;
	                }
	                return `Hodnota je příliš velká: ${issue.origin ?? "hodnota"} musí být ${adj}${issue.maximum.toString()}`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? ">=" : ">";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    return `Hodnota je příliš malá: ${issue.origin ?? "hodnota"} musí mít ${adj}${issue.minimum.toString()} ${sizing.unit ?? "prvků"}`;
	                }
	                return `Hodnota je příliš malá: ${issue.origin ?? "hodnota"} musí být ${adj}${issue.minimum.toString()}`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with")
	                    return `Neplatný řetězec: musí začínat na "${_issue.prefix}"`;
	                if (_issue.format === "ends_with")
	                    return `Neplatný řetězec: musí končit na "${_issue.suffix}"`;
	                if (_issue.format === "includes")
	                    return `Neplatný řetězec: musí obsahovat "${_issue.includes}"`;
	                if (_issue.format === "regex")
	                    return `Neplatný řetězec: musí odpovídat vzoru ${_issue.pattern}`;
	                return `Neplatný formát ${Nouns[_issue.format] ?? issue.format}`;
	            }
	            case "not_multiple_of":
	                return `Neplatné číslo: musí být násobkem ${issue.divisor}`;
	            case "unrecognized_keys":
	                return `Neznámé klíče: ${util.joinValues(issue.keys, ", ")}`;
	            case "invalid_key":
	                return `Neplatný klíč v ${issue.origin}`;
	            case "invalid_union":
	                return "Neplatný vstup";
	            case "invalid_element":
	                return `Neplatná hodnota v ${issue.origin}`;
	            default:
	                return `Neplatný vstup`;
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	}
	module.exports = exports.default; 
} (cs, cs.exports));

var csExports = cs.exports;

var da = {exports: {}};

(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	const util = __importStar(util$3);
	const error = () => {
	    const Sizable = {
	        string: { unit: "tegn", verb: "havde" },
	        file: { unit: "bytes", verb: "havde" },
	        array: { unit: "elementer", verb: "indeholdt" },
	        set: { unit: "elementer", verb: "indeholdt" },
	    };
	    const TypeNames = {
	        string: "streng",
	        number: "tal",
	        boolean: "boolean",
	        array: "liste",
	        object: "objekt",
	        set: "sæt",
	        file: "fil",
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    function getTypeName(type) {
	        return TypeNames[type] ?? type;
	    }
	    const parsedType = (data) => {
	        const t = typeof data;
	        switch (t) {
	            case "number": {
	                return Number.isNaN(data) ? "NaN" : "tal";
	            }
	            case "object": {
	                if (Array.isArray(data)) {
	                    return "liste";
	                }
	                if (data === null) {
	                    return "null";
	                }
	                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
	                    return data.constructor.name;
	                }
	                return "objekt";
	            }
	        }
	        return t;
	    };
	    const Nouns = {
	        regex: "input",
	        email: "e-mailadresse",
	        url: "URL",
	        emoji: "emoji",
	        uuid: "UUID",
	        uuidv4: "UUIDv4",
	        uuidv6: "UUIDv6",
	        nanoid: "nanoid",
	        guid: "GUID",
	        cuid: "cuid",
	        cuid2: "cuid2",
	        ulid: "ULID",
	        xid: "XID",
	        ksuid: "KSUID",
	        datetime: "ISO dato- og klokkeslæt",
	        date: "ISO-dato",
	        time: "ISO-klokkeslæt",
	        duration: "ISO-varighed",
	        ipv4: "IPv4-område",
	        ipv6: "IPv6-område",
	        cidrv4: "IPv4-spektrum",
	        cidrv6: "IPv6-spektrum",
	        base64: "base64-kodet streng",
	        base64url: "base64url-kodet streng",
	        json_string: "JSON-streng",
	        e164: "E.164-nummer",
	        jwt: "JWT",
	        template_literal: "input",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `Ugyldigt input: forventede ${getTypeName(issue.expected)}, fik ${getTypeName(parsedType(issue.input))}`;
	            case "invalid_value":
	                if (issue.values.length === 1)
	                    return `Ugyldig værdi: forventede ${util.stringifyPrimitive(issue.values[0])}`;
	                return `Ugyldigt valg: forventede en af følgende ${util.joinValues(issue.values, "|")}`;
	            case "too_big": {
	                const adj = issue.inclusive ? "<=" : "<";
	                const sizing = getSizing(issue.origin);
	                const origin = getTypeName(issue.origin);
	                if (sizing)
	                    return `For stor: forventede ${origin ?? "value"} ${sizing.verb} ${adj} ${issue.maximum.toString()} ${sizing.unit ?? "elementer"}`;
	                return `For stor: forventede ${origin ?? "value"} havde ${adj} ${issue.maximum.toString()}`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? ">=" : ">";
	                const sizing = getSizing(issue.origin);
	                const origin = getTypeName(issue.origin);
	                if (sizing) {
	                    return `For lille: forventede ${origin} ${sizing.verb} ${adj} ${issue.minimum.toString()} ${sizing.unit}`;
	                }
	                return `For lille: forventede ${origin} havde ${adj} ${issue.minimum.toString()}`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with")
	                    return `Ugyldig streng: skal starte med "${_issue.prefix}"`;
	                if (_issue.format === "ends_with")
	                    return `Ugyldig streng: skal ende med "${_issue.suffix}"`;
	                if (_issue.format === "includes")
	                    return `Ugyldig streng: skal indeholde "${_issue.includes}"`;
	                if (_issue.format === "regex")
	                    return `Ugyldig streng: skal matche mønsteret ${_issue.pattern}`;
	                return `Ugyldig ${Nouns[_issue.format] ?? issue.format}`;
	            }
	            case "not_multiple_of":
	                return `Ugyldigt tal: skal være deleligt med ${issue.divisor}`;
	            case "unrecognized_keys":
	                return `${issue.keys.length > 1 ? "Ukendte nøgler" : "Ukendt nøgle"}: ${util.joinValues(issue.keys, ", ")}`;
	            case "invalid_key":
	                return `Ugyldig nøgle i ${issue.origin}`;
	            case "invalid_union":
	                return "Ugyldigt input: matcher ingen af de tilladte typer";
	            case "invalid_element":
	                return `Ugyldig værdi i ${issue.origin}`;
	            default:
	                return `Ugyldigt input`;
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	}
	module.exports = exports.default; 
} (da, da.exports));

var daExports = da.exports;

var de = {exports: {}};

(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	const util = __importStar(util$3);
	const error = () => {
	    const Sizable = {
	        string: { unit: "Zeichen", verb: "zu haben" },
	        file: { unit: "Bytes", verb: "zu haben" },
	        array: { unit: "Elemente", verb: "zu haben" },
	        set: { unit: "Elemente", verb: "zu haben" },
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    const parsedType = (data) => {
	        const t = typeof data;
	        switch (t) {
	            case "number": {
	                return Number.isNaN(data) ? "NaN" : "Zahl";
	            }
	            case "object": {
	                if (Array.isArray(data)) {
	                    return "Array";
	                }
	                if (data === null) {
	                    return "null";
	                }
	                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
	                    return data.constructor.name;
	                }
	            }
	        }
	        return t;
	    };
	    const Nouns = {
	        regex: "Eingabe",
	        email: "E-Mail-Adresse",
	        url: "URL",
	        emoji: "Emoji",
	        uuid: "UUID",
	        uuidv4: "UUIDv4",
	        uuidv6: "UUIDv6",
	        nanoid: "nanoid",
	        guid: "GUID",
	        cuid: "cuid",
	        cuid2: "cuid2",
	        ulid: "ULID",
	        xid: "XID",
	        ksuid: "KSUID",
	        datetime: "ISO-Datum und -Uhrzeit",
	        date: "ISO-Datum",
	        time: "ISO-Uhrzeit",
	        duration: "ISO-Dauer",
	        ipv4: "IPv4-Adresse",
	        ipv6: "IPv6-Adresse",
	        cidrv4: "IPv4-Bereich",
	        cidrv6: "IPv6-Bereich",
	        base64: "Base64-codierter String",
	        base64url: "Base64-URL-codierter String",
	        json_string: "JSON-String",
	        e164: "E.164-Nummer",
	        jwt: "JWT",
	        template_literal: "Eingabe",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `Ungültige Eingabe: erwartet ${issue.expected}, erhalten ${parsedType(issue.input)}`;
	            case "invalid_value":
	                if (issue.values.length === 1)
	                    return `Ungültige Eingabe: erwartet ${util.stringifyPrimitive(issue.values[0])}`;
	                return `Ungültige Option: erwartet eine von ${util.joinValues(issue.values, "|")}`;
	            case "too_big": {
	                const adj = issue.inclusive ? "<=" : "<";
	                const sizing = getSizing(issue.origin);
	                if (sizing)
	                    return `Zu groß: erwartet, dass ${issue.origin ?? "Wert"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "Elemente"} hat`;
	                return `Zu groß: erwartet, dass ${issue.origin ?? "Wert"} ${adj}${issue.maximum.toString()} ist`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? ">=" : ">";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    return `Zu klein: erwartet, dass ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit} hat`;
	                }
	                return `Zu klein: erwartet, dass ${issue.origin} ${adj}${issue.minimum.toString()} ist`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with")
	                    return `Ungültiger String: muss mit "${_issue.prefix}" beginnen`;
	                if (_issue.format === "ends_with")
	                    return `Ungültiger String: muss mit "${_issue.suffix}" enden`;
	                if (_issue.format === "includes")
	                    return `Ungültiger String: muss "${_issue.includes}" enthalten`;
	                if (_issue.format === "regex")
	                    return `Ungültiger String: muss dem Muster ${_issue.pattern} entsprechen`;
	                return `Ungültig: ${Nouns[_issue.format] ?? issue.format}`;
	            }
	            case "not_multiple_of":
	                return `Ungültige Zahl: muss ein Vielfaches von ${issue.divisor} sein`;
	            case "unrecognized_keys":
	                return `${issue.keys.length > 1 ? "Unbekannte Schlüssel" : "Unbekannter Schlüssel"}: ${util.joinValues(issue.keys, ", ")}`;
	            case "invalid_key":
	                return `Ungültiger Schlüssel in ${issue.origin}`;
	            case "invalid_union":
	                return "Ungültige Eingabe";
	            case "invalid_element":
	                return `Ungültiger Wert in ${issue.origin}`;
	            default:
	                return `Ungültige Eingabe`;
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	}
	module.exports = exports.default; 
} (de, de.exports));

var deExports = de.exports;

var en = {};

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parsedType = void 0;
	exports.default = default_1;
	const util = __importStar(util$3);
	const parsedType = (data) => {
	    const t = typeof data;
	    switch (t) {
	        case "number": {
	            return Number.isNaN(data) ? "NaN" : "number";
	        }
	        case "object": {
	            if (Array.isArray(data)) {
	                return "array";
	            }
	            if (data === null) {
	                return "null";
	            }
	            if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
	                return data.constructor.name;
	            }
	        }
	    }
	    return t;
	};
	exports.parsedType = parsedType;
	const error = () => {
	    const Sizable = {
	        string: { unit: "characters", verb: "to have" },
	        file: { unit: "bytes", verb: "to have" },
	        array: { unit: "items", verb: "to have" },
	        set: { unit: "items", verb: "to have" },
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    const Nouns = {
	        regex: "input",
	        email: "email address",
	        url: "URL",
	        emoji: "emoji",
	        uuid: "UUID",
	        uuidv4: "UUIDv4",
	        uuidv6: "UUIDv6",
	        nanoid: "nanoid",
	        guid: "GUID",
	        cuid: "cuid",
	        cuid2: "cuid2",
	        ulid: "ULID",
	        xid: "XID",
	        ksuid: "KSUID",
	        datetime: "ISO datetime",
	        date: "ISO date",
	        time: "ISO time",
	        duration: "ISO duration",
	        ipv4: "IPv4 address",
	        ipv6: "IPv6 address",
	        cidrv4: "IPv4 range",
	        cidrv6: "IPv6 range",
	        base64: "base64-encoded string",
	        base64url: "base64url-encoded string",
	        json_string: "JSON string",
	        e164: "E.164 number",
	        jwt: "JWT",
	        template_literal: "input",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `Invalid input: expected ${issue.expected}, received ${(0, exports.parsedType)(issue.input)}`;
	            case "invalid_value":
	                if (issue.values.length === 1)
	                    return `Invalid input: expected ${util.stringifyPrimitive(issue.values[0])}`;
	                return `Invalid option: expected one of ${util.joinValues(issue.values, "|")}`;
	            case "too_big": {
	                const adj = issue.inclusive ? "<=" : "<";
	                const sizing = getSizing(issue.origin);
	                if (sizing)
	                    return `Too big: expected ${issue.origin ?? "value"} to have ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elements"}`;
	                return `Too big: expected ${issue.origin ?? "value"} to be ${adj}${issue.maximum.toString()}`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? ">=" : ">";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    return `Too small: expected ${issue.origin} to have ${adj}${issue.minimum.toString()} ${sizing.unit}`;
	                }
	                return `Too small: expected ${issue.origin} to be ${adj}${issue.minimum.toString()}`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with") {
	                    return `Invalid string: must start with "${_issue.prefix}"`;
	                }
	                if (_issue.format === "ends_with")
	                    return `Invalid string: must end with "${_issue.suffix}"`;
	                if (_issue.format === "includes")
	                    return `Invalid string: must include "${_issue.includes}"`;
	                if (_issue.format === "regex")
	                    return `Invalid string: must match pattern ${_issue.pattern}`;
	                return `Invalid ${Nouns[_issue.format] ?? issue.format}`;
	            }
	            case "not_multiple_of":
	                return `Invalid number: must be a multiple of ${issue.divisor}`;
	            case "unrecognized_keys":
	                return `Unrecognized key${issue.keys.length > 1 ? "s" : ""}: ${util.joinValues(issue.keys, ", ")}`;
	            case "invalid_key":
	                return `Invalid key in ${issue.origin}`;
	            case "invalid_union":
	                return "Invalid input";
	            case "invalid_element":
	                return `Invalid value in ${issue.origin}`;
	            default:
	                return `Invalid input`;
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	} 
} (en));

var eo = {};

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parsedType = void 0;
	exports.default = default_1;
	const util = __importStar(util$3);
	const parsedType = (data) => {
	    const t = typeof data;
	    switch (t) {
	        case "number": {
	            return Number.isNaN(data) ? "NaN" : "nombro";
	        }
	        case "object": {
	            if (Array.isArray(data)) {
	                return "tabelo";
	            }
	            if (data === null) {
	                return "senvalora";
	            }
	            if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
	                return data.constructor.name;
	            }
	        }
	    }
	    return t;
	};
	exports.parsedType = parsedType;
	const error = () => {
	    const Sizable = {
	        string: { unit: "karaktrojn", verb: "havi" },
	        file: { unit: "bajtojn", verb: "havi" },
	        array: { unit: "elementojn", verb: "havi" },
	        set: { unit: "elementojn", verb: "havi" },
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    const Nouns = {
	        regex: "enigo",
	        email: "retadreso",
	        url: "URL",
	        emoji: "emoĝio",
	        uuid: "UUID",
	        uuidv4: "UUIDv4",
	        uuidv6: "UUIDv6",
	        nanoid: "nanoid",
	        guid: "GUID",
	        cuid: "cuid",
	        cuid2: "cuid2",
	        ulid: "ULID",
	        xid: "XID",
	        ksuid: "KSUID",
	        datetime: "ISO-datotempo",
	        date: "ISO-dato",
	        time: "ISO-tempo",
	        duration: "ISO-daŭro",
	        ipv4: "IPv4-adreso",
	        ipv6: "IPv6-adreso",
	        cidrv4: "IPv4-rango",
	        cidrv6: "IPv6-rango",
	        base64: "64-ume kodita karaktraro",
	        base64url: "URL-64-ume kodita karaktraro",
	        json_string: "JSON-karaktraro",
	        e164: "E.164-nombro",
	        jwt: "JWT",
	        template_literal: "enigo",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `Nevalida enigo: atendiĝis ${issue.expected}, riceviĝis ${(0, exports.parsedType)(issue.input)}`;
	            case "invalid_value":
	                if (issue.values.length === 1)
	                    return `Nevalida enigo: atendiĝis ${util.stringifyPrimitive(issue.values[0])}`;
	                return `Nevalida opcio: atendiĝis unu el ${util.joinValues(issue.values, "|")}`;
	            case "too_big": {
	                const adj = issue.inclusive ? "<=" : "<";
	                const sizing = getSizing(issue.origin);
	                if (sizing)
	                    return `Tro granda: atendiĝis ke ${issue.origin ?? "valoro"} havu ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementojn"}`;
	                return `Tro granda: atendiĝis ke ${issue.origin ?? "valoro"} havu ${adj}${issue.maximum.toString()}`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? ">=" : ">";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    return `Tro malgranda: atendiĝis ke ${issue.origin} havu ${adj}${issue.minimum.toString()} ${sizing.unit}`;
	                }
	                return `Tro malgranda: atendiĝis ke ${issue.origin} estu ${adj}${issue.minimum.toString()}`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with")
	                    return `Nevalida karaktraro: devas komenciĝi per "${_issue.prefix}"`;
	                if (_issue.format === "ends_with")
	                    return `Nevalida karaktraro: devas finiĝi per "${_issue.suffix}"`;
	                if (_issue.format === "includes")
	                    return `Nevalida karaktraro: devas inkluzivi "${_issue.includes}"`;
	                if (_issue.format === "regex")
	                    return `Nevalida karaktraro: devas kongrui kun la modelo ${_issue.pattern}`;
	                return `Nevalida ${Nouns[_issue.format] ?? issue.format}`;
	            }
	            case "not_multiple_of":
	                return `Nevalida nombro: devas esti oblo de ${issue.divisor}`;
	            case "unrecognized_keys":
	                return `Nekonata${issue.keys.length > 1 ? "j" : ""} ŝlosilo${issue.keys.length > 1 ? "j" : ""}: ${util.joinValues(issue.keys, ", ")}`;
	            case "invalid_key":
	                return `Nevalida ŝlosilo en ${issue.origin}`;
	            case "invalid_union":
	                return "Nevalida enigo";
	            case "invalid_element":
	                return `Nevalida valoro en ${issue.origin}`;
	            default:
	                return `Nevalida enigo`;
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	} 
} (eo));

var es = {exports: {}};

(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	const util = __importStar(util$3);
	const error = () => {
	    const Sizable = {
	        string: { unit: "caracteres", verb: "tener" },
	        file: { unit: "bytes", verb: "tener" },
	        array: { unit: "elementos", verb: "tener" },
	        set: { unit: "elementos", verb: "tener" },
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    const parsedType = (data) => {
	        const t = typeof data;
	        switch (t) {
	            case "number": {
	                return Number.isNaN(data) ? "NaN" : "número";
	            }
	            case "object": {
	                if (Array.isArray(data)) {
	                    return "arreglo";
	                }
	                if (data === null) {
	                    return "nulo";
	                }
	                if (Object.getPrototypeOf(data) !== Object.prototype) {
	                    return data.constructor.name;
	                }
	            }
	        }
	        return t;
	    };
	    const Nouns = {
	        regex: "entrada",
	        email: "dirección de correo electrónico",
	        url: "URL",
	        emoji: "emoji",
	        uuid: "UUID",
	        uuidv4: "UUIDv4",
	        uuidv6: "UUIDv6",
	        nanoid: "nanoid",
	        guid: "GUID",
	        cuid: "cuid",
	        cuid2: "cuid2",
	        ulid: "ULID",
	        xid: "XID",
	        ksuid: "KSUID",
	        datetime: "fecha y hora ISO",
	        date: "fecha ISO",
	        time: "hora ISO",
	        duration: "duración ISO",
	        ipv4: "dirección IPv4",
	        ipv6: "dirección IPv6",
	        cidrv4: "rango IPv4",
	        cidrv6: "rango IPv6",
	        base64: "cadena codificada en base64",
	        base64url: "URL codificada en base64",
	        json_string: "cadena JSON",
	        e164: "número E.164",
	        jwt: "JWT",
	        template_literal: "entrada",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `Entrada inválida: se esperaba ${issue.expected}, recibido ${parsedType(issue.input)}`;
	            // return `Entrada inválida: se esperaba ${issue.expected}, recibido ${util.getParsedType(issue.input)}`;
	            case "invalid_value":
	                if (issue.values.length === 1)
	                    return `Entrada inválida: se esperaba ${util.stringifyPrimitive(issue.values[0])}`;
	                return `Opción inválida: se esperaba una de ${util.joinValues(issue.values, "|")}`;
	            case "too_big": {
	                const adj = issue.inclusive ? "<=" : "<";
	                const sizing = getSizing(issue.origin);
	                if (sizing)
	                    return `Demasiado grande: se esperaba que ${issue.origin ?? "valor"} tuviera ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementos"}`;
	                return `Demasiado grande: se esperaba que ${issue.origin ?? "valor"} fuera ${adj}${issue.maximum.toString()}`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? ">=" : ">";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    return `Demasiado pequeño: se esperaba que ${issue.origin} tuviera ${adj}${issue.minimum.toString()} ${sizing.unit}`;
	                }
	                return `Demasiado pequeño: se esperaba que ${issue.origin} fuera ${adj}${issue.minimum.toString()}`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with")
	                    return `Cadena inválida: debe comenzar con "${_issue.prefix}"`;
	                if (_issue.format === "ends_with")
	                    return `Cadena inválida: debe terminar en "${_issue.suffix}"`;
	                if (_issue.format === "includes")
	                    return `Cadena inválida: debe incluir "${_issue.includes}"`;
	                if (_issue.format === "regex")
	                    return `Cadena inválida: debe coincidir con el patrón ${_issue.pattern}`;
	                return `Inválido ${Nouns[_issue.format] ?? issue.format}`;
	            }
	            case "not_multiple_of":
	                return `Número inválido: debe ser múltiplo de ${issue.divisor}`;
	            case "unrecognized_keys":
	                return `Llave${issue.keys.length > 1 ? "s" : ""} desconocida${issue.keys.length > 1 ? "s" : ""}: ${util.joinValues(issue.keys, ", ")}`;
	            case "invalid_key":
	                return `Llave inválida en ${issue.origin}`;
	            case "invalid_union":
	                return "Entrada inválida";
	            case "invalid_element":
	                return `Valor inválido en ${issue.origin}`;
	            default:
	                return `Entrada inválida`;
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	}
	module.exports = exports.default; 
} (es, es.exports));

var esExports = es.exports;

var fa = {exports: {}};

(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	const util = __importStar(util$3);
	const error = () => {
	    const Sizable = {
	        string: { unit: "کاراکتر", verb: "داشته باشد" },
	        file: { unit: "بایت", verb: "داشته باشد" },
	        array: { unit: "آیتم", verb: "داشته باشد" },
	        set: { unit: "آیتم", verb: "داشته باشد" },
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    const parsedType = (data) => {
	        const t = typeof data;
	        switch (t) {
	            case "number": {
	                return Number.isNaN(data) ? "NaN" : "عدد";
	            }
	            case "object": {
	                if (Array.isArray(data)) {
	                    return "آرایه";
	                }
	                if (data === null) {
	                    return "null";
	                }
	                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
	                    return data.constructor.name;
	                }
	            }
	        }
	        return t;
	    };
	    const Nouns = {
	        regex: "ورودی",
	        email: "آدرس ایمیل",
	        url: "URL",
	        emoji: "ایموجی",
	        uuid: "UUID",
	        uuidv4: "UUIDv4",
	        uuidv6: "UUIDv6",
	        nanoid: "nanoid",
	        guid: "GUID",
	        cuid: "cuid",
	        cuid2: "cuid2",
	        ulid: "ULID",
	        xid: "XID",
	        ksuid: "KSUID",
	        datetime: "تاریخ و زمان ایزو",
	        date: "تاریخ ایزو",
	        time: "زمان ایزو",
	        duration: "مدت زمان ایزو",
	        ipv4: "IPv4 آدرس",
	        ipv6: "IPv6 آدرس",
	        cidrv4: "IPv4 دامنه",
	        cidrv6: "IPv6 دامنه",
	        base64: "base64-encoded رشته",
	        base64url: "base64url-encoded رشته",
	        json_string: "JSON رشته",
	        e164: "E.164 عدد",
	        jwt: "JWT",
	        template_literal: "ورودی",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `ورودی نامعتبر: می‌بایست ${issue.expected} می‌بود، ${parsedType(issue.input)} دریافت شد`;
	            case "invalid_value":
	                if (issue.values.length === 1) {
	                    return `ورودی نامعتبر: می‌بایست ${util.stringifyPrimitive(issue.values[0])} می‌بود`;
	                }
	                return `گزینه نامعتبر: می‌بایست یکی از ${util.joinValues(issue.values, "|")} می‌بود`;
	            case "too_big": {
	                const adj = issue.inclusive ? "<=" : "<";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    return `خیلی بزرگ: ${issue.origin ?? "مقدار"} باید ${adj}${issue.maximum.toString()} ${sizing.unit ?? "عنصر"} باشد`;
	                }
	                return `خیلی بزرگ: ${issue.origin ?? "مقدار"} باید ${adj}${issue.maximum.toString()} باشد`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? ">=" : ">";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    return `خیلی کوچک: ${issue.origin} باید ${adj}${issue.minimum.toString()} ${sizing.unit} باشد`;
	                }
	                return `خیلی کوچک: ${issue.origin} باید ${adj}${issue.minimum.toString()} باشد`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with") {
	                    return `رشته نامعتبر: باید با "${_issue.prefix}" شروع شود`;
	                }
	                if (_issue.format === "ends_with") {
	                    return `رشته نامعتبر: باید با "${_issue.suffix}" تمام شود`;
	                }
	                if (_issue.format === "includes") {
	                    return `رشته نامعتبر: باید شامل "${_issue.includes}" باشد`;
	                }
	                if (_issue.format === "regex") {
	                    return `رشته نامعتبر: باید با الگوی ${_issue.pattern} مطابقت داشته باشد`;
	                }
	                return `${Nouns[_issue.format] ?? issue.format} نامعتبر`;
	            }
	            case "not_multiple_of":
	                return `عدد نامعتبر: باید مضرب ${issue.divisor} باشد`;
	            case "unrecognized_keys":
	                return `کلید${issue.keys.length > 1 ? "های" : ""} ناشناس: ${util.joinValues(issue.keys, ", ")}`;
	            case "invalid_key":
	                return `کلید ناشناس در ${issue.origin}`;
	            case "invalid_union":
	                return `ورودی نامعتبر`;
	            case "invalid_element":
	                return `مقدار نامعتبر در ${issue.origin}`;
	            default:
	                return `ورودی نامعتبر`;
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	}
	module.exports = exports.default; 
} (fa, fa.exports));

var faExports = fa.exports;

var fi = {exports: {}};

(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	const util = __importStar(util$3);
	const error = () => {
	    const Sizable = {
	        string: { unit: "merkkiä", subject: "merkkijonon" },
	        file: { unit: "tavua", subject: "tiedoston" },
	        array: { unit: "alkiota", subject: "listan" },
	        set: { unit: "alkiota", subject: "joukon" },
	        number: { unit: "", subject: "luvun" },
	        bigint: { unit: "", subject: "suuren kokonaisluvun" },
	        int: { unit: "", subject: "kokonaisluvun" },
	        date: { unit: "", subject: "päivämäärän" },
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    const parsedType = (data) => {
	        const t = typeof data;
	        switch (t) {
	            case "number": {
	                return Number.isNaN(data) ? "NaN" : "number";
	            }
	            case "object": {
	                if (Array.isArray(data)) {
	                    return "array";
	                }
	                if (data === null) {
	                    return "null";
	                }
	                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
	                    return data.constructor.name;
	                }
	            }
	        }
	        return t;
	    };
	    const Nouns = {
	        regex: "säännöllinen lauseke",
	        email: "sähköpostiosoite",
	        url: "URL-osoite",
	        emoji: "emoji",
	        uuid: "UUID",
	        uuidv4: "UUIDv4",
	        uuidv6: "UUIDv6",
	        nanoid: "nanoid",
	        guid: "GUID",
	        cuid: "cuid",
	        cuid2: "cuid2",
	        ulid: "ULID",
	        xid: "XID",
	        ksuid: "KSUID",
	        datetime: "ISO-aikaleima",
	        date: "ISO-päivämäärä",
	        time: "ISO-aika",
	        duration: "ISO-kesto",
	        ipv4: "IPv4-osoite",
	        ipv6: "IPv6-osoite",
	        cidrv4: "IPv4-alue",
	        cidrv6: "IPv6-alue",
	        base64: "base64-koodattu merkkijono",
	        base64url: "base64url-koodattu merkkijono",
	        json_string: "JSON-merkkijono",
	        e164: "E.164-luku",
	        jwt: "JWT",
	        template_literal: "templaattimerkkijono",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `Virheellinen tyyppi: odotettiin ${issue.expected}, oli ${parsedType(issue.input)}`;
	            case "invalid_value":
	                if (issue.values.length === 1)
	                    return `Virheellinen syöte: täytyy olla ${util.stringifyPrimitive(issue.values[0])}`;
	                return `Virheellinen valinta: täytyy olla yksi seuraavista: ${util.joinValues(issue.values, "|")}`;
	            case "too_big": {
	                const adj = issue.inclusive ? "<=" : "<";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    return `Liian suuri: ${sizing.subject} täytyy olla ${adj}${issue.maximum.toString()} ${sizing.unit}`.trim();
	                }
	                return `Liian suuri: arvon täytyy olla ${adj}${issue.maximum.toString()}`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? ">=" : ">";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    return `Liian pieni: ${sizing.subject} täytyy olla ${adj}${issue.minimum.toString()} ${sizing.unit}`.trim();
	                }
	                return `Liian pieni: arvon täytyy olla ${adj}${issue.minimum.toString()}`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with")
	                    return `Virheellinen syöte: täytyy alkaa "${_issue.prefix}"`;
	                if (_issue.format === "ends_with")
	                    return `Virheellinen syöte: täytyy loppua "${_issue.suffix}"`;
	                if (_issue.format === "includes")
	                    return `Virheellinen syöte: täytyy sisältää "${_issue.includes}"`;
	                if (_issue.format === "regex") {
	                    return `Virheellinen syöte: täytyy vastata säännöllistä lauseketta ${_issue.pattern}`;
	                }
	                return `Virheellinen ${Nouns[_issue.format] ?? issue.format}`;
	            }
	            case "not_multiple_of":
	                return `Virheellinen luku: täytyy olla luvun ${issue.divisor} monikerta`;
	            case "unrecognized_keys":
	                return `${issue.keys.length > 1 ? "Tuntemattomat avaimet" : "Tuntematon avain"}: ${util.joinValues(issue.keys, ", ")}`;
	            case "invalid_key":
	                return "Virheellinen avain tietueessa";
	            case "invalid_union":
	                return "Virheellinen unioni";
	            case "invalid_element":
	                return "Virheellinen arvo joukossa";
	            default:
	                return `Virheellinen syöte`;
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	}
	module.exports = exports.default; 
} (fi, fi.exports));

var fiExports = fi.exports;

var fr = {exports: {}};

(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	const util = __importStar(util$3);
	const error = () => {
	    const Sizable = {
	        string: { unit: "caractères", verb: "avoir" },
	        file: { unit: "octets", verb: "avoir" },
	        array: { unit: "éléments", verb: "avoir" },
	        set: { unit: "éléments", verb: "avoir" },
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    const parsedType = (data) => {
	        const t = typeof data;
	        switch (t) {
	            case "number": {
	                return Number.isNaN(data) ? "NaN" : "nombre";
	            }
	            case "object": {
	                if (Array.isArray(data)) {
	                    return "tableau";
	                }
	                if (data === null) {
	                    return "null";
	                }
	                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
	                    return data.constructor.name;
	                }
	            }
	        }
	        return t;
	    };
	    const Nouns = {
	        regex: "entrée",
	        email: "adresse e-mail",
	        url: "URL",
	        emoji: "emoji",
	        uuid: "UUID",
	        uuidv4: "UUIDv4",
	        uuidv6: "UUIDv6",
	        nanoid: "nanoid",
	        guid: "GUID",
	        cuid: "cuid",
	        cuid2: "cuid2",
	        ulid: "ULID",
	        xid: "XID",
	        ksuid: "KSUID",
	        datetime: "date et heure ISO",
	        date: "date ISO",
	        time: "heure ISO",
	        duration: "durée ISO",
	        ipv4: "adresse IPv4",
	        ipv6: "adresse IPv6",
	        cidrv4: "plage IPv4",
	        cidrv6: "plage IPv6",
	        base64: "chaîne encodée en base64",
	        base64url: "chaîne encodée en base64url",
	        json_string: "chaîne JSON",
	        e164: "numéro E.164",
	        jwt: "JWT",
	        template_literal: "entrée",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `Entrée invalide : ${issue.expected} attendu, ${parsedType(issue.input)} reçu`;
	            case "invalid_value":
	                if (issue.values.length === 1)
	                    return `Entrée invalide : ${util.stringifyPrimitive(issue.values[0])} attendu`;
	                return `Option invalide : une valeur parmi ${util.joinValues(issue.values, "|")} attendue`;
	            case "too_big": {
	                const adj = issue.inclusive ? "<=" : "<";
	                const sizing = getSizing(issue.origin);
	                if (sizing)
	                    return `Trop grand : ${issue.origin ?? "valeur"} doit ${sizing.verb} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "élément(s)"}`;
	                return `Trop grand : ${issue.origin ?? "valeur"} doit être ${adj}${issue.maximum.toString()}`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? ">=" : ">";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    return `Trop petit : ${issue.origin} doit ${sizing.verb} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
	                }
	                return `Trop petit : ${issue.origin} doit être ${adj}${issue.minimum.toString()}`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with")
	                    return `Chaîne invalide : doit commencer par "${_issue.prefix}"`;
	                if (_issue.format === "ends_with")
	                    return `Chaîne invalide : doit se terminer par "${_issue.suffix}"`;
	                if (_issue.format === "includes")
	                    return `Chaîne invalide : doit inclure "${_issue.includes}"`;
	                if (_issue.format === "regex")
	                    return `Chaîne invalide : doit correspondre au modèle ${_issue.pattern}`;
	                return `${Nouns[_issue.format] ?? issue.format} invalide`;
	            }
	            case "not_multiple_of":
	                return `Nombre invalide : doit être un multiple de ${issue.divisor}`;
	            case "unrecognized_keys":
	                return `Clé${issue.keys.length > 1 ? "s" : ""} non reconnue${issue.keys.length > 1 ? "s" : ""} : ${util.joinValues(issue.keys, ", ")}`;
	            case "invalid_key":
	                return `Clé invalide dans ${issue.origin}`;
	            case "invalid_union":
	                return "Entrée invalide";
	            case "invalid_element":
	                return `Valeur invalide dans ${issue.origin}`;
	            default:
	                return `Entrée invalide`;
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	}
	module.exports = exports.default; 
} (fr, fr.exports));

var frExports = fr.exports;

var frCA = {exports: {}};

(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	const util = __importStar(util$3);
	const error = () => {
	    const Sizable = {
	        string: { unit: "caractères", verb: "avoir" },
	        file: { unit: "octets", verb: "avoir" },
	        array: { unit: "éléments", verb: "avoir" },
	        set: { unit: "éléments", verb: "avoir" },
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    const parsedType = (data) => {
	        const t = typeof data;
	        switch (t) {
	            case "number": {
	                return Number.isNaN(data) ? "NaN" : "number";
	            }
	            case "object": {
	                if (Array.isArray(data)) {
	                    return "array";
	                }
	                if (data === null) {
	                    return "null";
	                }
	                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
	                    return data.constructor.name;
	                }
	            }
	        }
	        return t;
	    };
	    const Nouns = {
	        regex: "entrée",
	        email: "adresse courriel",
	        url: "URL",
	        emoji: "emoji",
	        uuid: "UUID",
	        uuidv4: "UUIDv4",
	        uuidv6: "UUIDv6",
	        nanoid: "nanoid",
	        guid: "GUID",
	        cuid: "cuid",
	        cuid2: "cuid2",
	        ulid: "ULID",
	        xid: "XID",
	        ksuid: "KSUID",
	        datetime: "date-heure ISO",
	        date: "date ISO",
	        time: "heure ISO",
	        duration: "durée ISO",
	        ipv4: "adresse IPv4",
	        ipv6: "adresse IPv6",
	        cidrv4: "plage IPv4",
	        cidrv6: "plage IPv6",
	        base64: "chaîne encodée en base64",
	        base64url: "chaîne encodée en base64url",
	        json_string: "chaîne JSON",
	        e164: "numéro E.164",
	        jwt: "JWT",
	        template_literal: "entrée",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `Entrée invalide : attendu ${issue.expected}, reçu ${parsedType(issue.input)}`;
	            case "invalid_value":
	                if (issue.values.length === 1)
	                    return `Entrée invalide : attendu ${util.stringifyPrimitive(issue.values[0])}`;
	                return `Option invalide : attendu l'une des valeurs suivantes ${util.joinValues(issue.values, "|")}`;
	            case "too_big": {
	                const adj = issue.inclusive ? "≤" : "<";
	                const sizing = getSizing(issue.origin);
	                if (sizing)
	                    return `Trop grand : attendu que ${issue.origin ?? "la valeur"} ait ${adj}${issue.maximum.toString()} ${sizing.unit}`;
	                return `Trop grand : attendu que ${issue.origin ?? "la valeur"} soit ${adj}${issue.maximum.toString()}`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? "≥" : ">";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    return `Trop petit : attendu que ${issue.origin} ait ${adj}${issue.minimum.toString()} ${sizing.unit}`;
	                }
	                return `Trop petit : attendu que ${issue.origin} soit ${adj}${issue.minimum.toString()}`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with") {
	                    return `Chaîne invalide : doit commencer par "${_issue.prefix}"`;
	                }
	                if (_issue.format === "ends_with")
	                    return `Chaîne invalide : doit se terminer par "${_issue.suffix}"`;
	                if (_issue.format === "includes")
	                    return `Chaîne invalide : doit inclure "${_issue.includes}"`;
	                if (_issue.format === "regex")
	                    return `Chaîne invalide : doit correspondre au motif ${_issue.pattern}`;
	                return `${Nouns[_issue.format] ?? issue.format} invalide`;
	            }
	            case "not_multiple_of":
	                return `Nombre invalide : doit être un multiple de ${issue.divisor}`;
	            case "unrecognized_keys":
	                return `Clé${issue.keys.length > 1 ? "s" : ""} non reconnue${issue.keys.length > 1 ? "s" : ""} : ${util.joinValues(issue.keys, ", ")}`;
	            case "invalid_key":
	                return `Clé invalide dans ${issue.origin}`;
	            case "invalid_union":
	                return "Entrée invalide";
	            case "invalid_element":
	                return `Valeur invalide dans ${issue.origin}`;
	            default:
	                return `Entrée invalide`;
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	}
	module.exports = exports.default; 
} (frCA, frCA.exports));

var frCAExports = frCA.exports;

var he = {exports: {}};

(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	const util = __importStar(util$3);
	const error = () => {
	    const Sizable = {
	        string: { unit: "אותיות", verb: "לכלול" },
	        file: { unit: "בייטים", verb: "לכלול" },
	        array: { unit: "פריטים", verb: "לכלול" },
	        set: { unit: "פריטים", verb: "לכלול" },
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    const parsedType = (data) => {
	        const t = typeof data;
	        switch (t) {
	            case "number": {
	                return Number.isNaN(data) ? "NaN" : "number";
	            }
	            case "object": {
	                if (Array.isArray(data)) {
	                    return "array";
	                }
	                if (data === null) {
	                    return "null";
	                }
	                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
	                    return data.constructor.name;
	                }
	            }
	        }
	        return t;
	    };
	    const Nouns = {
	        regex: "קלט",
	        email: "כתובת אימייל",
	        url: "כתובת רשת",
	        emoji: "אימוג'י",
	        uuid: "UUID",
	        uuidv4: "UUIDv4",
	        uuidv6: "UUIDv6",
	        nanoid: "nanoid",
	        guid: "GUID",
	        cuid: "cuid",
	        cuid2: "cuid2",
	        ulid: "ULID",
	        xid: "XID",
	        ksuid: "KSUID",
	        datetime: "תאריך וזמן ISO",
	        date: "תאריך ISO",
	        time: "זמן ISO",
	        duration: "משך זמן ISO",
	        ipv4: "כתובת IPv4",
	        ipv6: "כתובת IPv6",
	        cidrv4: "טווח IPv4",
	        cidrv6: "טווח IPv6",
	        base64: "מחרוזת בבסיס 64",
	        base64url: "מחרוזת בבסיס 64 לכתובות רשת",
	        json_string: "מחרוזת JSON",
	        e164: "מספר E.164",
	        jwt: "JWT",
	        template_literal: "קלט",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `קלט לא תקין: צריך ${issue.expected}, התקבל ${parsedType(issue.input)}`;
	            // return `Invalid input: expected ${issue.expected}, received ${util.getParsedType(issue.input)}`;
	            case "invalid_value":
	                if (issue.values.length === 1)
	                    return `קלט לא תקין: צריך ${util.stringifyPrimitive(issue.values[0])}`;
	                return `קלט לא תקין: צריך אחת מהאפשרויות  ${util.joinValues(issue.values, "|")}`;
	            case "too_big": {
	                const adj = issue.inclusive ? "<=" : "<";
	                const sizing = getSizing(issue.origin);
	                if (sizing)
	                    return `גדול מדי: ${issue.origin ?? "value"} צריך להיות ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elements"}`;
	                return `גדול מדי: ${issue.origin ?? "value"} צריך להיות ${adj}${issue.maximum.toString()}`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? ">=" : ">";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    return `קטן מדי: ${issue.origin} צריך להיות ${adj}${issue.minimum.toString()} ${sizing.unit}`;
	                }
	                return `קטן מדי: ${issue.origin} צריך להיות ${adj}${issue.minimum.toString()}`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with")
	                    return `מחרוזת לא תקינה: חייבת להתחיל ב"${_issue.prefix}"`;
	                if (_issue.format === "ends_with")
	                    return `מחרוזת לא תקינה: חייבת להסתיים ב "${_issue.suffix}"`;
	                if (_issue.format === "includes")
	                    return `מחרוזת לא תקינה: חייבת לכלול "${_issue.includes}"`;
	                if (_issue.format === "regex")
	                    return `מחרוזת לא תקינה: חייבת להתאים לתבנית ${_issue.pattern}`;
	                return `${Nouns[_issue.format] ?? issue.format} לא תקין`;
	            }
	            case "not_multiple_of":
	                return `מספר לא תקין: חייב להיות מכפלה של ${issue.divisor}`;
	            case "unrecognized_keys":
	                return `מפתח${issue.keys.length > 1 ? "ות" : ""} לא מזוה${issue.keys.length > 1 ? "ים" : "ה"}: ${util.joinValues(issue.keys, ", ")}`;
	            case "invalid_key":
	                return `מפתח לא תקין ב${issue.origin}`;
	            case "invalid_union":
	                return "קלט לא תקין";
	            case "invalid_element":
	                return `ערך לא תקין ב${issue.origin}`;
	            default:
	                return `קלט לא תקין`;
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	}
	module.exports = exports.default; 
} (he, he.exports));

var heExports = he.exports;

var hu = {exports: {}};

(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	const util = __importStar(util$3);
	const error = () => {
	    const Sizable = {
	        string: { unit: "karakter", verb: "legyen" },
	        file: { unit: "byte", verb: "legyen" },
	        array: { unit: "elem", verb: "legyen" },
	        set: { unit: "elem", verb: "legyen" },
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    const parsedType = (data) => {
	        const t = typeof data;
	        switch (t) {
	            case "number": {
	                return Number.isNaN(data) ? "NaN" : "szám";
	            }
	            case "object": {
	                if (Array.isArray(data)) {
	                    return "tömb";
	                }
	                if (data === null) {
	                    return "null";
	                }
	                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
	                    return data.constructor.name;
	                }
	            }
	        }
	        return t;
	    };
	    const Nouns = {
	        regex: "bemenet",
	        email: "email cím",
	        url: "URL",
	        emoji: "emoji",
	        uuid: "UUID",
	        uuidv4: "UUIDv4",
	        uuidv6: "UUIDv6",
	        nanoid: "nanoid",
	        guid: "GUID",
	        cuid: "cuid",
	        cuid2: "cuid2",
	        ulid: "ULID",
	        xid: "XID",
	        ksuid: "KSUID",
	        datetime: "ISO időbélyeg",
	        date: "ISO dátum",
	        time: "ISO idő",
	        duration: "ISO időintervallum",
	        ipv4: "IPv4 cím",
	        ipv6: "IPv6 cím",
	        cidrv4: "IPv4 tartomány",
	        cidrv6: "IPv6 tartomány",
	        base64: "base64-kódolt string",
	        base64url: "base64url-kódolt string",
	        json_string: "JSON string",
	        e164: "E.164 szám",
	        jwt: "JWT",
	        template_literal: "bemenet",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `Érvénytelen bemenet: a várt érték ${issue.expected}, a kapott érték ${parsedType(issue.input)}`;
	            // return `Invalid input: expected ${issue.expected}, received ${util.getParsedType(issue.input)}`;
	            case "invalid_value":
	                if (issue.values.length === 1)
	                    return `Érvénytelen bemenet: a várt érték ${util.stringifyPrimitive(issue.values[0])}`;
	                return `Érvénytelen opció: valamelyik érték várt ${util.joinValues(issue.values, "|")}`;
	            case "too_big": {
	                const adj = issue.inclusive ? "<=" : "<";
	                const sizing = getSizing(issue.origin);
	                if (sizing)
	                    return `Túl nagy: ${issue.origin ?? "érték"} mérete túl nagy ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elem"}`;
	                return `Túl nagy: a bemeneti érték ${issue.origin ?? "érték"} túl nagy: ${adj}${issue.maximum.toString()}`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? ">=" : ">";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    return `Túl kicsi: a bemeneti érték ${issue.origin} mérete túl kicsi ${adj}${issue.minimum.toString()} ${sizing.unit}`;
	                }
	                return `Túl kicsi: a bemeneti érték ${issue.origin} túl kicsi ${adj}${issue.minimum.toString()}`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with")
	                    return `Érvénytelen string: "${_issue.prefix}" értékkel kell kezdődnie`;
	                if (_issue.format === "ends_with")
	                    return `Érvénytelen string: "${_issue.suffix}" értékkel kell végződnie`;
	                if (_issue.format === "includes")
	                    return `Érvénytelen string: "${_issue.includes}" értéket kell tartalmaznia`;
	                if (_issue.format === "regex")
	                    return `Érvénytelen string: ${_issue.pattern} mintának kell megfelelnie`;
	                return `Érvénytelen ${Nouns[_issue.format] ?? issue.format}`;
	            }
	            case "not_multiple_of":
	                return `Érvénytelen szám: ${issue.divisor} többszörösének kell lennie`;
	            case "unrecognized_keys":
	                return `Ismeretlen kulcs${issue.keys.length > 1 ? "s" : ""}: ${util.joinValues(issue.keys, ", ")}`;
	            case "invalid_key":
	                return `Érvénytelen kulcs ${issue.origin}`;
	            case "invalid_union":
	                return "Érvénytelen bemenet";
	            case "invalid_element":
	                return `Érvénytelen érték: ${issue.origin}`;
	            default:
	                return `Érvénytelen bemenet`;
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	}
	module.exports = exports.default; 
} (hu, hu.exports));

var huExports = hu.exports;

var id = {exports: {}};

(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	const util = __importStar(util$3);
	const error = () => {
	    const Sizable = {
	        string: { unit: "karakter", verb: "memiliki" },
	        file: { unit: "byte", verb: "memiliki" },
	        array: { unit: "item", verb: "memiliki" },
	        set: { unit: "item", verb: "memiliki" },
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    const parsedType = (data) => {
	        const t = typeof data;
	        switch (t) {
	            case "number": {
	                return Number.isNaN(data) ? "NaN" : "number";
	            }
	            case "object": {
	                if (Array.isArray(data)) {
	                    return "array";
	                }
	                if (data === null) {
	                    return "null";
	                }
	                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
	                    return data.constructor.name;
	                }
	            }
	        }
	        return t;
	    };
	    const Nouns = {
	        regex: "input",
	        email: "alamat email",
	        url: "URL",
	        emoji: "emoji",
	        uuid: "UUID",
	        uuidv4: "UUIDv4",
	        uuidv6: "UUIDv6",
	        nanoid: "nanoid",
	        guid: "GUID",
	        cuid: "cuid",
	        cuid2: "cuid2",
	        ulid: "ULID",
	        xid: "XID",
	        ksuid: "KSUID",
	        datetime: "tanggal dan waktu format ISO",
	        date: "tanggal format ISO",
	        time: "jam format ISO",
	        duration: "durasi format ISO",
	        ipv4: "alamat IPv4",
	        ipv6: "alamat IPv6",
	        cidrv4: "rentang alamat IPv4",
	        cidrv6: "rentang alamat IPv6",
	        base64: "string dengan enkode base64",
	        base64url: "string dengan enkode base64url",
	        json_string: "string JSON",
	        e164: "angka E.164",
	        jwt: "JWT",
	        template_literal: "input",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `Input tidak valid: diharapkan ${issue.expected}, diterima ${parsedType(issue.input)}`;
	            case "invalid_value":
	                if (issue.values.length === 1)
	                    return `Input tidak valid: diharapkan ${util.stringifyPrimitive(issue.values[0])}`;
	                return `Pilihan tidak valid: diharapkan salah satu dari ${util.joinValues(issue.values, "|")}`;
	            case "too_big": {
	                const adj = issue.inclusive ? "<=" : "<";
	                const sizing = getSizing(issue.origin);
	                if (sizing)
	                    return `Terlalu besar: diharapkan ${issue.origin ?? "value"} memiliki ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elemen"}`;
	                return `Terlalu besar: diharapkan ${issue.origin ?? "value"} menjadi ${adj}${issue.maximum.toString()}`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? ">=" : ">";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    return `Terlalu kecil: diharapkan ${issue.origin} memiliki ${adj}${issue.minimum.toString()} ${sizing.unit}`;
	                }
	                return `Terlalu kecil: diharapkan ${issue.origin} menjadi ${adj}${issue.minimum.toString()}`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with")
	                    return `String tidak valid: harus dimulai dengan "${_issue.prefix}"`;
	                if (_issue.format === "ends_with")
	                    return `String tidak valid: harus berakhir dengan "${_issue.suffix}"`;
	                if (_issue.format === "includes")
	                    return `String tidak valid: harus menyertakan "${_issue.includes}"`;
	                if (_issue.format === "regex")
	                    return `String tidak valid: harus sesuai pola ${_issue.pattern}`;
	                return `${Nouns[_issue.format] ?? issue.format} tidak valid`;
	            }
	            case "not_multiple_of":
	                return `Angka tidak valid: harus kelipatan dari ${issue.divisor}`;
	            case "unrecognized_keys":
	                return `Kunci tidak dikenali ${issue.keys.length > 1 ? "s" : ""}: ${util.joinValues(issue.keys, ", ")}`;
	            case "invalid_key":
	                return `Kunci tidak valid di ${issue.origin}`;
	            case "invalid_union":
	                return "Input tidak valid";
	            case "invalid_element":
	                return `Nilai tidak valid di ${issue.origin}`;
	            default:
	                return `Input tidak valid`;
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	}
	module.exports = exports.default; 
} (id, id.exports));

var idExports = id.exports;

var is = {};

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parsedType = void 0;
	exports.default = default_1;
	const util = __importStar(util$3);
	const parsedType = (data) => {
	    const t = typeof data;
	    switch (t) {
	        case "number": {
	            return Number.isNaN(data) ? "NaN" : "númer";
	        }
	        case "object": {
	            if (Array.isArray(data)) {
	                return "fylki";
	            }
	            if (data === null) {
	                return "null";
	            }
	            if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
	                return data.constructor.name;
	            }
	        }
	    }
	    return t;
	};
	exports.parsedType = parsedType;
	const error = () => {
	    const Sizable = {
	        string: { unit: "stafi", verb: "að hafa" },
	        file: { unit: "bæti", verb: "að hafa" },
	        array: { unit: "hluti", verb: "að hafa" },
	        set: { unit: "hluti", verb: "að hafa" },
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    const Nouns = {
	        regex: "gildi",
	        email: "netfang",
	        url: "vefslóð",
	        emoji: "emoji",
	        uuid: "UUID",
	        uuidv4: "UUIDv4",
	        uuidv6: "UUIDv6",
	        nanoid: "nanoid",
	        guid: "GUID",
	        cuid: "cuid",
	        cuid2: "cuid2",
	        ulid: "ULID",
	        xid: "XID",
	        ksuid: "KSUID",
	        datetime: "ISO dagsetning og tími",
	        date: "ISO dagsetning",
	        time: "ISO tími",
	        duration: "ISO tímalengd",
	        ipv4: "IPv4 address",
	        ipv6: "IPv6 address",
	        cidrv4: "IPv4 range",
	        cidrv6: "IPv6 range",
	        base64: "base64-encoded strengur",
	        base64url: "base64url-encoded strengur",
	        json_string: "JSON strengur",
	        e164: "E.164 tölugildi",
	        jwt: "JWT",
	        template_literal: "gildi",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `Rangt gildi: Þú slóst inn ${(0, exports.parsedType)(issue.input)} þar sem á að vera ${issue.expected}`;
	            case "invalid_value":
	                if (issue.values.length === 1)
	                    return `Rangt gildi: gert ráð fyrir ${util.stringifyPrimitive(issue.values[0])}`;
	                return `Ógilt val: má vera eitt af eftirfarandi ${util.joinValues(issue.values, "|")}`;
	            case "too_big": {
	                const adj = issue.inclusive ? "<=" : "<";
	                const sizing = getSizing(issue.origin);
	                if (sizing)
	                    return `Of stórt: gert er ráð fyrir að ${issue.origin ?? "gildi"} hafi ${adj}${issue.maximum.toString()} ${sizing.unit ?? "hluti"}`;
	                return `Of stórt: gert er ráð fyrir að ${issue.origin ?? "gildi"} sé ${adj}${issue.maximum.toString()}`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? ">=" : ">";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    return `Of lítið: gert er ráð fyrir að ${issue.origin} hafi ${adj}${issue.minimum.toString()} ${sizing.unit}`;
	                }
	                return `Of lítið: gert er ráð fyrir að ${issue.origin} sé ${adj}${issue.minimum.toString()}`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with") {
	                    return `Ógildur strengur: verður að byrja á "${_issue.prefix}"`;
	                }
	                if (_issue.format === "ends_with")
	                    return `Ógildur strengur: verður að enda á "${_issue.suffix}"`;
	                if (_issue.format === "includes")
	                    return `Ógildur strengur: verður að innihalda "${_issue.includes}"`;
	                if (_issue.format === "regex")
	                    return `Ógildur strengur: verður að fylgja mynstri ${_issue.pattern}`;
	                return `Rangt ${Nouns[_issue.format] ?? issue.format}`;
	            }
	            case "not_multiple_of":
	                return `Röng tala: verður að vera margfeldi af ${issue.divisor}`;
	            case "unrecognized_keys":
	                return `Óþekkt ${issue.keys.length > 1 ? "ir lyklar" : "ur lykill"}: ${util.joinValues(issue.keys, ", ")}`;
	            case "invalid_key":
	                return `Rangur lykill í ${issue.origin}`;
	            case "invalid_union":
	                return "Rangt gildi";
	            case "invalid_element":
	                return `Rangt gildi í ${issue.origin}`;
	            default:
	                return `Rangt gildi`;
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	} 
} (is));

var it = {exports: {}};

(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	const util = __importStar(util$3);
	const error = () => {
	    const Sizable = {
	        string: { unit: "caratteri", verb: "avere" },
	        file: { unit: "byte", verb: "avere" },
	        array: { unit: "elementi", verb: "avere" },
	        set: { unit: "elementi", verb: "avere" },
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    const parsedType = (data) => {
	        const t = typeof data;
	        switch (t) {
	            case "number": {
	                return Number.isNaN(data) ? "NaN" : "numero";
	            }
	            case "object": {
	                if (Array.isArray(data)) {
	                    return "vettore";
	                }
	                if (data === null) {
	                    return "null";
	                }
	                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
	                    return data.constructor.name;
	                }
	            }
	        }
	        return t;
	    };
	    const Nouns = {
	        regex: "input",
	        email: "indirizzo email",
	        url: "URL",
	        emoji: "emoji",
	        uuid: "UUID",
	        uuidv4: "UUIDv4",
	        uuidv6: "UUIDv6",
	        nanoid: "nanoid",
	        guid: "GUID",
	        cuid: "cuid",
	        cuid2: "cuid2",
	        ulid: "ULID",
	        xid: "XID",
	        ksuid: "KSUID",
	        datetime: "data e ora ISO",
	        date: "data ISO",
	        time: "ora ISO",
	        duration: "durata ISO",
	        ipv4: "indirizzo IPv4",
	        ipv6: "indirizzo IPv6",
	        cidrv4: "intervallo IPv4",
	        cidrv6: "intervallo IPv6",
	        base64: "stringa codificata in base64",
	        base64url: "URL codificata in base64",
	        json_string: "stringa JSON",
	        e164: "numero E.164",
	        jwt: "JWT",
	        template_literal: "input",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `Input non valido: atteso ${issue.expected}, ricevuto ${parsedType(issue.input)}`;
	            // return `Input non valido: atteso ${issue.expected}, ricevuto ${util.getParsedType(issue.input)}`;
	            case "invalid_value":
	                if (issue.values.length === 1)
	                    return `Input non valido: atteso ${util.stringifyPrimitive(issue.values[0])}`;
	                return `Opzione non valida: atteso uno tra ${util.joinValues(issue.values, "|")}`;
	            case "too_big": {
	                const adj = issue.inclusive ? "<=" : "<";
	                const sizing = getSizing(issue.origin);
	                if (sizing)
	                    return `Troppo grande: ${issue.origin ?? "valore"} deve avere ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementi"}`;
	                return `Troppo grande: ${issue.origin ?? "valore"} deve essere ${adj}${issue.maximum.toString()}`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? ">=" : ">";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    return `Troppo piccolo: ${issue.origin} deve avere ${adj}${issue.minimum.toString()} ${sizing.unit}`;
	                }
	                return `Troppo piccolo: ${issue.origin} deve essere ${adj}${issue.minimum.toString()}`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with")
	                    return `Stringa non valida: deve iniziare con "${_issue.prefix}"`;
	                if (_issue.format === "ends_with")
	                    return `Stringa non valida: deve terminare con "${_issue.suffix}"`;
	                if (_issue.format === "includes")
	                    return `Stringa non valida: deve includere "${_issue.includes}"`;
	                if (_issue.format === "regex")
	                    return `Stringa non valida: deve corrispondere al pattern ${_issue.pattern}`;
	                return `Invalid ${Nouns[_issue.format] ?? issue.format}`;
	            }
	            case "not_multiple_of":
	                return `Numero non valido: deve essere un multiplo di ${issue.divisor}`;
	            case "unrecognized_keys":
	                return `Chiav${issue.keys.length > 1 ? "i" : "e"} non riconosciut${issue.keys.length > 1 ? "e" : "a"}: ${util.joinValues(issue.keys, ", ")}`;
	            case "invalid_key":
	                return `Chiave non valida in ${issue.origin}`;
	            case "invalid_union":
	                return "Input non valido";
	            case "invalid_element":
	                return `Valore non valido in ${issue.origin}`;
	            default:
	                return `Input non valido`;
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	}
	module.exports = exports.default; 
} (it, it.exports));

var itExports = it.exports;

var ja = {exports: {}};

(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	const util = __importStar(util$3);
	const error = () => {
	    const Sizable = {
	        string: { unit: "文字", verb: "である" },
	        file: { unit: "バイト", verb: "である" },
	        array: { unit: "要素", verb: "である" },
	        set: { unit: "要素", verb: "である" },
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    const parsedType = (data) => {
	        const t = typeof data;
	        switch (t) {
	            case "number": {
	                return Number.isNaN(data) ? "NaN" : "数値";
	            }
	            case "object": {
	                if (Array.isArray(data)) {
	                    return "配列";
	                }
	                if (data === null) {
	                    return "null";
	                }
	                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
	                    return data.constructor.name;
	                }
	            }
	        }
	        return t;
	    };
	    const Nouns = {
	        regex: "入力値",
	        email: "メールアドレス",
	        url: "URL",
	        emoji: "絵文字",
	        uuid: "UUID",
	        uuidv4: "UUIDv4",
	        uuidv6: "UUIDv6",
	        nanoid: "nanoid",
	        guid: "GUID",
	        cuid: "cuid",
	        cuid2: "cuid2",
	        ulid: "ULID",
	        xid: "XID",
	        ksuid: "KSUID",
	        datetime: "ISO日時",
	        date: "ISO日付",
	        time: "ISO時刻",
	        duration: "ISO期間",
	        ipv4: "IPv4アドレス",
	        ipv6: "IPv6アドレス",
	        cidrv4: "IPv4範囲",
	        cidrv6: "IPv6範囲",
	        base64: "base64エンコード文字列",
	        base64url: "base64urlエンコード文字列",
	        json_string: "JSON文字列",
	        e164: "E.164番号",
	        jwt: "JWT",
	        template_literal: "入力値",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `無効な入力: ${issue.expected}が期待されましたが、${parsedType(issue.input)}が入力されました`;
	            case "invalid_value":
	                if (issue.values.length === 1)
	                    return `無効な入力: ${util.stringifyPrimitive(issue.values[0])}が期待されました`;
	                return `無効な選択: ${util.joinValues(issue.values, "、")}のいずれかである必要があります`;
	            case "too_big": {
	                const adj = issue.inclusive ? "以下である" : "より小さい";
	                const sizing = getSizing(issue.origin);
	                if (sizing)
	                    return `大きすぎる値: ${issue.origin ?? "値"}は${issue.maximum.toString()}${sizing.unit ?? "要素"}${adj}必要があります`;
	                return `大きすぎる値: ${issue.origin ?? "値"}は${issue.maximum.toString()}${adj}必要があります`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? "以上である" : "より大きい";
	                const sizing = getSizing(issue.origin);
	                if (sizing)
	                    return `小さすぎる値: ${issue.origin}は${issue.minimum.toString()}${sizing.unit}${adj}必要があります`;
	                return `小さすぎる値: ${issue.origin}は${issue.minimum.toString()}${adj}必要があります`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with")
	                    return `無効な文字列: "${_issue.prefix}"で始まる必要があります`;
	                if (_issue.format === "ends_with")
	                    return `無効な文字列: "${_issue.suffix}"で終わる必要があります`;
	                if (_issue.format === "includes")
	                    return `無効な文字列: "${_issue.includes}"を含む必要があります`;
	                if (_issue.format === "regex")
	                    return `無効な文字列: パターン${_issue.pattern}に一致する必要があります`;
	                return `無効な${Nouns[_issue.format] ?? issue.format}`;
	            }
	            case "not_multiple_of":
	                return `無効な数値: ${issue.divisor}の倍数である必要があります`;
	            case "unrecognized_keys":
	                return `認識されていないキー${issue.keys.length > 1 ? "群" : ""}: ${util.joinValues(issue.keys, "、")}`;
	            case "invalid_key":
	                return `${issue.origin}内の無効なキー`;
	            case "invalid_union":
	                return "無効な入力";
	            case "invalid_element":
	                return `${issue.origin}内の無効な値`;
	            default:
	                return `無効な入力`;
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	}
	module.exports = exports.default; 
} (ja, ja.exports));

var jaExports = ja.exports;

var kh = {exports: {}};

(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	const util = __importStar(util$3);
	const error = () => {
	    const Sizable = {
	        string: { unit: "តួអក្សរ", verb: "គួរមាន" },
	        file: { unit: "បៃ", verb: "គួរមាន" },
	        array: { unit: "ធាតុ", verb: "គួរមាន" },
	        set: { unit: "ធាតុ", verb: "គួរមាន" },
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    const parsedType = (data) => {
	        const t = typeof data;
	        switch (t) {
	            case "number": {
	                return Number.isNaN(data) ? "មិនមែនជាលេខ (NaN)" : "លេខ";
	            }
	            case "object": {
	                if (Array.isArray(data)) {
	                    return "អារេ (Array)";
	                }
	                if (data === null) {
	                    return "គ្មានតម្លៃ (null)";
	                }
	                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
	                    return data.constructor.name;
	                }
	            }
	        }
	        return t;
	    };
	    const Nouns = {
	        regex: "ទិន្នន័យបញ្ចូល",
	        email: "អាសយដ្ឋានអ៊ីមែល",
	        url: "URL",
	        emoji: "សញ្ញាអារម្មណ៍",
	        uuid: "UUID",
	        uuidv4: "UUIDv4",
	        uuidv6: "UUIDv6",
	        nanoid: "nanoid",
	        guid: "GUID",
	        cuid: "cuid",
	        cuid2: "cuid2",
	        ulid: "ULID",
	        xid: "XID",
	        ksuid: "KSUID",
	        datetime: "កាលបរិច្ឆេទ និងម៉ោង ISO",
	        date: "កាលបរិច្ឆេទ ISO",
	        time: "ម៉ោង ISO",
	        duration: "រយៈពេល ISO",
	        ipv4: "អាសយដ្ឋាន IPv4",
	        ipv6: "អាសយដ្ឋាន IPv6",
	        cidrv4: "ដែនអាសយដ្ឋាន IPv4",
	        cidrv6: "ដែនអាសយដ្ឋាន IPv6",
	        base64: "ខ្សែអក្សរអ៊ិកូដ base64",
	        base64url: "ខ្សែអក្សរអ៊ិកូដ base64url",
	        json_string: "ខ្សែអក្សរ JSON",
	        e164: "លេខ E.164",
	        jwt: "JWT",
	        template_literal: "ទិន្នន័យបញ្ចូល",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ ${issue.expected} ប៉ុន្តែទទួលបាន ${parsedType(issue.input)}`;
	            case "invalid_value":
	                if (issue.values.length === 1)
	                    return `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ ${util.stringifyPrimitive(issue.values[0])}`;
	                return `ជម្រើសមិនត្រឹមត្រូវ៖ ត្រូវជាមួយក្នុងចំណោម ${util.joinValues(issue.values, "|")}`;
	            case "too_big": {
	                const adj = issue.inclusive ? "<=" : "<";
	                const sizing = getSizing(issue.origin);
	                if (sizing)
	                    return `ធំពេក៖ ត្រូវការ ${issue.origin ?? "តម្លៃ"} ${adj} ${issue.maximum.toString()} ${sizing.unit ?? "ធាតុ"}`;
	                return `ធំពេក៖ ត្រូវការ ${issue.origin ?? "តម្លៃ"} ${adj} ${issue.maximum.toString()}`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? ">=" : ">";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    return `តូចពេក៖ ត្រូវការ ${issue.origin} ${adj} ${issue.minimum.toString()} ${sizing.unit}`;
	                }
	                return `តូចពេក៖ ត្រូវការ ${issue.origin} ${adj} ${issue.minimum.toString()}`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with") {
	                    return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវចាប់ផ្តើមដោយ "${_issue.prefix}"`;
	                }
	                if (_issue.format === "ends_with")
	                    return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវបញ្ចប់ដោយ "${_issue.suffix}"`;
	                if (_issue.format === "includes")
	                    return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវមាន "${_issue.includes}"`;
	                if (_issue.format === "regex")
	                    return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវតែផ្គូផ្គងនឹងទម្រង់ដែលបានកំណត់ ${_issue.pattern}`;
	                return `មិនត្រឹមត្រូវ៖ ${Nouns[_issue.format] ?? issue.format}`;
	            }
	            case "not_multiple_of":
	                return `លេខមិនត្រឹមត្រូវ៖ ត្រូវតែជាពហុគុណនៃ ${issue.divisor}`;
	            case "unrecognized_keys":
	                return `រកឃើញសោមិនស្គាល់៖ ${util.joinValues(issue.keys, ", ")}`;
	            case "invalid_key":
	                return `សោមិនត្រឹមត្រូវនៅក្នុង ${issue.origin}`;
	            case "invalid_union":
	                return `ទិន្នន័យមិនត្រឹមត្រូវ`;
	            case "invalid_element":
	                return `ទិន្នន័យមិនត្រឹមត្រូវនៅក្នុង ${issue.origin}`;
	            default:
	                return `ទិន្នន័យមិនត្រឹមត្រូវ`;
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	}
	module.exports = exports.default; 
} (kh, kh.exports));

var khExports = kh.exports;

var ko = {exports: {}};

(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	const util = __importStar(util$3);
	const error = () => {
	    const Sizable = {
	        string: { unit: "문자", verb: "to have" },
	        file: { unit: "바이트", verb: "to have" },
	        array: { unit: "개", verb: "to have" },
	        set: { unit: "개", verb: "to have" },
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    const parsedType = (data) => {
	        const t = typeof data;
	        switch (t) {
	            case "number": {
	                return Number.isNaN(data) ? "NaN" : "number";
	            }
	            case "object": {
	                if (Array.isArray(data)) {
	                    return "array";
	                }
	                if (data === null) {
	                    return "null";
	                }
	                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
	                    return data.constructor.name;
	                }
	            }
	        }
	        return t;
	    };
	    const Nouns = {
	        regex: "입력",
	        email: "이메일 주소",
	        url: "URL",
	        emoji: "이모지",
	        uuid: "UUID",
	        uuidv4: "UUIDv4",
	        uuidv6: "UUIDv6",
	        nanoid: "nanoid",
	        guid: "GUID",
	        cuid: "cuid",
	        cuid2: "cuid2",
	        ulid: "ULID",
	        xid: "XID",
	        ksuid: "KSUID",
	        datetime: "ISO 날짜시간",
	        date: "ISO 날짜",
	        time: "ISO 시간",
	        duration: "ISO 기간",
	        ipv4: "IPv4 주소",
	        ipv6: "IPv6 주소",
	        cidrv4: "IPv4 범위",
	        cidrv6: "IPv6 범위",
	        base64: "base64 인코딩 문자열",
	        base64url: "base64url 인코딩 문자열",
	        json_string: "JSON 문자열",
	        e164: "E.164 번호",
	        jwt: "JWT",
	        template_literal: "입력",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `잘못된 입력: 예상 타입은 ${issue.expected}, 받은 타입은 ${parsedType(issue.input)}입니다`;
	            case "invalid_value":
	                if (issue.values.length === 1)
	                    return `잘못된 입력: 값은 ${util.stringifyPrimitive(issue.values[0])} 이어야 합니다`;
	                return `잘못된 옵션: ${util.joinValues(issue.values, "또는 ")} 중 하나여야 합니다`;
	            case "too_big": {
	                const adj = issue.inclusive ? "이하" : "미만";
	                const suffix = adj === "미만" ? "이어야 합니다" : "여야 합니다";
	                const sizing = getSizing(issue.origin);
	                const unit = sizing?.unit ?? "요소";
	                if (sizing)
	                    return `${issue.origin ?? "값"}이 너무 큽니다: ${issue.maximum.toString()}${unit} ${adj}${suffix}`;
	                return `${issue.origin ?? "값"}이 너무 큽니다: ${issue.maximum.toString()} ${adj}${suffix}`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? "이상" : "초과";
	                const suffix = adj === "이상" ? "이어야 합니다" : "여야 합니다";
	                const sizing = getSizing(issue.origin);
	                const unit = sizing?.unit ?? "요소";
	                if (sizing) {
	                    return `${issue.origin ?? "값"}이 너무 작습니다: ${issue.minimum.toString()}${unit} ${adj}${suffix}`;
	                }
	                return `${issue.origin ?? "값"}이 너무 작습니다: ${issue.minimum.toString()} ${adj}${suffix}`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with") {
	                    return `잘못된 문자열: "${_issue.prefix}"(으)로 시작해야 합니다`;
	                }
	                if (_issue.format === "ends_with")
	                    return `잘못된 문자열: "${_issue.suffix}"(으)로 끝나야 합니다`;
	                if (_issue.format === "includes")
	                    return `잘못된 문자열: "${_issue.includes}"을(를) 포함해야 합니다`;
	                if (_issue.format === "regex")
	                    return `잘못된 문자열: 정규식 ${_issue.pattern} 패턴과 일치해야 합니다`;
	                return `잘못된 ${Nouns[_issue.format] ?? issue.format}`;
	            }
	            case "not_multiple_of":
	                return `잘못된 숫자: ${issue.divisor}의 배수여야 합니다`;
	            case "unrecognized_keys":
	                return `인식할 수 없는 키: ${util.joinValues(issue.keys, ", ")}`;
	            case "invalid_key":
	                return `잘못된 키: ${issue.origin}`;
	            case "invalid_union":
	                return `잘못된 입력`;
	            case "invalid_element":
	                return `잘못된 값: ${issue.origin}`;
	            default:
	                return `잘못된 입력`;
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	}
	module.exports = exports.default; 
} (ko, ko.exports));

var koExports = ko.exports;

var mk = {exports: {}};

(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	const util = __importStar(util$3);
	const error = () => {
	    const Sizable = {
	        string: { unit: "знаци", verb: "да имаат" },
	        file: { unit: "бајти", verb: "да имаат" },
	        array: { unit: "ставки", verb: "да имаат" },
	        set: { unit: "ставки", verb: "да имаат" },
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    const parsedType = (data) => {
	        const t = typeof data;
	        switch (t) {
	            case "number": {
	                return Number.isNaN(data) ? "NaN" : "број";
	            }
	            case "object": {
	                if (Array.isArray(data)) {
	                    return "низа";
	                }
	                if (data === null) {
	                    return "null";
	                }
	                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
	                    return data.constructor.name;
	                }
	            }
	        }
	        return t;
	    };
	    const Nouns = {
	        regex: "внес",
	        email: "адреса на е-пошта",
	        url: "URL",
	        emoji: "емоџи",
	        uuid: "UUID",
	        uuidv4: "UUIDv4",
	        uuidv6: "UUIDv6",
	        nanoid: "nanoid",
	        guid: "GUID",
	        cuid: "cuid",
	        cuid2: "cuid2",
	        ulid: "ULID",
	        xid: "XID",
	        ksuid: "KSUID",
	        datetime: "ISO датум и време",
	        date: "ISO датум",
	        time: "ISO време",
	        duration: "ISO времетраење",
	        ipv4: "IPv4 адреса",
	        ipv6: "IPv6 адреса",
	        cidrv4: "IPv4 опсег",
	        cidrv6: "IPv6 опсег",
	        base64: "base64-енкодирана низа",
	        base64url: "base64url-енкодирана низа",
	        json_string: "JSON низа",
	        e164: "E.164 број",
	        jwt: "JWT",
	        template_literal: "внес",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `Грешен внес: се очекува ${issue.expected}, примено ${parsedType(issue.input)}`;
	            // return `Invalid input: expected ${issue.expected}, received ${util.getParsedType(issue.input)}`;
	            case "invalid_value":
	                if (issue.values.length === 1)
	                    return `Invalid input: expected ${util.stringifyPrimitive(issue.values[0])}`;
	                return `Грешана опција: се очекува една ${util.joinValues(issue.values, "|")}`;
	            case "too_big": {
	                const adj = issue.inclusive ? "<=" : "<";
	                const sizing = getSizing(issue.origin);
	                if (sizing)
	                    return `Премногу голем: се очекува ${issue.origin ?? "вредноста"} да има ${adj}${issue.maximum.toString()} ${sizing.unit ?? "елементи"}`;
	                return `Премногу голем: се очекува ${issue.origin ?? "вредноста"} да биде ${adj}${issue.maximum.toString()}`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? ">=" : ">";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    return `Премногу мал: се очекува ${issue.origin} да има ${adj}${issue.minimum.toString()} ${sizing.unit}`;
	                }
	                return `Премногу мал: се очекува ${issue.origin} да биде ${adj}${issue.minimum.toString()}`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with") {
	                    return `Неважечка низа: мора да започнува со "${_issue.prefix}"`;
	                }
	                if (_issue.format === "ends_with")
	                    return `Неважечка низа: мора да завршува со "${_issue.suffix}"`;
	                if (_issue.format === "includes")
	                    return `Неважечка низа: мора да вклучува "${_issue.includes}"`;
	                if (_issue.format === "regex")
	                    return `Неважечка низа: мора да одгоара на патернот ${_issue.pattern}`;
	                return `Invalid ${Nouns[_issue.format] ?? issue.format}`;
	            }
	            case "not_multiple_of":
	                return `Грешен број: мора да биде делив со ${issue.divisor}`;
	            case "unrecognized_keys":
	                return `${issue.keys.length > 1 ? "Непрепознаени клучеви" : "Непрепознаен клуч"}: ${util.joinValues(issue.keys, ", ")}`;
	            case "invalid_key":
	                return `Грешен клуч во ${issue.origin}`;
	            case "invalid_union":
	                return "Грешен внес";
	            case "invalid_element":
	                return `Грешна вредност во ${issue.origin}`;
	            default:
	                return `Грешен внес`;
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	}
	module.exports = exports.default; 
} (mk, mk.exports));

var mkExports = mk.exports;

var ms = {exports: {}};

(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	const util = __importStar(util$3);
	const error = () => {
	    const Sizable = {
	        string: { unit: "aksara", verb: "mempunyai" },
	        file: { unit: "bait", verb: "mempunyai" },
	        array: { unit: "elemen", verb: "mempunyai" },
	        set: { unit: "elemen", verb: "mempunyai" },
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    const parsedType = (data) => {
	        const t = typeof data;
	        switch (t) {
	            case "number": {
	                return Number.isNaN(data) ? "NaN" : "nombor";
	            }
	            case "object": {
	                if (Array.isArray(data)) {
	                    return "array";
	                }
	                if (data === null) {
	                    return "null";
	                }
	                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
	                    return data.constructor.name;
	                }
	            }
	        }
	        return t;
	    };
	    const Nouns = {
	        regex: "input",
	        email: "alamat e-mel",
	        url: "URL",
	        emoji: "emoji",
	        uuid: "UUID",
	        uuidv4: "UUIDv4",
	        uuidv6: "UUIDv6",
	        nanoid: "nanoid",
	        guid: "GUID",
	        cuid: "cuid",
	        cuid2: "cuid2",
	        ulid: "ULID",
	        xid: "XID",
	        ksuid: "KSUID",
	        datetime: "tarikh masa ISO",
	        date: "tarikh ISO",
	        time: "masa ISO",
	        duration: "tempoh ISO",
	        ipv4: "alamat IPv4",
	        ipv6: "alamat IPv6",
	        cidrv4: "julat IPv4",
	        cidrv6: "julat IPv6",
	        base64: "string dikodkan base64",
	        base64url: "string dikodkan base64url",
	        json_string: "string JSON",
	        e164: "nombor E.164",
	        jwt: "JWT",
	        template_literal: "input",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `Input tidak sah: dijangka ${issue.expected}, diterima ${parsedType(issue.input)}`;
	            case "invalid_value":
	                if (issue.values.length === 1)
	                    return `Input tidak sah: dijangka ${util.stringifyPrimitive(issue.values[0])}`;
	                return `Pilihan tidak sah: dijangka salah satu daripada ${util.joinValues(issue.values, "|")}`;
	            case "too_big": {
	                const adj = issue.inclusive ? "<=" : "<";
	                const sizing = getSizing(issue.origin);
	                if (sizing)
	                    return `Terlalu besar: dijangka ${issue.origin ?? "nilai"} ${sizing.verb} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elemen"}`;
	                return `Terlalu besar: dijangka ${issue.origin ?? "nilai"} adalah ${adj}${issue.maximum.toString()}`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? ">=" : ">";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    return `Terlalu kecil: dijangka ${issue.origin} ${sizing.verb} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
	                }
	                return `Terlalu kecil: dijangka ${issue.origin} adalah ${adj}${issue.minimum.toString()}`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with")
	                    return `String tidak sah: mesti bermula dengan "${_issue.prefix}"`;
	                if (_issue.format === "ends_with")
	                    return `String tidak sah: mesti berakhir dengan "${_issue.suffix}"`;
	                if (_issue.format === "includes")
	                    return `String tidak sah: mesti mengandungi "${_issue.includes}"`;
	                if (_issue.format === "regex")
	                    return `String tidak sah: mesti sepadan dengan corak ${_issue.pattern}`;
	                return `${Nouns[_issue.format] ?? issue.format} tidak sah`;
	            }
	            case "not_multiple_of":
	                return `Nombor tidak sah: perlu gandaan ${issue.divisor}`;
	            case "unrecognized_keys":
	                return `Kunci tidak dikenali: ${util.joinValues(issue.keys, ", ")}`;
	            case "invalid_key":
	                return `Kunci tidak sah dalam ${issue.origin}`;
	            case "invalid_union":
	                return "Input tidak sah";
	            case "invalid_element":
	                return `Nilai tidak sah dalam ${issue.origin}`;
	            default:
	                return `Input tidak sah`;
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	}
	module.exports = exports.default; 
} (ms, ms.exports));

var msExports = ms.exports;

var nl = {exports: {}};

(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	const util = __importStar(util$3);
	const error = () => {
	    const Sizable = {
	        string: { unit: "tekens" },
	        file: { unit: "bytes" },
	        array: { unit: "elementen" },
	        set: { unit: "elementen" },
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    const parsedType = (data) => {
	        const t = typeof data;
	        switch (t) {
	            case "number": {
	                return Number.isNaN(data) ? "NaN" : "getal";
	            }
	            case "object": {
	                if (Array.isArray(data)) {
	                    return "array";
	                }
	                if (data === null) {
	                    return "null";
	                }
	                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
	                    return data.constructor.name;
	                }
	            }
	        }
	        return t;
	    };
	    const Nouns = {
	        regex: "invoer",
	        email: "emailadres",
	        url: "URL",
	        emoji: "emoji",
	        uuid: "UUID",
	        uuidv4: "UUIDv4",
	        uuidv6: "UUIDv6",
	        nanoid: "nanoid",
	        guid: "GUID",
	        cuid: "cuid",
	        cuid2: "cuid2",
	        ulid: "ULID",
	        xid: "XID",
	        ksuid: "KSUID",
	        datetime: "ISO datum en tijd",
	        date: "ISO datum",
	        time: "ISO tijd",
	        duration: "ISO duur",
	        ipv4: "IPv4-adres",
	        ipv6: "IPv6-adres",
	        cidrv4: "IPv4-bereik",
	        cidrv6: "IPv6-bereik",
	        base64: "base64-gecodeerde tekst",
	        base64url: "base64 URL-gecodeerde tekst",
	        json_string: "JSON string",
	        e164: "E.164-nummer",
	        jwt: "JWT",
	        template_literal: "invoer",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `Ongeldige invoer: verwacht ${issue.expected}, ontving ${parsedType(issue.input)}`;
	            case "invalid_value":
	                if (issue.values.length === 1)
	                    return `Ongeldige invoer: verwacht ${util.stringifyPrimitive(issue.values[0])}`;
	                return `Ongeldige optie: verwacht één van ${util.joinValues(issue.values, "|")}`;
	            case "too_big": {
	                const adj = issue.inclusive ? "<=" : "<";
	                const sizing = getSizing(issue.origin);
	                if (sizing)
	                    return `Te lang: verwacht dat ${issue.origin ?? "waarde"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementen"} bevat`;
	                return `Te lang: verwacht dat ${issue.origin ?? "waarde"} ${adj}${issue.maximum.toString()} is`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? ">=" : ">";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    return `Te kort: verwacht dat ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit} bevat`;
	                }
	                return `Te kort: verwacht dat ${issue.origin} ${adj}${issue.minimum.toString()} is`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with") {
	                    return `Ongeldige tekst: moet met "${_issue.prefix}" beginnen`;
	                }
	                if (_issue.format === "ends_with")
	                    return `Ongeldige tekst: moet op "${_issue.suffix}" eindigen`;
	                if (_issue.format === "includes")
	                    return `Ongeldige tekst: moet "${_issue.includes}" bevatten`;
	                if (_issue.format === "regex")
	                    return `Ongeldige tekst: moet overeenkomen met patroon ${_issue.pattern}`;
	                return `Ongeldig: ${Nouns[_issue.format] ?? issue.format}`;
	            }
	            case "not_multiple_of":
	                return `Ongeldig getal: moet een veelvoud van ${issue.divisor} zijn`;
	            case "unrecognized_keys":
	                return `Onbekende key${issue.keys.length > 1 ? "s" : ""}: ${util.joinValues(issue.keys, ", ")}`;
	            case "invalid_key":
	                return `Ongeldige key in ${issue.origin}`;
	            case "invalid_union":
	                return "Ongeldige invoer";
	            case "invalid_element":
	                return `Ongeldige waarde in ${issue.origin}`;
	            default:
	                return `Ongeldige invoer`;
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	}
	module.exports = exports.default; 
} (nl, nl.exports));

var nlExports = nl.exports;

var no = {exports: {}};

(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	const util = __importStar(util$3);
	const error = () => {
	    const Sizable = {
	        string: { unit: "tegn", verb: "å ha" },
	        file: { unit: "bytes", verb: "å ha" },
	        array: { unit: "elementer", verb: "å inneholde" },
	        set: { unit: "elementer", verb: "å inneholde" },
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    const parsedType = (data) => {
	        const t = typeof data;
	        switch (t) {
	            case "number": {
	                return Number.isNaN(data) ? "NaN" : "tall";
	            }
	            case "object": {
	                if (Array.isArray(data)) {
	                    return "liste";
	                }
	                if (data === null) {
	                    return "null";
	                }
	                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
	                    return data.constructor.name;
	                }
	            }
	        }
	        return t;
	    };
	    const Nouns = {
	        regex: "input",
	        email: "e-postadresse",
	        url: "URL",
	        emoji: "emoji",
	        uuid: "UUID",
	        uuidv4: "UUIDv4",
	        uuidv6: "UUIDv6",
	        nanoid: "nanoid",
	        guid: "GUID",
	        cuid: "cuid",
	        cuid2: "cuid2",
	        ulid: "ULID",
	        xid: "XID",
	        ksuid: "KSUID",
	        datetime: "ISO dato- og klokkeslett",
	        date: "ISO-dato",
	        time: "ISO-klokkeslett",
	        duration: "ISO-varighet",
	        ipv4: "IPv4-område",
	        ipv6: "IPv6-område",
	        cidrv4: "IPv4-spekter",
	        cidrv6: "IPv6-spekter",
	        base64: "base64-enkodet streng",
	        base64url: "base64url-enkodet streng",
	        json_string: "JSON-streng",
	        e164: "E.164-nummer",
	        jwt: "JWT",
	        template_literal: "input",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `Ugyldig input: forventet ${issue.expected}, fikk ${parsedType(issue.input)}`;
	            case "invalid_value":
	                if (issue.values.length === 1)
	                    return `Ugyldig verdi: forventet ${util.stringifyPrimitive(issue.values[0])}`;
	                return `Ugyldig valg: forventet en av ${util.joinValues(issue.values, "|")}`;
	            case "too_big": {
	                const adj = issue.inclusive ? "<=" : "<";
	                const sizing = getSizing(issue.origin);
	                if (sizing)
	                    return `For stor(t): forventet ${issue.origin ?? "value"} til å ha ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementer"}`;
	                return `For stor(t): forventet ${issue.origin ?? "value"} til å ha ${adj}${issue.maximum.toString()}`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? ">=" : ">";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    return `For lite(n): forventet ${issue.origin} til å ha ${adj}${issue.minimum.toString()} ${sizing.unit}`;
	                }
	                return `For lite(n): forventet ${issue.origin} til å ha ${adj}${issue.minimum.toString()}`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with")
	                    return `Ugyldig streng: må starte med "${_issue.prefix}"`;
	                if (_issue.format === "ends_with")
	                    return `Ugyldig streng: må ende med "${_issue.suffix}"`;
	                if (_issue.format === "includes")
	                    return `Ugyldig streng: må inneholde "${_issue.includes}"`;
	                if (_issue.format === "regex")
	                    return `Ugyldig streng: må matche mønsteret ${_issue.pattern}`;
	                return `Ugyldig ${Nouns[_issue.format] ?? issue.format}`;
	            }
	            case "not_multiple_of":
	                return `Ugyldig tall: må være et multiplum av ${issue.divisor}`;
	            case "unrecognized_keys":
	                return `${issue.keys.length > 1 ? "Ukjente nøkler" : "Ukjent nøkkel"}: ${util.joinValues(issue.keys, ", ")}`;
	            case "invalid_key":
	                return `Ugyldig nøkkel i ${issue.origin}`;
	            case "invalid_union":
	                return "Ugyldig input";
	            case "invalid_element":
	                return `Ugyldig verdi i ${issue.origin}`;
	            default:
	                return `Ugyldig input`;
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	}
	module.exports = exports.default; 
} (no, no.exports));

var noExports = no.exports;

var ota = {exports: {}};

(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	const util = __importStar(util$3);
	const error = () => {
	    const Sizable = {
	        string: { unit: "harf", verb: "olmalıdır" },
	        file: { unit: "bayt", verb: "olmalıdır" },
	        array: { unit: "unsur", verb: "olmalıdır" },
	        set: { unit: "unsur", verb: "olmalıdır" },
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    const parsedType = (data) => {
	        const t = typeof data;
	        switch (t) {
	            case "number": {
	                return Number.isNaN(data) ? "NaN" : "numara";
	            }
	            case "object": {
	                if (Array.isArray(data)) {
	                    return "saf";
	                }
	                if (data === null) {
	                    return "gayb";
	                }
	                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
	                    return data.constructor.name;
	                }
	            }
	        }
	        return t;
	    };
	    const Nouns = {
	        regex: "giren",
	        email: "epostagâh",
	        url: "URL",
	        emoji: "emoji",
	        uuid: "UUID",
	        uuidv4: "UUIDv4",
	        uuidv6: "UUIDv6",
	        nanoid: "nanoid",
	        guid: "GUID",
	        cuid: "cuid",
	        cuid2: "cuid2",
	        ulid: "ULID",
	        xid: "XID",
	        ksuid: "KSUID",
	        datetime: "ISO hengâmı",
	        date: "ISO tarihi",
	        time: "ISO zamanı",
	        duration: "ISO müddeti",
	        ipv4: "IPv4 nişânı",
	        ipv6: "IPv6 nişânı",
	        cidrv4: "IPv4 menzili",
	        cidrv6: "IPv6 menzili",
	        base64: "base64-şifreli metin",
	        base64url: "base64url-şifreli metin",
	        json_string: "JSON metin",
	        e164: "E.164 sayısı",
	        jwt: "JWT",
	        template_literal: "giren",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `Fâsit giren: umulan ${issue.expected}, alınan ${parsedType(issue.input)}`;
	            // return `Fâsit giren: umulan ${issue.expected}, alınan ${util.getParsedType(issue.input)}`;
	            case "invalid_value":
	                if (issue.values.length === 1)
	                    return `Fâsit giren: umulan ${util.stringifyPrimitive(issue.values[0])}`;
	                return `Fâsit tercih: mûteberler ${util.joinValues(issue.values, "|")}`;
	            case "too_big": {
	                const adj = issue.inclusive ? "<=" : "<";
	                const sizing = getSizing(issue.origin);
	                if (sizing)
	                    return `Fazla büyük: ${issue.origin ?? "value"}, ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elements"} sahip olmalıydı.`;
	                return `Fazla büyük: ${issue.origin ?? "value"}, ${adj}${issue.maximum.toString()} olmalıydı.`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? ">=" : ">";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    return `Fazla küçük: ${issue.origin}, ${adj}${issue.minimum.toString()} ${sizing.unit} sahip olmalıydı.`;
	                }
	                return `Fazla küçük: ${issue.origin}, ${adj}${issue.minimum.toString()} olmalıydı.`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with")
	                    return `Fâsit metin: "${_issue.prefix}" ile başlamalı.`;
	                if (_issue.format === "ends_with")
	                    return `Fâsit metin: "${_issue.suffix}" ile bitmeli.`;
	                if (_issue.format === "includes")
	                    return `Fâsit metin: "${_issue.includes}" ihtivâ etmeli.`;
	                if (_issue.format === "regex")
	                    return `Fâsit metin: ${_issue.pattern} nakşına uymalı.`;
	                return `Fâsit ${Nouns[_issue.format] ?? issue.format}`;
	            }
	            case "not_multiple_of":
	                return `Fâsit sayı: ${issue.divisor} katı olmalıydı.`;
	            case "unrecognized_keys":
	                return `Tanınmayan anahtar ${issue.keys.length > 1 ? "s" : ""}: ${util.joinValues(issue.keys, ", ")}`;
	            case "invalid_key":
	                return `${issue.origin} için tanınmayan anahtar var.`;
	            case "invalid_union":
	                return "Giren tanınamadı.";
	            case "invalid_element":
	                return `${issue.origin} için tanınmayan kıymet var.`;
	            default:
	                return `Kıymet tanınamadı.`;
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	}
	module.exports = exports.default; 
} (ota, ota.exports));

var otaExports = ota.exports;

var ps = {exports: {}};

(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	const util = __importStar(util$3);
	const error = () => {
	    const Sizable = {
	        string: { unit: "توکي", verb: "ولري" },
	        file: { unit: "بایټس", verb: "ولري" },
	        array: { unit: "توکي", verb: "ولري" },
	        set: { unit: "توکي", verb: "ولري" },
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    const parsedType = (data) => {
	        const t = typeof data;
	        switch (t) {
	            case "number": {
	                return Number.isNaN(data) ? "NaN" : "عدد";
	            }
	            case "object": {
	                if (Array.isArray(data)) {
	                    return "ارې";
	                }
	                if (data === null) {
	                    return "null";
	                }
	                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
	                    return data.constructor.name;
	                }
	            }
	        }
	        return t;
	    };
	    const Nouns = {
	        regex: "ورودي",
	        email: "بریښنالیک",
	        url: "یو آر ال",
	        emoji: "ایموجي",
	        uuid: "UUID",
	        uuidv4: "UUIDv4",
	        uuidv6: "UUIDv6",
	        nanoid: "nanoid",
	        guid: "GUID",
	        cuid: "cuid",
	        cuid2: "cuid2",
	        ulid: "ULID",
	        xid: "XID",
	        ksuid: "KSUID",
	        datetime: "نیټه او وخت",
	        date: "نېټه",
	        time: "وخت",
	        duration: "موده",
	        ipv4: "د IPv4 پته",
	        ipv6: "د IPv6 پته",
	        cidrv4: "د IPv4 ساحه",
	        cidrv6: "د IPv6 ساحه",
	        base64: "base64-encoded متن",
	        base64url: "base64url-encoded متن",
	        json_string: "JSON متن",
	        e164: "د E.164 شمېره",
	        jwt: "JWT",
	        template_literal: "ورودي",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `ناسم ورودي: باید ${issue.expected} وای, مګر ${parsedType(issue.input)} ترلاسه شو`;
	            case "invalid_value":
	                if (issue.values.length === 1) {
	                    return `ناسم ورودي: باید ${util.stringifyPrimitive(issue.values[0])} وای`;
	                }
	                return `ناسم انتخاب: باید یو له ${util.joinValues(issue.values, "|")} څخه وای`;
	            case "too_big": {
	                const adj = issue.inclusive ? "<=" : "<";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    return `ډیر لوی: ${issue.origin ?? "ارزښت"} باید ${adj}${issue.maximum.toString()} ${sizing.unit ?? "عنصرونه"} ولري`;
	                }
	                return `ډیر لوی: ${issue.origin ?? "ارزښت"} باید ${adj}${issue.maximum.toString()} وي`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? ">=" : ">";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    return `ډیر کوچنی: ${issue.origin} باید ${adj}${issue.minimum.toString()} ${sizing.unit} ولري`;
	                }
	                return `ډیر کوچنی: ${issue.origin} باید ${adj}${issue.minimum.toString()} وي`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with") {
	                    return `ناسم متن: باید د "${_issue.prefix}" سره پیل شي`;
	                }
	                if (_issue.format === "ends_with") {
	                    return `ناسم متن: باید د "${_issue.suffix}" سره پای ته ورسيږي`;
	                }
	                if (_issue.format === "includes") {
	                    return `ناسم متن: باید "${_issue.includes}" ولري`;
	                }
	                if (_issue.format === "regex") {
	                    return `ناسم متن: باید د ${_issue.pattern} سره مطابقت ولري`;
	                }
	                return `${Nouns[_issue.format] ?? issue.format} ناسم دی`;
	            }
	            case "not_multiple_of":
	                return `ناسم عدد: باید د ${issue.divisor} مضرب وي`;
	            case "unrecognized_keys":
	                return `ناسم ${issue.keys.length > 1 ? "کلیډونه" : "کلیډ"}: ${util.joinValues(issue.keys, ", ")}`;
	            case "invalid_key":
	                return `ناسم کلیډ په ${issue.origin} کې`;
	            case "invalid_union":
	                return `ناسمه ورودي`;
	            case "invalid_element":
	                return `ناسم عنصر په ${issue.origin} کې`;
	            default:
	                return `ناسمه ورودي`;
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	}
	module.exports = exports.default; 
} (ps, ps.exports));

var psExports = ps.exports;

var pl = {exports: {}};

(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	const util = __importStar(util$3);
	const error = () => {
	    const Sizable = {
	        string: { unit: "znaków", verb: "mieć" },
	        file: { unit: "bajtów", verb: "mieć" },
	        array: { unit: "elementów", verb: "mieć" },
	        set: { unit: "elementów", verb: "mieć" },
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    const parsedType = (data) => {
	        const t = typeof data;
	        switch (t) {
	            case "number": {
	                return Number.isNaN(data) ? "NaN" : "liczba";
	            }
	            case "object": {
	                if (Array.isArray(data)) {
	                    return "tablica";
	                }
	                if (data === null) {
	                    return "null";
	                }
	                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
	                    return data.constructor.name;
	                }
	            }
	        }
	        return t;
	    };
	    const Nouns = {
	        regex: "wyrażenie",
	        email: "adres email",
	        url: "URL",
	        emoji: "emoji",
	        uuid: "UUID",
	        uuidv4: "UUIDv4",
	        uuidv6: "UUIDv6",
	        nanoid: "nanoid",
	        guid: "GUID",
	        cuid: "cuid",
	        cuid2: "cuid2",
	        ulid: "ULID",
	        xid: "XID",
	        ksuid: "KSUID",
	        datetime: "data i godzina w formacie ISO",
	        date: "data w formacie ISO",
	        time: "godzina w formacie ISO",
	        duration: "czas trwania ISO",
	        ipv4: "adres IPv4",
	        ipv6: "adres IPv6",
	        cidrv4: "zakres IPv4",
	        cidrv6: "zakres IPv6",
	        base64: "ciąg znaków zakodowany w formacie base64",
	        base64url: "ciąg znaków zakodowany w formacie base64url",
	        json_string: "ciąg znaków w formacie JSON",
	        e164: "liczba E.164",
	        jwt: "JWT",
	        template_literal: "wejście",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `Nieprawidłowe dane wejściowe: oczekiwano ${issue.expected}, otrzymano ${parsedType(issue.input)}`;
	            case "invalid_value":
	                if (issue.values.length === 1)
	                    return `Nieprawidłowe dane wejściowe: oczekiwano ${util.stringifyPrimitive(issue.values[0])}`;
	                return `Nieprawidłowa opcja: oczekiwano jednej z wartości ${util.joinValues(issue.values, "|")}`;
	            case "too_big": {
	                const adj = issue.inclusive ? "<=" : "<";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    return `Za duża wartość: oczekiwano, że ${issue.origin ?? "wartość"} będzie mieć ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementów"}`;
	                }
	                return `Zbyt duż(y/a/e): oczekiwano, że ${issue.origin ?? "wartość"} będzie wynosić ${adj}${issue.maximum.toString()}`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? ">=" : ">";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    return `Za mała wartość: oczekiwano, że ${issue.origin ?? "wartość"} będzie mieć ${adj}${issue.minimum.toString()} ${sizing.unit ?? "elementów"}`;
	                }
	                return `Zbyt mał(y/a/e): oczekiwano, że ${issue.origin ?? "wartość"} będzie wynosić ${adj}${issue.minimum.toString()}`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with")
	                    return `Nieprawidłowy ciąg znaków: musi zaczynać się od "${_issue.prefix}"`;
	                if (_issue.format === "ends_with")
	                    return `Nieprawidłowy ciąg znaków: musi kończyć się na "${_issue.suffix}"`;
	                if (_issue.format === "includes")
	                    return `Nieprawidłowy ciąg znaków: musi zawierać "${_issue.includes}"`;
	                if (_issue.format === "regex")
	                    return `Nieprawidłowy ciąg znaków: musi odpowiadać wzorcowi ${_issue.pattern}`;
	                return `Nieprawidłow(y/a/e) ${Nouns[_issue.format] ?? issue.format}`;
	            }
	            case "not_multiple_of":
	                return `Nieprawidłowa liczba: musi być wielokrotnością ${issue.divisor}`;
	            case "unrecognized_keys":
	                return `Nierozpoznane klucze${issue.keys.length > 1 ? "s" : ""}: ${util.joinValues(issue.keys, ", ")}`;
	            case "invalid_key":
	                return `Nieprawidłowy klucz w ${issue.origin}`;
	            case "invalid_union":
	                return "Nieprawidłowe dane wejściowe";
	            case "invalid_element":
	                return `Nieprawidłowa wartość w ${issue.origin}`;
	            default:
	                return `Nieprawidłowe dane wejściowe`;
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	}
	module.exports = exports.default; 
} (pl, pl.exports));

var plExports = pl.exports;

var pt = {exports: {}};

(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	const util = __importStar(util$3);
	const error = () => {
	    const Sizable = {
	        string: { unit: "caracteres", verb: "ter" },
	        file: { unit: "bytes", verb: "ter" },
	        array: { unit: "itens", verb: "ter" },
	        set: { unit: "itens", verb: "ter" },
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    const parsedType = (data) => {
	        const t = typeof data;
	        switch (t) {
	            case "number": {
	                return Number.isNaN(data) ? "NaN" : "número";
	            }
	            case "object": {
	                if (Array.isArray(data)) {
	                    return "array";
	                }
	                if (data === null) {
	                    return "nulo";
	                }
	                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
	                    return data.constructor.name;
	                }
	            }
	        }
	        return t;
	    };
	    const Nouns = {
	        regex: "padrão",
	        email: "endereço de e-mail",
	        url: "URL",
	        emoji: "emoji",
	        uuid: "UUID",
	        uuidv4: "UUIDv4",
	        uuidv6: "UUIDv6",
	        nanoid: "nanoid",
	        guid: "GUID",
	        cuid: "cuid",
	        cuid2: "cuid2",
	        ulid: "ULID",
	        xid: "XID",
	        ksuid: "KSUID",
	        datetime: "data e hora ISO",
	        date: "data ISO",
	        time: "hora ISO",
	        duration: "duração ISO",
	        ipv4: "endereço IPv4",
	        ipv6: "endereço IPv6",
	        cidrv4: "faixa de IPv4",
	        cidrv6: "faixa de IPv6",
	        base64: "texto codificado em base64",
	        base64url: "URL codificada em base64",
	        json_string: "texto JSON",
	        e164: "número E.164",
	        jwt: "JWT",
	        template_literal: "entrada",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `Tipo inválido: esperado ${issue.expected}, recebido ${parsedType(issue.input)}`;
	            case "invalid_value":
	                if (issue.values.length === 1)
	                    return `Entrada inválida: esperado ${util.stringifyPrimitive(issue.values[0])}`;
	                return `Opção inválida: esperada uma das ${util.joinValues(issue.values, "|")}`;
	            case "too_big": {
	                const adj = issue.inclusive ? "<=" : "<";
	                const sizing = getSizing(issue.origin);
	                if (sizing)
	                    return `Muito grande: esperado que ${issue.origin ?? "valor"} tivesse ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementos"}`;
	                return `Muito grande: esperado que ${issue.origin ?? "valor"} fosse ${adj}${issue.maximum.toString()}`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? ">=" : ">";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    return `Muito pequeno: esperado que ${issue.origin} tivesse ${adj}${issue.minimum.toString()} ${sizing.unit}`;
	                }
	                return `Muito pequeno: esperado que ${issue.origin} fosse ${adj}${issue.minimum.toString()}`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with")
	                    return `Texto inválido: deve começar com "${_issue.prefix}"`;
	                if (_issue.format === "ends_with")
	                    return `Texto inválido: deve terminar com "${_issue.suffix}"`;
	                if (_issue.format === "includes")
	                    return `Texto inválido: deve incluir "${_issue.includes}"`;
	                if (_issue.format === "regex")
	                    return `Texto inválido: deve corresponder ao padrão ${_issue.pattern}`;
	                return `${Nouns[_issue.format] ?? issue.format} inválido`;
	            }
	            case "not_multiple_of":
	                return `Número inválido: deve ser múltiplo de ${issue.divisor}`;
	            case "unrecognized_keys":
	                return `Chave${issue.keys.length > 1 ? "s" : ""} desconhecida${issue.keys.length > 1 ? "s" : ""}: ${util.joinValues(issue.keys, ", ")}`;
	            case "invalid_key":
	                return `Chave inválida em ${issue.origin}`;
	            case "invalid_union":
	                return "Entrada inválida";
	            case "invalid_element":
	                return `Valor inválido em ${issue.origin}`;
	            default:
	                return `Campo inválido`;
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	}
	module.exports = exports.default; 
} (pt, pt.exports));

var ptExports = pt.exports;

var ru = {exports: {}};

(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	const util = __importStar(util$3);
	function getRussianPlural(count, one, few, many) {
	    const absCount = Math.abs(count);
	    const lastDigit = absCount % 10;
	    const lastTwoDigits = absCount % 100;
	    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
	        return many;
	    }
	    if (lastDigit === 1) {
	        return one;
	    }
	    if (lastDigit >= 2 && lastDigit <= 4) {
	        return few;
	    }
	    return many;
	}
	const error = () => {
	    const Sizable = {
	        string: {
	            unit: {
	                one: "символ",
	                few: "символа",
	                many: "символов",
	            },
	            verb: "иметь",
	        },
	        file: {
	            unit: {
	                one: "байт",
	                few: "байта",
	                many: "байт",
	            },
	            verb: "иметь",
	        },
	        array: {
	            unit: {
	                one: "элемент",
	                few: "элемента",
	                many: "элементов",
	            },
	            verb: "иметь",
	        },
	        set: {
	            unit: {
	                one: "элемент",
	                few: "элемента",
	                many: "элементов",
	            },
	            verb: "иметь",
	        },
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    const parsedType = (data) => {
	        const t = typeof data;
	        switch (t) {
	            case "number": {
	                return Number.isNaN(data) ? "NaN" : "число";
	            }
	            case "object": {
	                if (Array.isArray(data)) {
	                    return "массив";
	                }
	                if (data === null) {
	                    return "null";
	                }
	                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
	                    return data.constructor.name;
	                }
	            }
	        }
	        return t;
	    };
	    const Nouns = {
	        regex: "ввод",
	        email: "email адрес",
	        url: "URL",
	        emoji: "эмодзи",
	        uuid: "UUID",
	        uuidv4: "UUIDv4",
	        uuidv6: "UUIDv6",
	        nanoid: "nanoid",
	        guid: "GUID",
	        cuid: "cuid",
	        cuid2: "cuid2",
	        ulid: "ULID",
	        xid: "XID",
	        ksuid: "KSUID",
	        datetime: "ISO дата и время",
	        date: "ISO дата",
	        time: "ISO время",
	        duration: "ISO длительность",
	        ipv4: "IPv4 адрес",
	        ipv6: "IPv6 адрес",
	        cidrv4: "IPv4 диапазон",
	        cidrv6: "IPv6 диапазон",
	        base64: "строка в формате base64",
	        base64url: "строка в формате base64url",
	        json_string: "JSON строка",
	        e164: "номер E.164",
	        jwt: "JWT",
	        template_literal: "ввод",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `Неверный ввод: ожидалось ${issue.expected}, получено ${parsedType(issue.input)}`;
	            case "invalid_value":
	                if (issue.values.length === 1)
	                    return `Неверный ввод: ожидалось ${util.stringifyPrimitive(issue.values[0])}`;
	                return `Неверный вариант: ожидалось одно из ${util.joinValues(issue.values, "|")}`;
	            case "too_big": {
	                const adj = issue.inclusive ? "<=" : "<";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    const maxValue = Number(issue.maximum);
	                    const unit = getRussianPlural(maxValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
	                    return `Слишком большое значение: ожидалось, что ${issue.origin ?? "значение"} будет иметь ${adj}${issue.maximum.toString()} ${unit}`;
	                }
	                return `Слишком большое значение: ожидалось, что ${issue.origin ?? "значение"} будет ${adj}${issue.maximum.toString()}`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? ">=" : ">";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    const minValue = Number(issue.minimum);
	                    const unit = getRussianPlural(minValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
	                    return `Слишком маленькое значение: ожидалось, что ${issue.origin} будет иметь ${adj}${issue.minimum.toString()} ${unit}`;
	                }
	                return `Слишком маленькое значение: ожидалось, что ${issue.origin} будет ${adj}${issue.minimum.toString()}`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with")
	                    return `Неверная строка: должна начинаться с "${_issue.prefix}"`;
	                if (_issue.format === "ends_with")
	                    return `Неверная строка: должна заканчиваться на "${_issue.suffix}"`;
	                if (_issue.format === "includes")
	                    return `Неверная строка: должна содержать "${_issue.includes}"`;
	                if (_issue.format === "regex")
	                    return `Неверная строка: должна соответствовать шаблону ${_issue.pattern}`;
	                return `Неверный ${Nouns[_issue.format] ?? issue.format}`;
	            }
	            case "not_multiple_of":
	                return `Неверное число: должно быть кратным ${issue.divisor}`;
	            case "unrecognized_keys":
	                return `Нераспознанн${issue.keys.length > 1 ? "ые" : "ый"} ключ${issue.keys.length > 1 ? "и" : ""}: ${util.joinValues(issue.keys, ", ")}`;
	            case "invalid_key":
	                return `Неверный ключ в ${issue.origin}`;
	            case "invalid_union":
	                return "Неверные входные данные";
	            case "invalid_element":
	                return `Неверное значение в ${issue.origin}`;
	            default:
	                return `Неверные входные данные`;
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	}
	module.exports = exports.default; 
} (ru, ru.exports));

var ruExports = ru.exports;

var sl = {exports: {}};

(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	const util = __importStar(util$3);
	const error = () => {
	    const Sizable = {
	        string: { unit: "znakov", verb: "imeti" },
	        file: { unit: "bajtov", verb: "imeti" },
	        array: { unit: "elementov", verb: "imeti" },
	        set: { unit: "elementov", verb: "imeti" },
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    const parsedType = (data) => {
	        const t = typeof data;
	        switch (t) {
	            case "number": {
	                return Number.isNaN(data) ? "NaN" : "število";
	            }
	            case "object": {
	                if (Array.isArray(data)) {
	                    return "tabela";
	                }
	                if (data === null) {
	                    return "null";
	                }
	                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
	                    return data.constructor.name;
	                }
	            }
	        }
	        return t;
	    };
	    const Nouns = {
	        regex: "vnos",
	        email: "e-poštni naslov",
	        url: "URL",
	        emoji: "emoji",
	        uuid: "UUID",
	        uuidv4: "UUIDv4",
	        uuidv6: "UUIDv6",
	        nanoid: "nanoid",
	        guid: "GUID",
	        cuid: "cuid",
	        cuid2: "cuid2",
	        ulid: "ULID",
	        xid: "XID",
	        ksuid: "KSUID",
	        datetime: "ISO datum in čas",
	        date: "ISO datum",
	        time: "ISO čas",
	        duration: "ISO trajanje",
	        ipv4: "IPv4 naslov",
	        ipv6: "IPv6 naslov",
	        cidrv4: "obseg IPv4",
	        cidrv6: "obseg IPv6",
	        base64: "base64 kodiran niz",
	        base64url: "base64url kodiran niz",
	        json_string: "JSON niz",
	        e164: "E.164 številka",
	        jwt: "JWT",
	        template_literal: "vnos",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `Neveljaven vnos: pričakovano ${issue.expected}, prejeto ${parsedType(issue.input)}`;
	            case "invalid_value":
	                if (issue.values.length === 1)
	                    return `Neveljaven vnos: pričakovano ${util.stringifyPrimitive(issue.values[0])}`;
	                return `Neveljavna možnost: pričakovano eno izmed ${util.joinValues(issue.values, "|")}`;
	            case "too_big": {
	                const adj = issue.inclusive ? "<=" : "<";
	                const sizing = getSizing(issue.origin);
	                if (sizing)
	                    return `Preveliko: pričakovano, da bo ${issue.origin ?? "vrednost"} imelo ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementov"}`;
	                return `Preveliko: pričakovano, da bo ${issue.origin ?? "vrednost"} ${adj}${issue.maximum.toString()}`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? ">=" : ">";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    return `Premajhno: pričakovano, da bo ${issue.origin} imelo ${adj}${issue.minimum.toString()} ${sizing.unit}`;
	                }
	                return `Premajhno: pričakovano, da bo ${issue.origin} ${adj}${issue.minimum.toString()}`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with") {
	                    return `Neveljaven niz: mora se začeti z "${_issue.prefix}"`;
	                }
	                if (_issue.format === "ends_with")
	                    return `Neveljaven niz: mora se končati z "${_issue.suffix}"`;
	                if (_issue.format === "includes")
	                    return `Neveljaven niz: mora vsebovati "${_issue.includes}"`;
	                if (_issue.format === "regex")
	                    return `Neveljaven niz: mora ustrezati vzorcu ${_issue.pattern}`;
	                return `Neveljaven ${Nouns[_issue.format] ?? issue.format}`;
	            }
	            case "not_multiple_of":
	                return `Neveljavno število: mora biti večkratnik ${issue.divisor}`;
	            case "unrecognized_keys":
	                return `Neprepoznan${issue.keys.length > 1 ? "i ključi" : " ključ"}: ${util.joinValues(issue.keys, ", ")}`;
	            case "invalid_key":
	                return `Neveljaven ključ v ${issue.origin}`;
	            case "invalid_union":
	                return "Neveljaven vnos";
	            case "invalid_element":
	                return `Neveljavna vrednost v ${issue.origin}`;
	            default:
	                return "Neveljaven vnos";
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	}
	module.exports = exports.default; 
} (sl, sl.exports));

var slExports = sl.exports;

var sv = {exports: {}};

(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	const util = __importStar(util$3);
	const error = () => {
	    const Sizable = {
	        string: { unit: "tecken", verb: "att ha" },
	        file: { unit: "bytes", verb: "att ha" },
	        array: { unit: "objekt", verb: "att innehålla" },
	        set: { unit: "objekt", verb: "att innehålla" },
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    const parsedType = (data) => {
	        const t = typeof data;
	        switch (t) {
	            case "number": {
	                return Number.isNaN(data) ? "NaN" : "antal";
	            }
	            case "object": {
	                if (Array.isArray(data)) {
	                    return "lista";
	                }
	                if (data === null) {
	                    return "null";
	                }
	                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
	                    return data.constructor.name;
	                }
	            }
	        }
	        return t;
	    };
	    const Nouns = {
	        regex: "reguljärt uttryck",
	        email: "e-postadress",
	        url: "URL",
	        emoji: "emoji",
	        uuid: "UUID",
	        uuidv4: "UUIDv4",
	        uuidv6: "UUIDv6",
	        nanoid: "nanoid",
	        guid: "GUID",
	        cuid: "cuid",
	        cuid2: "cuid2",
	        ulid: "ULID",
	        xid: "XID",
	        ksuid: "KSUID",
	        datetime: "ISO-datum och tid",
	        date: "ISO-datum",
	        time: "ISO-tid",
	        duration: "ISO-varaktighet",
	        ipv4: "IPv4-intervall",
	        ipv6: "IPv6-intervall",
	        cidrv4: "IPv4-spektrum",
	        cidrv6: "IPv6-spektrum",
	        base64: "base64-kodad sträng",
	        base64url: "base64url-kodad sträng",
	        json_string: "JSON-sträng",
	        e164: "E.164-nummer",
	        jwt: "JWT",
	        template_literal: "mall-literal",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `Ogiltig inmatning: förväntat ${issue.expected}, fick ${parsedType(issue.input)}`;
	            case "invalid_value":
	                if (issue.values.length === 1)
	                    return `Ogiltig inmatning: förväntat ${util.stringifyPrimitive(issue.values[0])}`;
	                return `Ogiltigt val: förväntade en av ${util.joinValues(issue.values, "|")}`;
	            case "too_big": {
	                const adj = issue.inclusive ? "<=" : "<";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    return `För stor(t): förväntade ${issue.origin ?? "värdet"} att ha ${adj}${issue.maximum.toString()} ${sizing.unit ?? "element"}`;
	                }
	                return `För stor(t): förväntat ${issue.origin ?? "värdet"} att ha ${adj}${issue.maximum.toString()}`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? ">=" : ">";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    return `För lite(t): förväntade ${issue.origin ?? "värdet"} att ha ${adj}${issue.minimum.toString()} ${sizing.unit}`;
	                }
	                return `För lite(t): förväntade ${issue.origin ?? "värdet"} att ha ${adj}${issue.minimum.toString()}`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with") {
	                    return `Ogiltig sträng: måste börja med "${_issue.prefix}"`;
	                }
	                if (_issue.format === "ends_with")
	                    return `Ogiltig sträng: måste sluta med "${_issue.suffix}"`;
	                if (_issue.format === "includes")
	                    return `Ogiltig sträng: måste innehålla "${_issue.includes}"`;
	                if (_issue.format === "regex")
	                    return `Ogiltig sträng: måste matcha mönstret "${_issue.pattern}"`;
	                return `Ogiltig(t) ${Nouns[_issue.format] ?? issue.format}`;
	            }
	            case "not_multiple_of":
	                return `Ogiltigt tal: måste vara en multipel av ${issue.divisor}`;
	            case "unrecognized_keys":
	                return `${issue.keys.length > 1 ? "Okända nycklar" : "Okänd nyckel"}: ${util.joinValues(issue.keys, ", ")}`;
	            case "invalid_key":
	                return `Ogiltig nyckel i ${issue.origin ?? "värdet"}`;
	            case "invalid_union":
	                return "Ogiltig input";
	            case "invalid_element":
	                return `Ogiltigt värde i ${issue.origin ?? "värdet"}`;
	            default:
	                return `Ogiltig input`;
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	}
	module.exports = exports.default; 
} (sv, sv.exports));

var svExports = sv.exports;

var ta = {exports: {}};

(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	const util = __importStar(util$3);
	const error = () => {
	    const Sizable = {
	        string: { unit: "எழுத்துக்கள்", verb: "கொண்டிருக்க வேண்டும்" },
	        file: { unit: "பைட்டுகள்", verb: "கொண்டிருக்க வேண்டும்" },
	        array: { unit: "உறுப்புகள்", verb: "கொண்டிருக்க வேண்டும்" },
	        set: { unit: "உறுப்புகள்", verb: "கொண்டிருக்க வேண்டும்" },
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    const parsedType = (data) => {
	        const t = typeof data;
	        switch (t) {
	            case "number": {
	                return Number.isNaN(data) ? "எண் அல்லாதது" : "எண்";
	            }
	            case "object": {
	                if (Array.isArray(data)) {
	                    return "அணி";
	                }
	                if (data === null) {
	                    return "வெறுமை";
	                }
	                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
	                    return data.constructor.name;
	                }
	            }
	        }
	        return t;
	    };
	    const Nouns = {
	        regex: "உள்ளீடு",
	        email: "மின்னஞ்சல் முகவரி",
	        url: "URL",
	        emoji: "emoji",
	        uuid: "UUID",
	        uuidv4: "UUIDv4",
	        uuidv6: "UUIDv6",
	        nanoid: "nanoid",
	        guid: "GUID",
	        cuid: "cuid",
	        cuid2: "cuid2",
	        ulid: "ULID",
	        xid: "XID",
	        ksuid: "KSUID",
	        datetime: "ISO தேதி நேரம்",
	        date: "ISO தேதி",
	        time: "ISO நேரம்",
	        duration: "ISO கால அளவு",
	        ipv4: "IPv4 முகவரி",
	        ipv6: "IPv6 முகவரி",
	        cidrv4: "IPv4 வரம்பு",
	        cidrv6: "IPv6 வரம்பு",
	        base64: "base64-encoded சரம்",
	        base64url: "base64url-encoded சரம்",
	        json_string: "JSON சரம்",
	        e164: "E.164 எண்",
	        jwt: "JWT",
	        template_literal: "input",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது ${issue.expected}, பெறப்பட்டது ${parsedType(issue.input)}`;
	            case "invalid_value":
	                if (issue.values.length === 1)
	                    return `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது ${util.stringifyPrimitive(issue.values[0])}`;
	                return `தவறான விருப்பம்: எதிர்பார்க்கப்பட்டது ${util.joinValues(issue.values, "|")} இல் ஒன்று`;
	            case "too_big": {
	                const adj = issue.inclusive ? "<=" : "<";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    return `மிக பெரியது: எதிர்பார்க்கப்பட்டது ${issue.origin ?? "மதிப்பு"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "உறுப்புகள்"} ஆக இருக்க வேண்டும்`;
	                }
	                return `மிக பெரியது: எதிர்பார்க்கப்பட்டது ${issue.origin ?? "மதிப்பு"} ${adj}${issue.maximum.toString()} ஆக இருக்க வேண்டும்`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? ">=" : ">";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    return `மிகச் சிறியது: எதிர்பார்க்கப்பட்டது ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit} ஆக இருக்க வேண்டும்`; //
	                }
	                return `மிகச் சிறியது: எதிர்பார்க்கப்பட்டது ${issue.origin} ${adj}${issue.minimum.toString()} ஆக இருக்க வேண்டும்`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with")
	                    return `தவறான சரம்: "${_issue.prefix}" இல் தொடங்க வேண்டும்`;
	                if (_issue.format === "ends_with")
	                    return `தவறான சரம்: "${_issue.suffix}" இல் முடிவடைய வேண்டும்`;
	                if (_issue.format === "includes")
	                    return `தவறான சரம்: "${_issue.includes}" ஐ உள்ளடக்க வேண்டும்`;
	                if (_issue.format === "regex")
	                    return `தவறான சரம்: ${_issue.pattern} முறைபாட்டுடன் பொருந்த வேண்டும்`;
	                return `தவறான ${Nouns[_issue.format] ?? issue.format}`;
	            }
	            case "not_multiple_of":
	                return `தவறான எண்: ${issue.divisor} இன் பலமாக இருக்க வேண்டும்`;
	            case "unrecognized_keys":
	                return `அடையாளம் தெரியாத விசை${issue.keys.length > 1 ? "கள்" : ""}: ${util.joinValues(issue.keys, ", ")}`;
	            case "invalid_key":
	                return `${issue.origin} இல் தவறான விசை`;
	            case "invalid_union":
	                return "தவறான உள்ளீடு";
	            case "invalid_element":
	                return `${issue.origin} இல் தவறான மதிப்பு`;
	            default:
	                return `தவறான உள்ளீடு`;
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	}
	module.exports = exports.default; 
} (ta, ta.exports));

var taExports = ta.exports;

var th = {exports: {}};

(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	const util = __importStar(util$3);
	const error = () => {
	    const Sizable = {
	        string: { unit: "ตัวอักษร", verb: "ควรมี" },
	        file: { unit: "ไบต์", verb: "ควรมี" },
	        array: { unit: "รายการ", verb: "ควรมี" },
	        set: { unit: "รายการ", verb: "ควรมี" },
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    const parsedType = (data) => {
	        const t = typeof data;
	        switch (t) {
	            case "number": {
	                return Number.isNaN(data) ? "ไม่ใช่ตัวเลข (NaN)" : "ตัวเลข";
	            }
	            case "object": {
	                if (Array.isArray(data)) {
	                    return "อาร์เรย์ (Array)";
	                }
	                if (data === null) {
	                    return "ไม่มีค่า (null)";
	                }
	                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
	                    return data.constructor.name;
	                }
	            }
	        }
	        return t;
	    };
	    const Nouns = {
	        regex: "ข้อมูลที่ป้อน",
	        email: "ที่อยู่อีเมล",
	        url: "URL",
	        emoji: "อิโมจิ",
	        uuid: "UUID",
	        uuidv4: "UUIDv4",
	        uuidv6: "UUIDv6",
	        nanoid: "nanoid",
	        guid: "GUID",
	        cuid: "cuid",
	        cuid2: "cuid2",
	        ulid: "ULID",
	        xid: "XID",
	        ksuid: "KSUID",
	        datetime: "วันที่เวลาแบบ ISO",
	        date: "วันที่แบบ ISO",
	        time: "เวลาแบบ ISO",
	        duration: "ช่วงเวลาแบบ ISO",
	        ipv4: "ที่อยู่ IPv4",
	        ipv6: "ที่อยู่ IPv6",
	        cidrv4: "ช่วง IP แบบ IPv4",
	        cidrv6: "ช่วง IP แบบ IPv6",
	        base64: "ข้อความแบบ Base64",
	        base64url: "ข้อความแบบ Base64 สำหรับ URL",
	        json_string: "ข้อความแบบ JSON",
	        e164: "เบอร์โทรศัพท์ระหว่างประเทศ (E.164)",
	        jwt: "โทเคน JWT",
	        template_literal: "ข้อมูลที่ป้อน",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `ประเภทข้อมูลไม่ถูกต้อง: ควรเป็น ${issue.expected} แต่ได้รับ ${parsedType(issue.input)}`;
	            case "invalid_value":
	                if (issue.values.length === 1)
	                    return `ค่าไม่ถูกต้อง: ควรเป็น ${util.stringifyPrimitive(issue.values[0])}`;
	                return `ตัวเลือกไม่ถูกต้อง: ควรเป็นหนึ่งใน ${util.joinValues(issue.values, "|")}`;
	            case "too_big": {
	                const adj = issue.inclusive ? "ไม่เกิน" : "น้อยกว่า";
	                const sizing = getSizing(issue.origin);
	                if (sizing)
	                    return `เกินกำหนด: ${issue.origin ?? "ค่า"} ควรมี${adj} ${issue.maximum.toString()} ${sizing.unit ?? "รายการ"}`;
	                return `เกินกำหนด: ${issue.origin ?? "ค่า"} ควรมี${adj} ${issue.maximum.toString()}`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? "อย่างน้อย" : "มากกว่า";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    return `น้อยกว่ากำหนด: ${issue.origin} ควรมี${adj} ${issue.minimum.toString()} ${sizing.unit}`;
	                }
	                return `น้อยกว่ากำหนด: ${issue.origin} ควรมี${adj} ${issue.minimum.toString()}`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with") {
	                    return `รูปแบบไม่ถูกต้อง: ข้อความต้องขึ้นต้นด้วย "${_issue.prefix}"`;
	                }
	                if (_issue.format === "ends_with")
	                    return `รูปแบบไม่ถูกต้อง: ข้อความต้องลงท้ายด้วย "${_issue.suffix}"`;
	                if (_issue.format === "includes")
	                    return `รูปแบบไม่ถูกต้อง: ข้อความต้องมี "${_issue.includes}" อยู่ในข้อความ`;
	                if (_issue.format === "regex")
	                    return `รูปแบบไม่ถูกต้อง: ต้องตรงกับรูปแบบที่กำหนด ${_issue.pattern}`;
	                return `รูปแบบไม่ถูกต้อง: ${Nouns[_issue.format] ?? issue.format}`;
	            }
	            case "not_multiple_of":
	                return `ตัวเลขไม่ถูกต้อง: ต้องเป็นจำนวนที่หารด้วย ${issue.divisor} ได้ลงตัว`;
	            case "unrecognized_keys":
	                return `พบคีย์ที่ไม่รู้จัก: ${util.joinValues(issue.keys, ", ")}`;
	            case "invalid_key":
	                return `คีย์ไม่ถูกต้องใน ${issue.origin}`;
	            case "invalid_union":
	                return "ข้อมูลไม่ถูกต้อง: ไม่ตรงกับรูปแบบยูเนียนที่กำหนดไว้";
	            case "invalid_element":
	                return `ข้อมูลไม่ถูกต้องใน ${issue.origin}`;
	            default:
	                return `ข้อมูลไม่ถูกต้อง`;
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	}
	module.exports = exports.default; 
} (th, th.exports));

var thExports = th.exports;

var tr = {};

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parsedType = void 0;
	exports.default = default_1;
	const util = __importStar(util$3);
	const parsedType = (data) => {
	    const t = typeof data;
	    switch (t) {
	        case "number": {
	            return Number.isNaN(data) ? "NaN" : "number";
	        }
	        case "object": {
	            if (Array.isArray(data)) {
	                return "array";
	            }
	            if (data === null) {
	                return "null";
	            }
	            if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
	                return data.constructor.name;
	            }
	        }
	    }
	    return t;
	};
	exports.parsedType = parsedType;
	const error = () => {
	    const Sizable = {
	        string: { unit: "karakter", verb: "olmalı" },
	        file: { unit: "bayt", verb: "olmalı" },
	        array: { unit: "öğe", verb: "olmalı" },
	        set: { unit: "öğe", verb: "olmalı" },
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    const Nouns = {
	        regex: "girdi",
	        email: "e-posta adresi",
	        url: "URL",
	        emoji: "emoji",
	        uuid: "UUID",
	        uuidv4: "UUIDv4",
	        uuidv6: "UUIDv6",
	        nanoid: "nanoid",
	        guid: "GUID",
	        cuid: "cuid",
	        cuid2: "cuid2",
	        ulid: "ULID",
	        xid: "XID",
	        ksuid: "KSUID",
	        datetime: "ISO tarih ve saat",
	        date: "ISO tarih",
	        time: "ISO saat",
	        duration: "ISO süre",
	        ipv4: "IPv4 adresi",
	        ipv6: "IPv6 adresi",
	        cidrv4: "IPv4 aralığı",
	        cidrv6: "IPv6 aralığı",
	        base64: "base64 ile şifrelenmiş metin",
	        base64url: "base64url ile şifrelenmiş metin",
	        json_string: "JSON dizesi",
	        e164: "E.164 sayısı",
	        jwt: "JWT",
	        template_literal: "Şablon dizesi",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `Geçersiz değer: beklenen ${issue.expected}, alınan ${(0, exports.parsedType)(issue.input)}`;
	            case "invalid_value":
	                if (issue.values.length === 1)
	                    return `Geçersiz değer: beklenen ${util.stringifyPrimitive(issue.values[0])}`;
	                return `Geçersiz seçenek: aşağıdakilerden biri olmalı: ${util.joinValues(issue.values, "|")}`;
	            case "too_big": {
	                const adj = issue.inclusive ? "<=" : "<";
	                const sizing = getSizing(issue.origin);
	                if (sizing)
	                    return `Çok büyük: beklenen ${issue.origin ?? "değer"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "öğe"}`;
	                return `Çok büyük: beklenen ${issue.origin ?? "değer"} ${adj}${issue.maximum.toString()}`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? ">=" : ">";
	                const sizing = getSizing(issue.origin);
	                if (sizing)
	                    return `Çok küçük: beklenen ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
	                return `Çok küçük: beklenen ${issue.origin} ${adj}${issue.minimum.toString()}`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with")
	                    return `Geçersiz metin: "${_issue.prefix}" ile başlamalı`;
	                if (_issue.format === "ends_with")
	                    return `Geçersiz metin: "${_issue.suffix}" ile bitmeli`;
	                if (_issue.format === "includes")
	                    return `Geçersiz metin: "${_issue.includes}" içermeli`;
	                if (_issue.format === "regex")
	                    return `Geçersiz metin: ${_issue.pattern} desenine uymalı`;
	                return `Geçersiz ${Nouns[_issue.format] ?? issue.format}`;
	            }
	            case "not_multiple_of":
	                return `Geçersiz sayı: ${issue.divisor} ile tam bölünebilmeli`;
	            case "unrecognized_keys":
	                return `Tanınmayan anahtar${issue.keys.length > 1 ? "lar" : ""}: ${util.joinValues(issue.keys, ", ")}`;
	            case "invalid_key":
	                return `${issue.origin} içinde geçersiz anahtar`;
	            case "invalid_union":
	                return "Geçersiz değer";
	            case "invalid_element":
	                return `${issue.origin} içinde geçersiz değer`;
	            default:
	                return `Geçersiz değer`;
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	} 
} (tr));

var ua = {exports: {}};

(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	const util = __importStar(util$3);
	const error = () => {
	    const Sizable = {
	        string: { unit: "символів", verb: "матиме" },
	        file: { unit: "байтів", verb: "матиме" },
	        array: { unit: "елементів", verb: "матиме" },
	        set: { unit: "елементів", verb: "матиме" },
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    const parsedType = (data) => {
	        const t = typeof data;
	        switch (t) {
	            case "number": {
	                return Number.isNaN(data) ? "NaN" : "число";
	            }
	            case "object": {
	                if (Array.isArray(data)) {
	                    return "масив";
	                }
	                if (data === null) {
	                    return "null";
	                }
	                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
	                    return data.constructor.name;
	                }
	            }
	        }
	        return t;
	    };
	    const Nouns = {
	        regex: "вхідні дані",
	        email: "адреса електронної пошти",
	        url: "URL",
	        emoji: "емодзі",
	        uuid: "UUID",
	        uuidv4: "UUIDv4",
	        uuidv6: "UUIDv6",
	        nanoid: "nanoid",
	        guid: "GUID",
	        cuid: "cuid",
	        cuid2: "cuid2",
	        ulid: "ULID",
	        xid: "XID",
	        ksuid: "KSUID",
	        datetime: "дата та час ISO",
	        date: "дата ISO",
	        time: "час ISO",
	        duration: "тривалість ISO",
	        ipv4: "адреса IPv4",
	        ipv6: "адреса IPv6",
	        cidrv4: "діапазон IPv4",
	        cidrv6: "діапазон IPv6",
	        base64: "рядок у кодуванні base64",
	        base64url: "рядок у кодуванні base64url",
	        json_string: "рядок JSON",
	        e164: "номер E.164",
	        jwt: "JWT",
	        template_literal: "вхідні дані",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `Неправильні вхідні дані: очікується ${issue.expected}, отримано ${parsedType(issue.input)}`;
	            // return `Неправильні вхідні дані: очікується ${issue.expected}, отримано ${util.getParsedType(issue.input)}`;
	            case "invalid_value":
	                if (issue.values.length === 1)
	                    return `Неправильні вхідні дані: очікується ${util.stringifyPrimitive(issue.values[0])}`;
	                return `Неправильна опція: очікується одне з ${util.joinValues(issue.values, "|")}`;
	            case "too_big": {
	                const adj = issue.inclusive ? "<=" : "<";
	                const sizing = getSizing(issue.origin);
	                if (sizing)
	                    return `Занадто велике: очікується, що ${issue.origin ?? "значення"} ${sizing.verb} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "елементів"}`;
	                return `Занадто велике: очікується, що ${issue.origin ?? "значення"} буде ${adj}${issue.maximum.toString()}`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? ">=" : ">";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    return `Занадто мале: очікується, що ${issue.origin} ${sizing.verb} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
	                }
	                return `Занадто мале: очікується, що ${issue.origin} буде ${adj}${issue.minimum.toString()}`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with")
	                    return `Неправильний рядок: повинен починатися з "${_issue.prefix}"`;
	                if (_issue.format === "ends_with")
	                    return `Неправильний рядок: повинен закінчуватися на "${_issue.suffix}"`;
	                if (_issue.format === "includes")
	                    return `Неправильний рядок: повинен містити "${_issue.includes}"`;
	                if (_issue.format === "regex")
	                    return `Неправильний рядок: повинен відповідати шаблону ${_issue.pattern}`;
	                return `Неправильний ${Nouns[_issue.format] ?? issue.format}`;
	            }
	            case "not_multiple_of":
	                return `Неправильне число: повинно бути кратним ${issue.divisor}`;
	            case "unrecognized_keys":
	                return `Нерозпізнаний ключ${issue.keys.length > 1 ? "і" : ""}: ${util.joinValues(issue.keys, ", ")}`;
	            case "invalid_key":
	                return `Неправильний ключ у ${issue.origin}`;
	            case "invalid_union":
	                return "Неправильні вхідні дані";
	            case "invalid_element":
	                return `Неправильне значення у ${issue.origin}`;
	            default:
	                return `Неправильні вхідні дані`;
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	}
	module.exports = exports.default; 
} (ua, ua.exports));

var uaExports = ua.exports;

var ur = {exports: {}};

(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	const util = __importStar(util$3);
	const error = () => {
	    const Sizable = {
	        string: { unit: "حروف", verb: "ہونا" },
	        file: { unit: "بائٹس", verb: "ہونا" },
	        array: { unit: "آئٹمز", verb: "ہونا" },
	        set: { unit: "آئٹمز", verb: "ہونا" },
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    const parsedType = (data) => {
	        const t = typeof data;
	        switch (t) {
	            case "number": {
	                return Number.isNaN(data) ? "NaN" : "نمبر";
	            }
	            case "object": {
	                if (Array.isArray(data)) {
	                    return "آرے";
	                }
	                if (data === null) {
	                    return "نل";
	                }
	                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
	                    return data.constructor.name;
	                }
	            }
	        }
	        return t;
	    };
	    const Nouns = {
	        regex: "ان پٹ",
	        email: "ای میل ایڈریس",
	        url: "یو آر ایل",
	        emoji: "ایموجی",
	        uuid: "یو یو آئی ڈی",
	        uuidv4: "یو یو آئی ڈی وی 4",
	        uuidv6: "یو یو آئی ڈی وی 6",
	        nanoid: "نینو آئی ڈی",
	        guid: "جی یو آئی ڈی",
	        cuid: "سی یو آئی ڈی",
	        cuid2: "سی یو آئی ڈی 2",
	        ulid: "یو ایل آئی ڈی",
	        xid: "ایکس آئی ڈی",
	        ksuid: "کے ایس یو آئی ڈی",
	        datetime: "آئی ایس او ڈیٹ ٹائم",
	        date: "آئی ایس او تاریخ",
	        time: "آئی ایس او وقت",
	        duration: "آئی ایس او مدت",
	        ipv4: "آئی پی وی 4 ایڈریس",
	        ipv6: "آئی پی وی 6 ایڈریس",
	        cidrv4: "آئی پی وی 4 رینج",
	        cidrv6: "آئی پی وی 6 رینج",
	        base64: "بیس 64 ان کوڈڈ سٹرنگ",
	        base64url: "بیس 64 یو آر ایل ان کوڈڈ سٹرنگ",
	        json_string: "جے ایس او این سٹرنگ",
	        e164: "ای 164 نمبر",
	        jwt: "جے ڈبلیو ٹی",
	        template_literal: "ان پٹ",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `غلط ان پٹ: ${issue.expected} متوقع تھا، ${parsedType(issue.input)} موصول ہوا`;
	            case "invalid_value":
	                if (issue.values.length === 1)
	                    return `غلط ان پٹ: ${util.stringifyPrimitive(issue.values[0])} متوقع تھا`;
	                return `غلط آپشن: ${util.joinValues(issue.values, "|")} میں سے ایک متوقع تھا`;
	            case "too_big": {
	                const adj = issue.inclusive ? "<=" : "<";
	                const sizing = getSizing(issue.origin);
	                if (sizing)
	                    return `بہت بڑا: ${issue.origin ?? "ویلیو"} کے ${adj}${issue.maximum.toString()} ${sizing.unit ?? "عناصر"} ہونے متوقع تھے`;
	                return `بہت بڑا: ${issue.origin ?? "ویلیو"} کا ${adj}${issue.maximum.toString()} ہونا متوقع تھا`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? ">=" : ">";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    return `بہت چھوٹا: ${issue.origin} کے ${adj}${issue.minimum.toString()} ${sizing.unit} ہونے متوقع تھے`;
	                }
	                return `بہت چھوٹا: ${issue.origin} کا ${adj}${issue.minimum.toString()} ہونا متوقع تھا`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with") {
	                    return `غلط سٹرنگ: "${_issue.prefix}" سے شروع ہونا چاہیے`;
	                }
	                if (_issue.format === "ends_with")
	                    return `غلط سٹرنگ: "${_issue.suffix}" پر ختم ہونا چاہیے`;
	                if (_issue.format === "includes")
	                    return `غلط سٹرنگ: "${_issue.includes}" شامل ہونا چاہیے`;
	                if (_issue.format === "regex")
	                    return `غلط سٹرنگ: پیٹرن ${_issue.pattern} سے میچ ہونا چاہیے`;
	                return `غلط ${Nouns[_issue.format] ?? issue.format}`;
	            }
	            case "not_multiple_of":
	                return `غلط نمبر: ${issue.divisor} کا مضاعف ہونا چاہیے`;
	            case "unrecognized_keys":
	                return `غیر تسلیم شدہ کی${issue.keys.length > 1 ? "ز" : ""}: ${util.joinValues(issue.keys, "، ")}`;
	            case "invalid_key":
	                return `${issue.origin} میں غلط کی`;
	            case "invalid_union":
	                return "غلط ان پٹ";
	            case "invalid_element":
	                return `${issue.origin} میں غلط ویلیو`;
	            default:
	                return `غلط ان پٹ`;
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	}
	module.exports = exports.default; 
} (ur, ur.exports));

var urExports = ur.exports;

var vi = {exports: {}};

(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	const util = __importStar(util$3);
	const error = () => {
	    const Sizable = {
	        string: { unit: "ký tự", verb: "có" },
	        file: { unit: "byte", verb: "có" },
	        array: { unit: "phần tử", verb: "có" },
	        set: { unit: "phần tử", verb: "có" },
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    const parsedType = (data) => {
	        const t = typeof data;
	        switch (t) {
	            case "number": {
	                return Number.isNaN(data) ? "NaN" : "số";
	            }
	            case "object": {
	                if (Array.isArray(data)) {
	                    return "mảng";
	                }
	                if (data === null) {
	                    return "null";
	                }
	                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
	                    return data.constructor.name;
	                }
	            }
	        }
	        return t;
	    };
	    const Nouns = {
	        regex: "đầu vào",
	        email: "địa chỉ email",
	        url: "URL",
	        emoji: "emoji",
	        uuid: "UUID",
	        uuidv4: "UUIDv4",
	        uuidv6: "UUIDv6",
	        nanoid: "nanoid",
	        guid: "GUID",
	        cuid: "cuid",
	        cuid2: "cuid2",
	        ulid: "ULID",
	        xid: "XID",
	        ksuid: "KSUID",
	        datetime: "ngày giờ ISO",
	        date: "ngày ISO",
	        time: "giờ ISO",
	        duration: "khoảng thời gian ISO",
	        ipv4: "địa chỉ IPv4",
	        ipv6: "địa chỉ IPv6",
	        cidrv4: "dải IPv4",
	        cidrv6: "dải IPv6",
	        base64: "chuỗi mã hóa base64",
	        base64url: "chuỗi mã hóa base64url",
	        json_string: "chuỗi JSON",
	        e164: "số E.164",
	        jwt: "JWT",
	        template_literal: "đầu vào",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `Đầu vào không hợp lệ: mong đợi ${issue.expected}, nhận được ${parsedType(issue.input)}`;
	            case "invalid_value":
	                if (issue.values.length === 1)
	                    return `Đầu vào không hợp lệ: mong đợi ${util.stringifyPrimitive(issue.values[0])}`;
	                return `Tùy chọn không hợp lệ: mong đợi một trong các giá trị ${util.joinValues(issue.values, "|")}`;
	            case "too_big": {
	                const adj = issue.inclusive ? "<=" : "<";
	                const sizing = getSizing(issue.origin);
	                if (sizing)
	                    return `Quá lớn: mong đợi ${issue.origin ?? "giá trị"} ${sizing.verb} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "phần tử"}`;
	                return `Quá lớn: mong đợi ${issue.origin ?? "giá trị"} ${adj}${issue.maximum.toString()}`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? ">=" : ">";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    return `Quá nhỏ: mong đợi ${issue.origin} ${sizing.verb} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
	                }
	                return `Quá nhỏ: mong đợi ${issue.origin} ${adj}${issue.minimum.toString()}`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with")
	                    return `Chuỗi không hợp lệ: phải bắt đầu bằng "${_issue.prefix}"`;
	                if (_issue.format === "ends_with")
	                    return `Chuỗi không hợp lệ: phải kết thúc bằng "${_issue.suffix}"`;
	                if (_issue.format === "includes")
	                    return `Chuỗi không hợp lệ: phải bao gồm "${_issue.includes}"`;
	                if (_issue.format === "regex")
	                    return `Chuỗi không hợp lệ: phải khớp với mẫu ${_issue.pattern}`;
	                return `${Nouns[_issue.format] ?? issue.format} không hợp lệ`;
	            }
	            case "not_multiple_of":
	                return `Số không hợp lệ: phải là bội số của ${issue.divisor}`;
	            case "unrecognized_keys":
	                return `Khóa không được nhận dạng: ${util.joinValues(issue.keys, ", ")}`;
	            case "invalid_key":
	                return `Khóa không hợp lệ trong ${issue.origin}`;
	            case "invalid_union":
	                return "Đầu vào không hợp lệ";
	            case "invalid_element":
	                return `Giá trị không hợp lệ trong ${issue.origin}`;
	            default:
	                return `Đầu vào không hợp lệ`;
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	}
	module.exports = exports.default; 
} (vi, vi.exports));

var viExports = vi.exports;

var zhCN = {exports: {}};

(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	const util = __importStar(util$3);
	const error = () => {
	    const Sizable = {
	        string: { unit: "字符", verb: "包含" },
	        file: { unit: "字节", verb: "包含" },
	        array: { unit: "项", verb: "包含" },
	        set: { unit: "项", verb: "包含" },
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    const parsedType = (data) => {
	        const t = typeof data;
	        switch (t) {
	            case "number": {
	                return Number.isNaN(data) ? "非数字(NaN)" : "数字";
	            }
	            case "object": {
	                if (Array.isArray(data)) {
	                    return "数组";
	                }
	                if (data === null) {
	                    return "空值(null)";
	                }
	                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
	                    return data.constructor.name;
	                }
	            }
	        }
	        return t;
	    };
	    const Nouns = {
	        regex: "输入",
	        email: "电子邮件",
	        url: "URL",
	        emoji: "表情符号",
	        uuid: "UUID",
	        uuidv4: "UUIDv4",
	        uuidv6: "UUIDv6",
	        nanoid: "nanoid",
	        guid: "GUID",
	        cuid: "cuid",
	        cuid2: "cuid2",
	        ulid: "ULID",
	        xid: "XID",
	        ksuid: "KSUID",
	        datetime: "ISO日期时间",
	        date: "ISO日期",
	        time: "ISO时间",
	        duration: "ISO时长",
	        ipv4: "IPv4地址",
	        ipv6: "IPv6地址",
	        cidrv4: "IPv4网段",
	        cidrv6: "IPv6网段",
	        base64: "base64编码字符串",
	        base64url: "base64url编码字符串",
	        json_string: "JSON字符串",
	        e164: "E.164号码",
	        jwt: "JWT",
	        template_literal: "输入",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `无效输入：期望 ${issue.expected}，实际接收 ${parsedType(issue.input)}`;
	            case "invalid_value":
	                if (issue.values.length === 1)
	                    return `无效输入：期望 ${util.stringifyPrimitive(issue.values[0])}`;
	                return `无效选项：期望以下之一 ${util.joinValues(issue.values, "|")}`;
	            case "too_big": {
	                const adj = issue.inclusive ? "<=" : "<";
	                const sizing = getSizing(issue.origin);
	                if (sizing)
	                    return `数值过大：期望 ${issue.origin ?? "值"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "个元素"}`;
	                return `数值过大：期望 ${issue.origin ?? "值"} ${adj}${issue.maximum.toString()}`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? ">=" : ">";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    return `数值过小：期望 ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
	                }
	                return `数值过小：期望 ${issue.origin} ${adj}${issue.minimum.toString()}`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with")
	                    return `无效字符串：必须以 "${_issue.prefix}" 开头`;
	                if (_issue.format === "ends_with")
	                    return `无效字符串：必须以 "${_issue.suffix}" 结尾`;
	                if (_issue.format === "includes")
	                    return `无效字符串：必须包含 "${_issue.includes}"`;
	                if (_issue.format === "regex")
	                    return `无效字符串：必须满足正则表达式 ${_issue.pattern}`;
	                return `无效${Nouns[_issue.format] ?? issue.format}`;
	            }
	            case "not_multiple_of":
	                return `无效数字：必须是 ${issue.divisor} 的倍数`;
	            case "unrecognized_keys":
	                return `出现未知的键(key): ${util.joinValues(issue.keys, ", ")}`;
	            case "invalid_key":
	                return `${issue.origin} 中的键(key)无效`;
	            case "invalid_union":
	                return "无效输入";
	            case "invalid_element":
	                return `${issue.origin} 中包含无效值(value)`;
	            default:
	                return `无效输入`;
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	}
	module.exports = exports.default; 
} (zhCN, zhCN.exports));

var zhCNExports = zhCN.exports;

var zhTW = {exports: {}};

(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	const util = __importStar(util$3);
	const error = () => {
	    const Sizable = {
	        string: { unit: "字元", verb: "擁有" },
	        file: { unit: "位元組", verb: "擁有" },
	        array: { unit: "項目", verb: "擁有" },
	        set: { unit: "項目", verb: "擁有" },
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    const parsedType = (data) => {
	        const t = typeof data;
	        switch (t) {
	            case "number": {
	                return Number.isNaN(data) ? "NaN" : "number";
	            }
	            case "object": {
	                if (Array.isArray(data)) {
	                    return "array";
	                }
	                if (data === null) {
	                    return "null";
	                }
	                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
	                    return data.constructor.name;
	                }
	            }
	        }
	        return t;
	    };
	    const Nouns = {
	        regex: "輸入",
	        email: "郵件地址",
	        url: "URL",
	        emoji: "emoji",
	        uuid: "UUID",
	        uuidv4: "UUIDv4",
	        uuidv6: "UUIDv6",
	        nanoid: "nanoid",
	        guid: "GUID",
	        cuid: "cuid",
	        cuid2: "cuid2",
	        ulid: "ULID",
	        xid: "XID",
	        ksuid: "KSUID",
	        datetime: "ISO 日期時間",
	        date: "ISO 日期",
	        time: "ISO 時間",
	        duration: "ISO 期間",
	        ipv4: "IPv4 位址",
	        ipv6: "IPv6 位址",
	        cidrv4: "IPv4 範圍",
	        cidrv6: "IPv6 範圍",
	        base64: "base64 編碼字串",
	        base64url: "base64url 編碼字串",
	        json_string: "JSON 字串",
	        e164: "E.164 數值",
	        jwt: "JWT",
	        template_literal: "輸入",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `無效的輸入值：預期為 ${issue.expected}，但收到 ${parsedType(issue.input)}`;
	            case "invalid_value":
	                if (issue.values.length === 1)
	                    return `無效的輸入值：預期為 ${util.stringifyPrimitive(issue.values[0])}`;
	                return `無效的選項：預期為以下其中之一 ${util.joinValues(issue.values, "|")}`;
	            case "too_big": {
	                const adj = issue.inclusive ? "<=" : "<";
	                const sizing = getSizing(issue.origin);
	                if (sizing)
	                    return `數值過大：預期 ${issue.origin ?? "值"} 應為 ${adj}${issue.maximum.toString()} ${sizing.unit ?? "個元素"}`;
	                return `數值過大：預期 ${issue.origin ?? "值"} 應為 ${adj}${issue.maximum.toString()}`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? ">=" : ">";
	                const sizing = getSizing(issue.origin);
	                if (sizing) {
	                    return `數值過小：預期 ${issue.origin} 應為 ${adj}${issue.minimum.toString()} ${sizing.unit}`;
	                }
	                return `數值過小：預期 ${issue.origin} 應為 ${adj}${issue.minimum.toString()}`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with") {
	                    return `無效的字串：必須以 "${_issue.prefix}" 開頭`;
	                }
	                if (_issue.format === "ends_with")
	                    return `無效的字串：必須以 "${_issue.suffix}" 結尾`;
	                if (_issue.format === "includes")
	                    return `無效的字串：必須包含 "${_issue.includes}"`;
	                if (_issue.format === "regex")
	                    return `無效的字串：必須符合格式 ${_issue.pattern}`;
	                return `無效的 ${Nouns[_issue.format] ?? issue.format}`;
	            }
	            case "not_multiple_of":
	                return `無效的數字：必須為 ${issue.divisor} 的倍數`;
	            case "unrecognized_keys":
	                return `無法識別的鍵值${issue.keys.length > 1 ? "們" : ""}：${util.joinValues(issue.keys, "、")}`;
	            case "invalid_key":
	                return `${issue.origin} 中有無效的鍵值`;
	            case "invalid_union":
	                return "無效的輸入值";
	            case "invalid_element":
	                return `${issue.origin} 中有無效的值`;
	            default:
	                return `無效的輸入值`;
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	}
	module.exports = exports.default; 
} (zhTW, zhTW.exports));

var zhTWExports = zhTW.exports;

var yo = {exports: {}};

(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	const util = __importStar(util$3);
	const error = () => {
	    const Sizable = {
	        string: { unit: "àmi", verb: "ní" },
	        file: { unit: "bytes", verb: "ní" },
	        array: { unit: "nkan", verb: "ní" },
	        set: { unit: "nkan", verb: "ní" },
	    };
	    function getSizing(origin) {
	        return Sizable[origin] ?? null;
	    }
	    const parsedType = (data) => {
	        const t = typeof data;
	        switch (t) {
	            case "number": {
	                return Number.isNaN(data) ? "NaN" : "nọ́mbà";
	            }
	            case "object": {
	                if (Array.isArray(data)) {
	                    return "akopọ";
	                }
	                if (data === null) {
	                    return "null";
	                }
	                if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
	                    return data.constructor.name;
	                }
	            }
	        }
	        return t;
	    };
	    const Nouns = {
	        regex: "ẹ̀rọ ìbáwọlé",
	        email: "àdírẹ́sì ìmẹ́lì",
	        url: "URL",
	        emoji: "emoji",
	        uuid: "UUID",
	        uuidv4: "UUIDv4",
	        uuidv6: "UUIDv6",
	        nanoid: "nanoid",
	        guid: "GUID",
	        cuid: "cuid",
	        cuid2: "cuid2",
	        ulid: "ULID",
	        xid: "XID",
	        ksuid: "KSUID",
	        datetime: "àkókò ISO",
	        date: "ọjọ́ ISO",
	        time: "àkókò ISO",
	        duration: "àkókò tó pé ISO",
	        ipv4: "àdírẹ́sì IPv4",
	        ipv6: "àdírẹ́sì IPv6",
	        cidrv4: "àgbègbè IPv4",
	        cidrv6: "àgbègbè IPv6",
	        base64: "ọ̀rọ̀ tí a kọ́ ní base64",
	        base64url: "ọ̀rọ̀ base64url",
	        json_string: "ọ̀rọ̀ JSON",
	        e164: "nọ́mbà E.164",
	        jwt: "JWT",
	        template_literal: "ẹ̀rọ ìbáwọlé",
	    };
	    return (issue) => {
	        switch (issue.code) {
	            case "invalid_type":
	                return `Ìbáwọlé aṣìṣe: a ní láti fi ${issue.expected}, àmọ̀ a rí ${parsedType(issue.input)}`;
	            case "invalid_value":
	                if (issue.values.length === 1)
	                    return `Ìbáwọlé aṣìṣe: a ní láti fi ${util.stringifyPrimitive(issue.values[0])}`;
	                return `Àṣàyàn aṣìṣe: yan ọ̀kan lára ${util.joinValues(issue.values, "|")}`;
	            case "too_big": {
	                const adj = issue.inclusive ? "<=" : "<";
	                const sizing = getSizing(issue.origin);
	                if (sizing)
	                    return `Tó pọ̀ jù: a ní láti jẹ́ pé ${issue.origin ?? "iye"} ${sizing.verb} ${adj}${issue.maximum} ${sizing.unit}`;
	                return `Tó pọ̀ jù: a ní láti jẹ́ ${adj}${issue.maximum}`;
	            }
	            case "too_small": {
	                const adj = issue.inclusive ? ">=" : ">";
	                const sizing = getSizing(issue.origin);
	                if (sizing)
	                    return `Kéré ju: a ní láti jẹ́ pé ${issue.origin} ${sizing.verb} ${adj}${issue.minimum} ${sizing.unit}`;
	                return `Kéré ju: a ní láti jẹ́ ${adj}${issue.minimum}`;
	            }
	            case "invalid_format": {
	                const _issue = issue;
	                if (_issue.format === "starts_with")
	                    return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ bẹ̀rẹ̀ pẹ̀lú "${_issue.prefix}"`;
	                if (_issue.format === "ends_with")
	                    return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ parí pẹ̀lú "${_issue.suffix}"`;
	                if (_issue.format === "includes")
	                    return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ ní "${_issue.includes}"`;
	                if (_issue.format === "regex")
	                    return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ bá àpẹẹrẹ mu ${_issue.pattern}`;
	                return `Aṣìṣe: ${Nouns[_issue.format] ?? issue.format}`;
	            }
	            case "not_multiple_of":
	                return `Nọ́mbà aṣìṣe: gbọ́dọ̀ jẹ́ èyà pípín ti ${issue.divisor}`;
	            case "unrecognized_keys":
	                return `Bọtìnì àìmọ̀: ${util.joinValues(issue.keys, ", ")}`;
	            case "invalid_key":
	                return `Bọtìnì aṣìṣe nínú ${issue.origin}`;
	            case "invalid_union":
	                return "Ìbáwọlé aṣìṣe";
	            case "invalid_element":
	                return `Iye aṣìṣe nínú ${issue.origin}`;
	            default:
	                return "Ìbáwọlé aṣìṣe";
	        }
	    };
	};
	function default_1() {
	    return {
	        localeError: error(),
	    };
	}
	module.exports = exports.default; 
} (yo, yo.exports));

var yoExports = yo.exports;

(function (exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.yo = exports.zhTW = exports.zhCN = exports.vi = exports.ur = exports.ua = exports.tr = exports.th = exports.ta = exports.sv = exports.sl = exports.ru = exports.pt = exports.pl = exports.ps = exports.ota = exports.no = exports.nl = exports.ms = exports.mk = exports.ko = exports.kh = exports.ja = exports.it = exports.is = exports.id = exports.hu = exports.he = exports.frCA = exports.fr = exports.fi = exports.fa = exports.es = exports.eo = exports.en = exports.de = exports.da = exports.cs = exports.ca = exports.be = exports.az = exports.ar = void 0;
	var ar_js_1 = arExports;
	Object.defineProperty(exports, "ar", { enumerable: true, get: function () { return __importDefault(ar_js_1).default; } });
	var az_js_1 = azExports;
	Object.defineProperty(exports, "az", { enumerable: true, get: function () { return __importDefault(az_js_1).default; } });
	var be_js_1 = beExports;
	Object.defineProperty(exports, "be", { enumerable: true, get: function () { return __importDefault(be_js_1).default; } });
	var ca_js_1 = caExports;
	Object.defineProperty(exports, "ca", { enumerable: true, get: function () { return __importDefault(ca_js_1).default; } });
	var cs_js_1 = csExports;
	Object.defineProperty(exports, "cs", { enumerable: true, get: function () { return __importDefault(cs_js_1).default; } });
	var da_js_1 = daExports;
	Object.defineProperty(exports, "da", { enumerable: true, get: function () { return __importDefault(da_js_1).default; } });
	var de_js_1 = deExports;
	Object.defineProperty(exports, "de", { enumerable: true, get: function () { return __importDefault(de_js_1).default; } });
	var en_js_1 = en;
	Object.defineProperty(exports, "en", { enumerable: true, get: function () { return __importDefault(en_js_1).default; } });
	var eo_js_1 = eo;
	Object.defineProperty(exports, "eo", { enumerable: true, get: function () { return __importDefault(eo_js_1).default; } });
	var es_js_1 = esExports;
	Object.defineProperty(exports, "es", { enumerable: true, get: function () { return __importDefault(es_js_1).default; } });
	var fa_js_1 = faExports;
	Object.defineProperty(exports, "fa", { enumerable: true, get: function () { return __importDefault(fa_js_1).default; } });
	var fi_js_1 = fiExports;
	Object.defineProperty(exports, "fi", { enumerable: true, get: function () { return __importDefault(fi_js_1).default; } });
	var fr_js_1 = frExports;
	Object.defineProperty(exports, "fr", { enumerable: true, get: function () { return __importDefault(fr_js_1).default; } });
	var fr_CA_js_1 = frCAExports;
	Object.defineProperty(exports, "frCA", { enumerable: true, get: function () { return __importDefault(fr_CA_js_1).default; } });
	var he_js_1 = heExports;
	Object.defineProperty(exports, "he", { enumerable: true, get: function () { return __importDefault(he_js_1).default; } });
	var hu_js_1 = huExports;
	Object.defineProperty(exports, "hu", { enumerable: true, get: function () { return __importDefault(hu_js_1).default; } });
	var id_js_1 = idExports;
	Object.defineProperty(exports, "id", { enumerable: true, get: function () { return __importDefault(id_js_1).default; } });
	var is_js_1 = is;
	Object.defineProperty(exports, "is", { enumerable: true, get: function () { return __importDefault(is_js_1).default; } });
	var it_js_1 = itExports;
	Object.defineProperty(exports, "it", { enumerable: true, get: function () { return __importDefault(it_js_1).default; } });
	var ja_js_1 = jaExports;
	Object.defineProperty(exports, "ja", { enumerable: true, get: function () { return __importDefault(ja_js_1).default; } });
	var kh_js_1 = khExports;
	Object.defineProperty(exports, "kh", { enumerable: true, get: function () { return __importDefault(kh_js_1).default; } });
	var ko_js_1 = koExports;
	Object.defineProperty(exports, "ko", { enumerable: true, get: function () { return __importDefault(ko_js_1).default; } });
	var mk_js_1 = mkExports;
	Object.defineProperty(exports, "mk", { enumerable: true, get: function () { return __importDefault(mk_js_1).default; } });
	var ms_js_1 = msExports;
	Object.defineProperty(exports, "ms", { enumerable: true, get: function () { return __importDefault(ms_js_1).default; } });
	var nl_js_1 = nlExports;
	Object.defineProperty(exports, "nl", { enumerable: true, get: function () { return __importDefault(nl_js_1).default; } });
	var no_js_1 = noExports;
	Object.defineProperty(exports, "no", { enumerable: true, get: function () { return __importDefault(no_js_1).default; } });
	var ota_js_1 = otaExports;
	Object.defineProperty(exports, "ota", { enumerable: true, get: function () { return __importDefault(ota_js_1).default; } });
	var ps_js_1 = psExports;
	Object.defineProperty(exports, "ps", { enumerable: true, get: function () { return __importDefault(ps_js_1).default; } });
	var pl_js_1 = plExports;
	Object.defineProperty(exports, "pl", { enumerable: true, get: function () { return __importDefault(pl_js_1).default; } });
	var pt_js_1 = ptExports;
	Object.defineProperty(exports, "pt", { enumerable: true, get: function () { return __importDefault(pt_js_1).default; } });
	var ru_js_1 = ruExports;
	Object.defineProperty(exports, "ru", { enumerable: true, get: function () { return __importDefault(ru_js_1).default; } });
	var sl_js_1 = slExports;
	Object.defineProperty(exports, "sl", { enumerable: true, get: function () { return __importDefault(sl_js_1).default; } });
	var sv_js_1 = svExports;
	Object.defineProperty(exports, "sv", { enumerable: true, get: function () { return __importDefault(sv_js_1).default; } });
	var ta_js_1 = taExports;
	Object.defineProperty(exports, "ta", { enumerable: true, get: function () { return __importDefault(ta_js_1).default; } });
	var th_js_1 = thExports;
	Object.defineProperty(exports, "th", { enumerable: true, get: function () { return __importDefault(th_js_1).default; } });
	var tr_js_1 = tr;
	Object.defineProperty(exports, "tr", { enumerable: true, get: function () { return __importDefault(tr_js_1).default; } });
	var ua_js_1 = uaExports;
	Object.defineProperty(exports, "ua", { enumerable: true, get: function () { return __importDefault(ua_js_1).default; } });
	var ur_js_1 = urExports;
	Object.defineProperty(exports, "ur", { enumerable: true, get: function () { return __importDefault(ur_js_1).default; } });
	var vi_js_1 = viExports;
	Object.defineProperty(exports, "vi", { enumerable: true, get: function () { return __importDefault(vi_js_1).default; } });
	var zh_CN_js_1 = zhCNExports;
	Object.defineProperty(exports, "zhCN", { enumerable: true, get: function () { return __importDefault(zh_CN_js_1).default; } });
	var zh_TW_js_1 = zhTWExports;
	Object.defineProperty(exports, "zhTW", { enumerable: true, get: function () { return __importDefault(zh_TW_js_1).default; } });
	var yo_js_1 = yoExports;
	Object.defineProperty(exports, "yo", { enumerable: true, get: function () { return __importDefault(yo_js_1).default; } }); 
} (locales));

var registries = {};

Object.defineProperty(registries, "__esModule", { value: true });
registries.globalRegistry = registries.$ZodRegistry = registries.$input = registries.$output = void 0;
registries.registry = registry;
registries.$output = Symbol("ZodOutput");
registries.$input = Symbol("ZodInput");
class $ZodRegistry {
    constructor() {
        this._map = new Map();
        this._idmap = new Map();
    }
    add(schema, ..._meta) {
        const meta = _meta[0];
        this._map.set(schema, meta);
        if (meta && typeof meta === "object" && "id" in meta) {
            if (this._idmap.has(meta.id)) {
                throw new Error(`ID ${meta.id} already exists in the registry`);
            }
            this._idmap.set(meta.id, schema);
        }
        return this;
    }
    clear() {
        this._map = new Map();
        this._idmap = new Map();
        return this;
    }
    remove(schema) {
        const meta = this._map.get(schema);
        if (meta && typeof meta === "object" && "id" in meta) {
            this._idmap.delete(meta.id);
        }
        this._map.delete(schema);
        return this;
    }
    get(schema) {
        // return this._map.get(schema) as any;
        // inherit metadata
        const p = schema._zod.parent;
        if (p) {
            const pm = { ...(this.get(p) ?? {}) };
            delete pm.id; // do not inherit id
            const f = { ...pm, ...this._map.get(schema) };
            return Object.keys(f).length ? f : undefined;
        }
        return this._map.get(schema);
    }
    has(schema) {
        return this._map.has(schema);
    }
}
registries.$ZodRegistry = $ZodRegistry;
// registries
function registry() {
    return new $ZodRegistry();
}
registries.globalRegistry = registry();

var api = {};

var __createBinding$3 = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault$3 = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar$3 = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding$3(result, mod, k);
    __setModuleDefault$3(result, mod);
    return result;
};
Object.defineProperty(api, "__esModule", { value: true });
api.TimePrecision = void 0;
api._string = _string;
api._coercedString = _coercedString;
api._email = _email;
api._guid = _guid;
api._uuid = _uuid;
api._uuidv4 = _uuidv4;
api._uuidv6 = _uuidv6;
api._uuidv7 = _uuidv7;
api._url = _url;
api._emoji = _emoji;
api._nanoid = _nanoid;
api._cuid = _cuid;
api._cuid2 = _cuid2;
api._ulid = _ulid;
api._xid = _xid;
api._ksuid = _ksuid;
api._ipv4 = _ipv4;
api._ipv6 = _ipv6;
api._cidrv4 = _cidrv4;
api._cidrv6 = _cidrv6;
api._base64 = _base64;
api._base64url = _base64url;
api._e164 = _e164;
api._jwt = _jwt;
api._isoDateTime = _isoDateTime;
api._isoDate = _isoDate;
api._isoTime = _isoTime;
api._isoDuration = _isoDuration;
api._number = _number;
api._coercedNumber = _coercedNumber;
api._int = _int;
api._float32 = _float32;
api._float64 = _float64;
api._int32 = _int32;
api._uint32 = _uint32;
api._boolean = _boolean;
api._coercedBoolean = _coercedBoolean;
api._bigint = _bigint;
api._coercedBigint = _coercedBigint;
api._int64 = _int64;
api._uint64 = _uint64;
api._symbol = _symbol;
api._undefined = _undefined;
api._null = _null;
api._any = _any;
api._unknown = _unknown;
api._never = _never;
api._void = _void;
api._date = _date;
api._coercedDate = _coercedDate;
api._nan = _nan;
api._lt = _lt;
api._lte = _lte;
api._max = _lte;
api._lte = _lte;
api._max = _lte;
api._gt = _gt;
api._gte = _gte;
api._min = _gte;
api._gte = _gte;
api._min = _gte;
api._positive = _positive;
api._negative = _negative;
api._nonpositive = _nonpositive;
api._nonnegative = _nonnegative;
api._multipleOf = _multipleOf;
api._maxSize = _maxSize;
api._minSize = _minSize;
api._size = _size;
api._maxLength = _maxLength;
api._minLength = _minLength;
api._length = _length;
api._regex = _regex;
api._lowercase = _lowercase;
api._uppercase = _uppercase;
api._includes = _includes;
api._startsWith = _startsWith;
api._endsWith = _endsWith;
api._property = _property;
api._mime = _mime;
api._overwrite = _overwrite;
api._normalize = _normalize;
api._trim = _trim;
api._toLowerCase = _toLowerCase;
api._toUpperCase = _toUpperCase;
api._array = _array;
api._union = _union;
api._discriminatedUnion = _discriminatedUnion;
api._intersection = _intersection;
api._tuple = _tuple;
api._record = _record;
api._map = _map;
api._set = _set;
api._enum = _enum;
api._nativeEnum = _nativeEnum;
api._literal = _literal;
api._file = _file;
api._transform = _transform;
api._optional = _optional;
api._nullable = _nullable;
api._default = _default;
api._nonoptional = _nonoptional;
api._success = _success;
api._catch = _catch;
api._pipe = _pipe;
api._readonly = _readonly;
api._templateLiteral = _templateLiteral;
api._lazy = _lazy;
api._promise = _promise;
api._custom = _custom;
api._refine = _refine;
api._superRefine = _superRefine;
api._check = _check;
api._stringbool = _stringbool;
api._stringFormat = _stringFormat;
const checks$1 = __importStar$3(checks$2);
const schemas$2 = __importStar$3(schemas$3);
const util$1 = __importStar$3(util$3);
function _string(Class, params) {
    return new Class({
        type: "string",
        ...util$1.normalizeParams(params),
    });
}
function _coercedString(Class, params) {
    return new Class({
        type: "string",
        coerce: true,
        ...util$1.normalizeParams(params),
    });
}
function _email(Class, params) {
    return new Class({
        type: "string",
        format: "email",
        check: "string_format",
        abort: false,
        ...util$1.normalizeParams(params),
    });
}
function _guid(Class, params) {
    return new Class({
        type: "string",
        format: "guid",
        check: "string_format",
        abort: false,
        ...util$1.normalizeParams(params),
    });
}
function _uuid(Class, params) {
    return new Class({
        type: "string",
        format: "uuid",
        check: "string_format",
        abort: false,
        ...util$1.normalizeParams(params),
    });
}
function _uuidv4(Class, params) {
    return new Class({
        type: "string",
        format: "uuid",
        check: "string_format",
        abort: false,
        version: "v4",
        ...util$1.normalizeParams(params),
    });
}
function _uuidv6(Class, params) {
    return new Class({
        type: "string",
        format: "uuid",
        check: "string_format",
        abort: false,
        version: "v6",
        ...util$1.normalizeParams(params),
    });
}
function _uuidv7(Class, params) {
    return new Class({
        type: "string",
        format: "uuid",
        check: "string_format",
        abort: false,
        version: "v7",
        ...util$1.normalizeParams(params),
    });
}
function _url(Class, params) {
    return new Class({
        type: "string",
        format: "url",
        check: "string_format",
        abort: false,
        ...util$1.normalizeParams(params),
    });
}
function _emoji(Class, params) {
    return new Class({
        type: "string",
        format: "emoji",
        check: "string_format",
        abort: false,
        ...util$1.normalizeParams(params),
    });
}
function _nanoid(Class, params) {
    return new Class({
        type: "string",
        format: "nanoid",
        check: "string_format",
        abort: false,
        ...util$1.normalizeParams(params),
    });
}
function _cuid(Class, params) {
    return new Class({
        type: "string",
        format: "cuid",
        check: "string_format",
        abort: false,
        ...util$1.normalizeParams(params),
    });
}
function _cuid2(Class, params) {
    return new Class({
        type: "string",
        format: "cuid2",
        check: "string_format",
        abort: false,
        ...util$1.normalizeParams(params),
    });
}
function _ulid(Class, params) {
    return new Class({
        type: "string",
        format: "ulid",
        check: "string_format",
        abort: false,
        ...util$1.normalizeParams(params),
    });
}
function _xid(Class, params) {
    return new Class({
        type: "string",
        format: "xid",
        check: "string_format",
        abort: false,
        ...util$1.normalizeParams(params),
    });
}
function _ksuid(Class, params) {
    return new Class({
        type: "string",
        format: "ksuid",
        check: "string_format",
        abort: false,
        ...util$1.normalizeParams(params),
    });
}
function _ipv4(Class, params) {
    return new Class({
        type: "string",
        format: "ipv4",
        check: "string_format",
        abort: false,
        ...util$1.normalizeParams(params),
    });
}
function _ipv6(Class, params) {
    return new Class({
        type: "string",
        format: "ipv6",
        check: "string_format",
        abort: false,
        ...util$1.normalizeParams(params),
    });
}
function _cidrv4(Class, params) {
    return new Class({
        type: "string",
        format: "cidrv4",
        check: "string_format",
        abort: false,
        ...util$1.normalizeParams(params),
    });
}
function _cidrv6(Class, params) {
    return new Class({
        type: "string",
        format: "cidrv6",
        check: "string_format",
        abort: false,
        ...util$1.normalizeParams(params),
    });
}
function _base64(Class, params) {
    return new Class({
        type: "string",
        format: "base64",
        check: "string_format",
        abort: false,
        ...util$1.normalizeParams(params),
    });
}
function _base64url(Class, params) {
    return new Class({
        type: "string",
        format: "base64url",
        check: "string_format",
        abort: false,
        ...util$1.normalizeParams(params),
    });
}
function _e164(Class, params) {
    return new Class({
        type: "string",
        format: "e164",
        check: "string_format",
        abort: false,
        ...util$1.normalizeParams(params),
    });
}
function _jwt(Class, params) {
    return new Class({
        type: "string",
        format: "jwt",
        check: "string_format",
        abort: false,
        ...util$1.normalizeParams(params),
    });
}
api.TimePrecision = {
    Any: null,
    Minute: -1,
    Second: 0,
    Millisecond: 3,
    Microsecond: 6,
};
function _isoDateTime(Class, params) {
    return new Class({
        type: "string",
        format: "datetime",
        check: "string_format",
        offset: false,
        local: false,
        precision: null,
        ...util$1.normalizeParams(params),
    });
}
function _isoDate(Class, params) {
    return new Class({
        type: "string",
        format: "date",
        check: "string_format",
        ...util$1.normalizeParams(params),
    });
}
function _isoTime(Class, params) {
    return new Class({
        type: "string",
        format: "time",
        check: "string_format",
        precision: null,
        ...util$1.normalizeParams(params),
    });
}
function _isoDuration(Class, params) {
    return new Class({
        type: "string",
        format: "duration",
        check: "string_format",
        ...util$1.normalizeParams(params),
    });
}
function _number(Class, params) {
    return new Class({
        type: "number",
        checks: [],
        ...util$1.normalizeParams(params),
    });
}
function _coercedNumber(Class, params) {
    return new Class({
        type: "number",
        coerce: true,
        checks: [],
        ...util$1.normalizeParams(params),
    });
}
function _int(Class, params) {
    return new Class({
        type: "number",
        check: "number_format",
        abort: false,
        format: "safeint",
        ...util$1.normalizeParams(params),
    });
}
function _float32(Class, params) {
    return new Class({
        type: "number",
        check: "number_format",
        abort: false,
        format: "float32",
        ...util$1.normalizeParams(params),
    });
}
function _float64(Class, params) {
    return new Class({
        type: "number",
        check: "number_format",
        abort: false,
        format: "float64",
        ...util$1.normalizeParams(params),
    });
}
function _int32(Class, params) {
    return new Class({
        type: "number",
        check: "number_format",
        abort: false,
        format: "int32",
        ...util$1.normalizeParams(params),
    });
}
function _uint32(Class, params) {
    return new Class({
        type: "number",
        check: "number_format",
        abort: false,
        format: "uint32",
        ...util$1.normalizeParams(params),
    });
}
function _boolean(Class, params) {
    return new Class({
        type: "boolean",
        ...util$1.normalizeParams(params),
    });
}
function _coercedBoolean(Class, params) {
    return new Class({
        type: "boolean",
        coerce: true,
        ...util$1.normalizeParams(params),
    });
}
function _bigint(Class, params) {
    return new Class({
        type: "bigint",
        ...util$1.normalizeParams(params),
    });
}
function _coercedBigint(Class, params) {
    return new Class({
        type: "bigint",
        coerce: true,
        ...util$1.normalizeParams(params),
    });
}
function _int64(Class, params) {
    return new Class({
        type: "bigint",
        check: "bigint_format",
        abort: false,
        format: "int64",
        ...util$1.normalizeParams(params),
    });
}
function _uint64(Class, params) {
    return new Class({
        type: "bigint",
        check: "bigint_format",
        abort: false,
        format: "uint64",
        ...util$1.normalizeParams(params),
    });
}
function _symbol(Class, params) {
    return new Class({
        type: "symbol",
        ...util$1.normalizeParams(params),
    });
}
function _undefined(Class, params) {
    return new Class({
        type: "undefined",
        ...util$1.normalizeParams(params),
    });
}
function _null(Class, params) {
    return new Class({
        type: "null",
        ...util$1.normalizeParams(params),
    });
}
function _any(Class) {
    return new Class({
        type: "any",
    });
}
function _unknown(Class) {
    return new Class({
        type: "unknown",
    });
}
function _never(Class, params) {
    return new Class({
        type: "never",
        ...util$1.normalizeParams(params),
    });
}
function _void(Class, params) {
    return new Class({
        type: "void",
        ...util$1.normalizeParams(params),
    });
}
function _date(Class, params) {
    return new Class({
        type: "date",
        ...util$1.normalizeParams(params),
    });
}
function _coercedDate(Class, params) {
    return new Class({
        type: "date",
        coerce: true,
        ...util$1.normalizeParams(params),
    });
}
function _nan(Class, params) {
    return new Class({
        type: "nan",
        ...util$1.normalizeParams(params),
    });
}
function _lt(value, params) {
    return new checks$1.$ZodCheckLessThan({
        check: "less_than",
        ...util$1.normalizeParams(params),
        value,
        inclusive: false,
    });
}
function _lte(value, params) {
    return new checks$1.$ZodCheckLessThan({
        check: "less_than",
        ...util$1.normalizeParams(params),
        value,
        inclusive: true,
    });
}
function _gt(value, params) {
    return new checks$1.$ZodCheckGreaterThan({
        check: "greater_than",
        ...util$1.normalizeParams(params),
        value,
        inclusive: false,
    });
}
function _gte(value, params) {
    return new checks$1.$ZodCheckGreaterThan({
        check: "greater_than",
        ...util$1.normalizeParams(params),
        value,
        inclusive: true,
    });
}
function _positive(params) {
    return _gt(0, params);
}
// negative
function _negative(params) {
    return _lt(0, params);
}
// nonpositive
function _nonpositive(params) {
    return _lte(0, params);
}
// nonnegative
function _nonnegative(params) {
    return _gte(0, params);
}
function _multipleOf(value, params) {
    return new checks$1.$ZodCheckMultipleOf({
        check: "multiple_of",
        ...util$1.normalizeParams(params),
        value,
    });
}
function _maxSize(maximum, params) {
    return new checks$1.$ZodCheckMaxSize({
        check: "max_size",
        ...util$1.normalizeParams(params),
        maximum,
    });
}
function _minSize(minimum, params) {
    return new checks$1.$ZodCheckMinSize({
        check: "min_size",
        ...util$1.normalizeParams(params),
        minimum,
    });
}
function _size(size, params) {
    return new checks$1.$ZodCheckSizeEquals({
        check: "size_equals",
        ...util$1.normalizeParams(params),
        size,
    });
}
function _maxLength(maximum, params) {
    const ch = new checks$1.$ZodCheckMaxLength({
        check: "max_length",
        ...util$1.normalizeParams(params),
        maximum,
    });
    return ch;
}
function _minLength(minimum, params) {
    return new checks$1.$ZodCheckMinLength({
        check: "min_length",
        ...util$1.normalizeParams(params),
        minimum,
    });
}
function _length(length, params) {
    return new checks$1.$ZodCheckLengthEquals({
        check: "length_equals",
        ...util$1.normalizeParams(params),
        length,
    });
}
function _regex(pattern, params) {
    return new checks$1.$ZodCheckRegex({
        check: "string_format",
        format: "regex",
        ...util$1.normalizeParams(params),
        pattern,
    });
}
function _lowercase(params) {
    return new checks$1.$ZodCheckLowerCase({
        check: "string_format",
        format: "lowercase",
        ...util$1.normalizeParams(params),
    });
}
function _uppercase(params) {
    return new checks$1.$ZodCheckUpperCase({
        check: "string_format",
        format: "uppercase",
        ...util$1.normalizeParams(params),
    });
}
function _includes(includes, params) {
    return new checks$1.$ZodCheckIncludes({
        check: "string_format",
        format: "includes",
        ...util$1.normalizeParams(params),
        includes,
    });
}
function _startsWith(prefix, params) {
    return new checks$1.$ZodCheckStartsWith({
        check: "string_format",
        format: "starts_with",
        ...util$1.normalizeParams(params),
        prefix,
    });
}
function _endsWith(suffix, params) {
    return new checks$1.$ZodCheckEndsWith({
        check: "string_format",
        format: "ends_with",
        ...util$1.normalizeParams(params),
        suffix,
    });
}
function _property(property, schema, params) {
    return new checks$1.$ZodCheckProperty({
        check: "property",
        property,
        schema,
        ...util$1.normalizeParams(params),
    });
}
function _mime(types, params) {
    return new checks$1.$ZodCheckMimeType({
        check: "mime_type",
        mime: types,
        ...util$1.normalizeParams(params),
    });
}
function _overwrite(tx) {
    return new checks$1.$ZodCheckOverwrite({
        check: "overwrite",
        tx,
    });
}
// normalize
function _normalize(form) {
    return _overwrite((input) => input.normalize(form));
}
// trim
function _trim() {
    return _overwrite((input) => input.trim());
}
// toLowerCase
function _toLowerCase() {
    return _overwrite((input) => input.toLowerCase());
}
// toUpperCase
function _toUpperCase() {
    return _overwrite((input) => input.toUpperCase());
}
function _array(Class, element, params) {
    return new Class({
        type: "array",
        element,
        // get element() {
        //   return element;
        // },
        ...util$1.normalizeParams(params),
    });
}
function _union(Class, options, params) {
    return new Class({
        type: "union",
        options,
        ...util$1.normalizeParams(params),
    });
}
function _discriminatedUnion(Class, discriminator, options, params) {
    return new Class({
        type: "union",
        options,
        discriminator,
        ...util$1.normalizeParams(params),
    });
}
function _intersection(Class, left, right) {
    return new Class({
        type: "intersection",
        left,
        right,
    });
}
// export function _tuple(
//   Class: util.SchemaClass<schemas.$ZodTuple>,
//   items: [],
//   params?: string | $ZodTupleParams
// ): schemas.$ZodTuple<[], null>;
function _tuple(Class, items, _paramsOrRest, _params) {
    const hasRest = _paramsOrRest instanceof schemas$2.$ZodType;
    const params = hasRest ? _params : _paramsOrRest;
    const rest = hasRest ? _paramsOrRest : null;
    return new Class({
        type: "tuple",
        items,
        rest,
        ...util$1.normalizeParams(params),
    });
}
function _record(Class, keyType, valueType, params) {
    return new Class({
        type: "record",
        keyType,
        valueType,
        ...util$1.normalizeParams(params),
    });
}
function _map(Class, keyType, valueType, params) {
    return new Class({
        type: "map",
        keyType,
        valueType,
        ...util$1.normalizeParams(params),
    });
}
function _set(Class, valueType, params) {
    return new Class({
        type: "set",
        valueType,
        ...util$1.normalizeParams(params),
    });
}
function _enum(Class, values, params) {
    const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
    // if (Array.isArray(values)) {
    //   for (const value of values) {
    //     entries[value] = value;
    //   }
    // } else {
    //   Object.assign(entries, values);
    // }
    // const entries: util.EnumLike = {};
    // for (const val of values) {
    //   entries[val] = val;
    // }
    return new Class({
        type: "enum",
        entries,
        ...util$1.normalizeParams(params),
    });
}
/** @deprecated This API has been merged into `z.enum()`. Use `z.enum()` instead.
 *
 * ```ts
 * enum Colors { red, green, blue }
 * z.enum(Colors);
 * ```
 */
function _nativeEnum(Class, entries, params) {
    return new Class({
        type: "enum",
        entries,
        ...util$1.normalizeParams(params),
    });
}
function _literal(Class, value, params) {
    return new Class({
        type: "literal",
        values: Array.isArray(value) ? value : [value],
        ...util$1.normalizeParams(params),
    });
}
function _file(Class, params) {
    return new Class({
        type: "file",
        ...util$1.normalizeParams(params),
    });
}
function _transform(Class, fn) {
    return new Class({
        type: "transform",
        transform: fn,
    });
}
function _optional(Class, innerType) {
    return new Class({
        type: "optional",
        innerType,
    });
}
function _nullable(Class, innerType) {
    return new Class({
        type: "nullable",
        innerType,
    });
}
function _default(Class, innerType, defaultValue) {
    return new Class({
        type: "default",
        innerType,
        get defaultValue() {
            return typeof defaultValue === "function" ? defaultValue() : util$1.shallowClone(defaultValue);
        },
    });
}
function _nonoptional(Class, innerType, params) {
    return new Class({
        type: "nonoptional",
        innerType,
        ...util$1.normalizeParams(params),
    });
}
function _success(Class, innerType) {
    return new Class({
        type: "success",
        innerType,
    });
}
function _catch(Class, innerType, catchValue) {
    return new Class({
        type: "catch",
        innerType,
        catchValue: (typeof catchValue === "function" ? catchValue : () => catchValue),
    });
}
function _pipe(Class, in_, out) {
    return new Class({
        type: "pipe",
        in: in_,
        out,
    });
}
function _readonly(Class, innerType) {
    return new Class({
        type: "readonly",
        innerType,
    });
}
function _templateLiteral(Class, parts, params) {
    return new Class({
        type: "template_literal",
        parts,
        ...util$1.normalizeParams(params),
    });
}
function _lazy(Class, getter) {
    return new Class({
        type: "lazy",
        getter,
    });
}
function _promise(Class, innerType) {
    return new Class({
        type: "promise",
        innerType,
    });
}
function _custom(Class, fn, _params) {
    const norm = util$1.normalizeParams(_params);
    norm.abort ?? (norm.abort = true); // default to abort:false
    const schema = new Class({
        type: "custom",
        check: "custom",
        fn: fn,
        ...norm,
    });
    return schema;
}
// same as _custom but defaults to abort:false
function _refine(Class, fn, _params) {
    const schema = new Class({
        type: "custom",
        check: "custom",
        fn: fn,
        ...util$1.normalizeParams(_params),
    });
    return schema;
}
function _superRefine(fn) {
    const ch = _check((payload) => {
        payload.addIssue = (issue) => {
            if (typeof issue === "string") {
                payload.issues.push(util$1.issue(issue, payload.value, ch._zod.def));
            }
            else {
                // for Zod 3 backwards compatibility
                const _issue = issue;
                if (_issue.fatal)
                    _issue.continue = false;
                _issue.code ?? (_issue.code = "custom");
                _issue.input ?? (_issue.input = payload.value);
                _issue.inst ?? (_issue.inst = ch);
                _issue.continue ?? (_issue.continue = !ch._zod.def.abort); // abort is always undefined, so this is always true...
                payload.issues.push(util$1.issue(_issue));
            }
        };
        return fn(payload.value, payload);
    });
    return ch;
}
function _check(fn, params) {
    const ch = new checks$1.$ZodCheck({
        check: "custom",
        ...util$1.normalizeParams(params),
    });
    ch._zod.check = fn;
    return ch;
}
function _stringbool(Classes, _params) {
    const params = util$1.normalizeParams(_params);
    let truthyArray = params.truthy ?? ["true", "1", "yes", "on", "y", "enabled"];
    let falsyArray = params.falsy ?? ["false", "0", "no", "off", "n", "disabled"];
    if (params.case !== "sensitive") {
        truthyArray = truthyArray.map((v) => (typeof v === "string" ? v.toLowerCase() : v));
        falsyArray = falsyArray.map((v) => (typeof v === "string" ? v.toLowerCase() : v));
    }
    const truthySet = new Set(truthyArray);
    const falsySet = new Set(falsyArray);
    const _Codec = Classes.Codec ?? schemas$2.$ZodCodec;
    const _Boolean = Classes.Boolean ?? schemas$2.$ZodBoolean;
    const _String = Classes.String ?? schemas$2.$ZodString;
    const stringSchema = new _String({ type: "string", error: params.error });
    const booleanSchema = new _Boolean({ type: "boolean", error: params.error });
    const codec = new _Codec({
        type: "pipe",
        in: stringSchema,
        out: booleanSchema,
        transform: ((input, payload) => {
            let data = input;
            if (params.case !== "sensitive")
                data = data.toLowerCase();
            if (truthySet.has(data)) {
                return true;
            }
            else if (falsySet.has(data)) {
                return false;
            }
            else {
                payload.issues.push({
                    code: "invalid_value",
                    expected: "stringbool",
                    values: [...truthySet, ...falsySet],
                    input: payload.value,
                    inst: codec,
                    continue: false,
                });
                return {};
            }
        }),
        reverseTransform: ((input, _payload) => {
            if (input === true) {
                return truthyArray[0] || "true";
            }
            else {
                return falsyArray[0] || "false";
            }
        }),
        error: params.error,
    });
    return codec;
}
function _stringFormat(Class, format, fnOrRegex, _params = {}) {
    const params = util$1.normalizeParams(_params);
    const def = {
        ...util$1.normalizeParams(_params),
        check: "string_format",
        type: "string",
        format,
        fn: typeof fnOrRegex === "function" ? fnOrRegex : (val) => fnOrRegex.test(val),
        ...params,
    };
    if (fnOrRegex instanceof RegExp) {
        def.pattern = fnOrRegex;
    }
    const inst = new Class(def);
    return inst;
}

var toJsonSchema = {};

Object.defineProperty(toJsonSchema, "__esModule", { value: true });
toJsonSchema.JSONSchemaGenerator = void 0;
toJsonSchema.toJSONSchema = toJSONSchema;
const registries_js_1 = registries;
const util_js_1 = util$3;
class JSONSchemaGenerator {
    constructor(params) {
        this.counter = 0;
        this.metadataRegistry = params?.metadata ?? registries_js_1.globalRegistry;
        this.target = params?.target ?? "draft-2020-12";
        this.unrepresentable = params?.unrepresentable ?? "throw";
        this.override = params?.override ?? (() => { });
        this.io = params?.io ?? "output";
        this.seen = new Map();
    }
    process(schema, _params = { path: [], schemaPath: [] }) {
        var _a;
        const def = schema._zod.def;
        const formatMap = {
            guid: "uuid",
            url: "uri",
            datetime: "date-time",
            json_string: "json-string",
            regex: "", // do not set
        };
        // check for schema in seens
        const seen = this.seen.get(schema);
        if (seen) {
            seen.count++;
            // check if cycle
            const isCycle = _params.schemaPath.includes(schema);
            if (isCycle) {
                seen.cycle = _params.path;
            }
            return seen.schema;
        }
        // initialize
        const result = { schema: {}, count: 1, cycle: undefined, path: _params.path };
        this.seen.set(schema, result);
        // custom method overrides default behavior
        const overrideSchema = schema._zod.toJSONSchema?.();
        if (overrideSchema) {
            result.schema = overrideSchema;
        }
        else {
            const params = {
                ..._params,
                schemaPath: [..._params.schemaPath, schema],
                path: _params.path,
            };
            const parent = schema._zod.parent;
            if (parent) {
                // schema was cloned from another schema
                result.ref = parent;
                this.process(parent, params);
                this.seen.get(parent).isParent = true;
            }
            else {
                const _json = result.schema;
                switch (def.type) {
                    case "string": {
                        const json = _json;
                        json.type = "string";
                        const { minimum, maximum, format, patterns, contentEncoding } = schema._zod
                            .bag;
                        if (typeof minimum === "number")
                            json.minLength = minimum;
                        if (typeof maximum === "number")
                            json.maxLength = maximum;
                        // custom pattern overrides format
                        if (format) {
                            json.format = formatMap[format] ?? format;
                            if (json.format === "")
                                delete json.format; // empty format is not valid
                        }
                        if (contentEncoding)
                            json.contentEncoding = contentEncoding;
                        if (patterns && patterns.size > 0) {
                            const regexes = [...patterns];
                            if (regexes.length === 1)
                                json.pattern = regexes[0].source;
                            else if (regexes.length > 1) {
                                result.schema.allOf = [
                                    ...regexes.map((regex) => ({
                                        ...(this.target === "draft-7" || this.target === "draft-4" || this.target === "openapi-3.0"
                                            ? { type: "string" }
                                            : {}),
                                        pattern: regex.source,
                                    })),
                                ];
                            }
                        }
                        break;
                    }
                    case "number": {
                        const json = _json;
                        const { minimum, maximum, format, multipleOf, exclusiveMaximum, exclusiveMinimum } = schema._zod.bag;
                        if (typeof format === "string" && format.includes("int"))
                            json.type = "integer";
                        else
                            json.type = "number";
                        if (typeof exclusiveMinimum === "number") {
                            if (this.target === "draft-4" || this.target === "openapi-3.0") {
                                json.minimum = exclusiveMinimum;
                                json.exclusiveMinimum = true;
                            }
                            else {
                                json.exclusiveMinimum = exclusiveMinimum;
                            }
                        }
                        if (typeof minimum === "number") {
                            json.minimum = minimum;
                            if (typeof exclusiveMinimum === "number" && this.target !== "draft-4") {
                                if (exclusiveMinimum >= minimum)
                                    delete json.minimum;
                                else
                                    delete json.exclusiveMinimum;
                            }
                        }
                        if (typeof exclusiveMaximum === "number") {
                            if (this.target === "draft-4" || this.target === "openapi-3.0") {
                                json.maximum = exclusiveMaximum;
                                json.exclusiveMaximum = true;
                            }
                            else {
                                json.exclusiveMaximum = exclusiveMaximum;
                            }
                        }
                        if (typeof maximum === "number") {
                            json.maximum = maximum;
                            if (typeof exclusiveMaximum === "number" && this.target !== "draft-4") {
                                if (exclusiveMaximum <= maximum)
                                    delete json.maximum;
                                else
                                    delete json.exclusiveMaximum;
                            }
                        }
                        if (typeof multipleOf === "number")
                            json.multipleOf = multipleOf;
                        break;
                    }
                    case "boolean": {
                        const json = _json;
                        json.type = "boolean";
                        break;
                    }
                    case "bigint": {
                        if (this.unrepresentable === "throw") {
                            throw new Error("BigInt cannot be represented in JSON Schema");
                        }
                        break;
                    }
                    case "symbol": {
                        if (this.unrepresentable === "throw") {
                            throw new Error("Symbols cannot be represented in JSON Schema");
                        }
                        break;
                    }
                    case "null": {
                        if (this.target === "openapi-3.0") {
                            _json.type = "string";
                            _json.nullable = true;
                            _json.enum = [null];
                        }
                        else
                            _json.type = "null";
                        break;
                    }
                    case "any": {
                        break;
                    }
                    case "unknown": {
                        break;
                    }
                    case "undefined": {
                        if (this.unrepresentable === "throw") {
                            throw new Error("Undefined cannot be represented in JSON Schema");
                        }
                        break;
                    }
                    case "void": {
                        if (this.unrepresentable === "throw") {
                            throw new Error("Void cannot be represented in JSON Schema");
                        }
                        break;
                    }
                    case "never": {
                        _json.not = {};
                        break;
                    }
                    case "date": {
                        if (this.unrepresentable === "throw") {
                            throw new Error("Date cannot be represented in JSON Schema");
                        }
                        break;
                    }
                    case "array": {
                        const json = _json;
                        const { minimum, maximum } = schema._zod.bag;
                        if (typeof minimum === "number")
                            json.minItems = minimum;
                        if (typeof maximum === "number")
                            json.maxItems = maximum;
                        json.type = "array";
                        json.items = this.process(def.element, { ...params, path: [...params.path, "items"] });
                        break;
                    }
                    case "object": {
                        const json = _json;
                        json.type = "object";
                        json.properties = {};
                        const shape = def.shape; // params.shapeCache.get(schema)!;
                        for (const key in shape) {
                            json.properties[key] = this.process(shape[key], {
                                ...params,
                                path: [...params.path, "properties", key],
                            });
                        }
                        // required keys
                        const allKeys = new Set(Object.keys(shape));
                        // const optionalKeys = new Set(def.optional);
                        const requiredKeys = new Set([...allKeys].filter((key) => {
                            const v = def.shape[key]._zod;
                            if (this.io === "input") {
                                return v.optin === undefined;
                            }
                            else {
                                return v.optout === undefined;
                            }
                        }));
                        if (requiredKeys.size > 0) {
                            json.required = Array.from(requiredKeys);
                        }
                        // catchall
                        if (def.catchall?._zod.def.type === "never") {
                            // strict
                            json.additionalProperties = false;
                        }
                        else if (!def.catchall) {
                            // regular
                            if (this.io === "output")
                                json.additionalProperties = false;
                        }
                        else if (def.catchall) {
                            json.additionalProperties = this.process(def.catchall, {
                                ...params,
                                path: [...params.path, "additionalProperties"],
                            });
                        }
                        break;
                    }
                    case "union": {
                        const json = _json;
                        const options = def.options.map((x, i) => this.process(x, {
                            ...params,
                            path: [...params.path, "anyOf", i],
                        }));
                        json.anyOf = options;
                        break;
                    }
                    case "intersection": {
                        const json = _json;
                        const a = this.process(def.left, {
                            ...params,
                            path: [...params.path, "allOf", 0],
                        });
                        const b = this.process(def.right, {
                            ...params,
                            path: [...params.path, "allOf", 1],
                        });
                        const isSimpleIntersection = (val) => "allOf" in val && Object.keys(val).length === 1;
                        const allOf = [
                            ...(isSimpleIntersection(a) ? a.allOf : [a]),
                            ...(isSimpleIntersection(b) ? b.allOf : [b]),
                        ];
                        json.allOf = allOf;
                        break;
                    }
                    case "tuple": {
                        const json = _json;
                        json.type = "array";
                        const prefixPath = this.target === "draft-2020-12" ? "prefixItems" : "items";
                        const restPath = this.target === "draft-2020-12" ? "items" : this.target === "openapi-3.0" ? "items" : "additionalItems";
                        const prefixItems = def.items.map((x, i) => this.process(x, {
                            ...params,
                            path: [...params.path, prefixPath, i],
                        }));
                        const rest = def.rest
                            ? this.process(def.rest, {
                                ...params,
                                path: [...params.path, restPath, ...(this.target === "openapi-3.0" ? [def.items.length] : [])],
                            })
                            : null;
                        if (this.target === "draft-2020-12") {
                            json.prefixItems = prefixItems;
                            if (rest) {
                                json.items = rest;
                            }
                        }
                        else if (this.target === "openapi-3.0") {
                            json.items = {
                                anyOf: prefixItems,
                            };
                            if (rest) {
                                json.items.anyOf.push(rest);
                            }
                            json.minItems = prefixItems.length;
                            if (!rest) {
                                json.maxItems = prefixItems.length;
                            }
                        }
                        else {
                            json.items = prefixItems;
                            if (rest) {
                                json.additionalItems = rest;
                            }
                        }
                        // length
                        const { minimum, maximum } = schema._zod.bag;
                        if (typeof minimum === "number")
                            json.minItems = minimum;
                        if (typeof maximum === "number")
                            json.maxItems = maximum;
                        break;
                    }
                    case "record": {
                        const json = _json;
                        json.type = "object";
                        if (this.target === "draft-7" || this.target === "draft-2020-12") {
                            json.propertyNames = this.process(def.keyType, {
                                ...params,
                                path: [...params.path, "propertyNames"],
                            });
                        }
                        json.additionalProperties = this.process(def.valueType, {
                            ...params,
                            path: [...params.path, "additionalProperties"],
                        });
                        break;
                    }
                    case "map": {
                        if (this.unrepresentable === "throw") {
                            throw new Error("Map cannot be represented in JSON Schema");
                        }
                        break;
                    }
                    case "set": {
                        if (this.unrepresentable === "throw") {
                            throw new Error("Set cannot be represented in JSON Schema");
                        }
                        break;
                    }
                    case "enum": {
                        const json = _json;
                        const values = (0, util_js_1.getEnumValues)(def.entries);
                        // Number enums can have both string and number values
                        if (values.every((v) => typeof v === "number"))
                            json.type = "number";
                        if (values.every((v) => typeof v === "string"))
                            json.type = "string";
                        json.enum = values;
                        break;
                    }
                    case "literal": {
                        const json = _json;
                        const vals = [];
                        for (const val of def.values) {
                            if (val === undefined) {
                                if (this.unrepresentable === "throw") {
                                    throw new Error("Literal `undefined` cannot be represented in JSON Schema");
                                }
                            }
                            else if (typeof val === "bigint") {
                                if (this.unrepresentable === "throw") {
                                    throw new Error("BigInt literals cannot be represented in JSON Schema");
                                }
                                else {
                                    vals.push(Number(val));
                                }
                            }
                            else {
                                vals.push(val);
                            }
                        }
                        if (vals.length === 0) ;
                        else if (vals.length === 1) {
                            const val = vals[0];
                            json.type = val === null ? "null" : typeof val;
                            if (this.target === "draft-4" || this.target === "openapi-3.0") {
                                json.enum = [val];
                            }
                            else {
                                json.const = val;
                            }
                        }
                        else {
                            if (vals.every((v) => typeof v === "number"))
                                json.type = "number";
                            if (vals.every((v) => typeof v === "string"))
                                json.type = "string";
                            if (vals.every((v) => typeof v === "boolean"))
                                json.type = "string";
                            if (vals.every((v) => v === null))
                                json.type = "null";
                            json.enum = vals;
                        }
                        break;
                    }
                    case "file": {
                        const json = _json;
                        const file = {
                            type: "string",
                            format: "binary",
                            contentEncoding: "binary",
                        };
                        const { minimum, maximum, mime } = schema._zod.bag;
                        if (minimum !== undefined)
                            file.minLength = minimum;
                        if (maximum !== undefined)
                            file.maxLength = maximum;
                        if (mime) {
                            if (mime.length === 1) {
                                file.contentMediaType = mime[0];
                                Object.assign(json, file);
                            }
                            else {
                                json.anyOf = mime.map((m) => {
                                    const mFile = { ...file, contentMediaType: m };
                                    return mFile;
                                });
                            }
                        }
                        else {
                            Object.assign(json, file);
                        }
                        // if (this.unrepresentable === "throw") {
                        //   throw new Error("File cannot be represented in JSON Schema");
                        // }
                        break;
                    }
                    case "transform": {
                        if (this.unrepresentable === "throw") {
                            throw new Error("Transforms cannot be represented in JSON Schema");
                        }
                        break;
                    }
                    case "nullable": {
                        const inner = this.process(def.innerType, params);
                        if (this.target === "openapi-3.0") {
                            result.ref = def.innerType;
                            _json.nullable = true;
                        }
                        else {
                            _json.anyOf = [inner, { type: "null" }];
                        }
                        break;
                    }
                    case "nonoptional": {
                        this.process(def.innerType, params);
                        result.ref = def.innerType;
                        break;
                    }
                    case "success": {
                        const json = _json;
                        json.type = "boolean";
                        break;
                    }
                    case "default": {
                        this.process(def.innerType, params);
                        result.ref = def.innerType;
                        _json.default = JSON.parse(JSON.stringify(def.defaultValue));
                        break;
                    }
                    case "prefault": {
                        this.process(def.innerType, params);
                        result.ref = def.innerType;
                        if (this.io === "input")
                            _json._prefault = JSON.parse(JSON.stringify(def.defaultValue));
                        break;
                    }
                    case "catch": {
                        // use conditionals
                        this.process(def.innerType, params);
                        result.ref = def.innerType;
                        let catchValue;
                        try {
                            catchValue = def.catchValue(undefined);
                        }
                        catch {
                            throw new Error("Dynamic catch values are not supported in JSON Schema");
                        }
                        _json.default = catchValue;
                        break;
                    }
                    case "nan": {
                        if (this.unrepresentable === "throw") {
                            throw new Error("NaN cannot be represented in JSON Schema");
                        }
                        break;
                    }
                    case "template_literal": {
                        const json = _json;
                        const pattern = schema._zod.pattern;
                        if (!pattern)
                            throw new Error("Pattern not found in template literal");
                        json.type = "string";
                        json.pattern = pattern.source;
                        break;
                    }
                    case "pipe": {
                        const innerType = this.io === "input" ? (def.in._zod.def.type === "transform" ? def.out : def.in) : def.out;
                        this.process(innerType, params);
                        result.ref = innerType;
                        break;
                    }
                    case "readonly": {
                        this.process(def.innerType, params);
                        result.ref = def.innerType;
                        _json.readOnly = true;
                        break;
                    }
                    // passthrough types
                    case "promise": {
                        this.process(def.innerType, params);
                        result.ref = def.innerType;
                        break;
                    }
                    case "optional": {
                        this.process(def.innerType, params);
                        result.ref = def.innerType;
                        break;
                    }
                    case "lazy": {
                        const innerType = schema._zod.innerType;
                        this.process(innerType, params);
                        result.ref = innerType;
                        break;
                    }
                    case "custom": {
                        if (this.unrepresentable === "throw") {
                            throw new Error("Custom types cannot be represented in JSON Schema");
                        }
                        break;
                    }
                    case "function": {
                        if (this.unrepresentable === "throw") {
                            throw new Error("Function types cannot be represented in JSON Schema");
                        }
                        break;
                    }
                }
            }
        }
        // metadata
        const meta = this.metadataRegistry.get(schema);
        if (meta)
            Object.assign(result.schema, meta);
        if (this.io === "input" && isTransforming(schema)) {
            // examples/defaults only apply to output type of pipe
            delete result.schema.examples;
            delete result.schema.default;
        }
        // set prefault as default
        if (this.io === "input" && result.schema._prefault)
            (_a = result.schema).default ?? (_a.default = result.schema._prefault);
        delete result.schema._prefault;
        // pulling fresh from this.seen in case it was overwritten
        const _result = this.seen.get(schema);
        return _result.schema;
    }
    emit(schema, _params) {
        const params = {
            cycles: _params?.cycles ?? "ref",
            reused: _params?.reused ?? "inline",
            // unrepresentable: _params?.unrepresentable ?? "throw",
            // uri: _params?.uri ?? ((id) => `${id}`),
            external: _params?.external ?? undefined,
        };
        // iterate over seen map;
        const root = this.seen.get(schema);
        if (!root)
            throw new Error("Unprocessed schema. This is a bug in Zod.");
        // initialize result with root schema fields
        // Object.assign(result, seen.cached);
        // returns a ref to the schema
        // defId will be empty if the ref points to an external schema (or #)
        const makeURI = (entry) => {
            // comparing the seen objects because sometimes
            // multiple schemas map to the same seen object.
            // e.g. lazy
            // external is configured
            const defsSegment = this.target === "draft-2020-12" ? "$defs" : "definitions";
            if (params.external) {
                const externalId = params.external.registry.get(entry[0])?.id; // ?? "__shared";// `__schema${this.counter++}`;
                // check if schema is in the external registry
                const uriGenerator = params.external.uri ?? ((id) => id);
                if (externalId) {
                    return { ref: uriGenerator(externalId) };
                }
                // otherwise, add to __shared
                const id = entry[1].defId ?? entry[1].schema.id ?? `schema${this.counter++}`;
                entry[1].defId = id; // set defId so it will be reused if needed
                return { defId: id, ref: `${uriGenerator("__shared")}#/${defsSegment}/${id}` };
            }
            if (entry[1] === root) {
                return { ref: "#" };
            }
            // self-contained schema
            const uriPrefix = `#`;
            const defUriPrefix = `${uriPrefix}/${defsSegment}/`;
            const defId = entry[1].schema.id ?? `__schema${this.counter++}`;
            return { defId, ref: defUriPrefix + defId };
        };
        // stored cached version in `def` property
        // remove all properties, set $ref
        const extractToDef = (entry) => {
            // if the schema is already a reference, do not extract it
            if (entry[1].schema.$ref) {
                return;
            }
            const seen = entry[1];
            const { ref, defId } = makeURI(entry);
            seen.def = { ...seen.schema };
            // defId won't be set if the schema is a reference to an external schema
            if (defId)
                seen.defId = defId;
            // wipe away all properties except $ref
            const schema = seen.schema;
            for (const key in schema) {
                delete schema[key];
            }
            schema.$ref = ref;
        };
        // throw on cycles
        // break cycles
        if (params.cycles === "throw") {
            for (const entry of this.seen.entries()) {
                const seen = entry[1];
                if (seen.cycle) {
                    throw new Error("Cycle detected: " +
                        `#/${seen.cycle?.join("/")}/<root>` +
                        '\n\nSet the `cycles` parameter to `"ref"` to resolve cyclical schemas with defs.');
                }
            }
        }
        // extract schemas into $defs
        for (const entry of this.seen.entries()) {
            const seen = entry[1];
            // convert root schema to # $ref
            if (schema === entry[0]) {
                extractToDef(entry); // this has special handling for the root schema
                continue;
            }
            // extract schemas that are in the external registry
            if (params.external) {
                const ext = params.external.registry.get(entry[0])?.id;
                if (schema !== entry[0] && ext) {
                    extractToDef(entry);
                    continue;
                }
            }
            // extract schemas with `id` meta
            const id = this.metadataRegistry.get(entry[0])?.id;
            if (id) {
                extractToDef(entry);
                continue;
            }
            // break cycles
            if (seen.cycle) {
                // any
                extractToDef(entry);
                continue;
            }
            // extract reused schemas
            if (seen.count > 1) {
                if (params.reused === "ref") {
                    extractToDef(entry);
                    // biome-ignore lint:
                    continue;
                }
            }
        }
        // flatten _refs
        const flattenRef = (zodSchema, params) => {
            const seen = this.seen.get(zodSchema);
            const schema = seen.def ?? seen.schema;
            const _cached = { ...schema };
            // already seen
            if (seen.ref === null) {
                return;
            }
            // flatten ref if defined
            const ref = seen.ref;
            seen.ref = null; // prevent recursion
            if (ref) {
                flattenRef(ref, params);
                // merge referenced schema into current
                const refSchema = this.seen.get(ref).schema;
                if (refSchema.$ref &&
                    (params.target === "draft-7" || params.target === "draft-4" || params.target === "openapi-3.0")) {
                    schema.allOf = schema.allOf ?? [];
                    schema.allOf.push(refSchema);
                }
                else {
                    Object.assign(schema, refSchema);
                    Object.assign(schema, _cached); // prevent overwriting any fields in the original schema
                }
            }
            // execute overrides
            if (!seen.isParent)
                this.override({
                    zodSchema: zodSchema,
                    jsonSchema: schema,
                    path: seen.path ?? [],
                });
        };
        for (const entry of [...this.seen.entries()].reverse()) {
            flattenRef(entry[0], { target: this.target });
        }
        const result = {};
        if (this.target === "draft-2020-12") {
            result.$schema = "https://json-schema.org/draft/2020-12/schema";
        }
        else if (this.target === "draft-7") {
            result.$schema = "http://json-schema.org/draft-07/schema#";
        }
        else if (this.target === "draft-4") {
            result.$schema = "http://json-schema.org/draft-04/schema#";
        }
        else if (this.target === "openapi-3.0") ;
        else {
            // @ts-ignore
            console.warn(`Invalid target: ${this.target}`);
        }
        if (params.external?.uri) {
            const id = params.external.registry.get(schema)?.id;
            if (!id)
                throw new Error("Schema is missing an `id` property");
            result.$id = params.external.uri(id);
        }
        Object.assign(result, root.def);
        // build defs object
        const defs = params.external?.defs ?? {};
        for (const entry of this.seen.entries()) {
            const seen = entry[1];
            if (seen.def && seen.defId) {
                defs[seen.defId] = seen.def;
            }
        }
        // set definitions in result
        if (params.external) ;
        else {
            if (Object.keys(defs).length > 0) {
                if (this.target === "draft-2020-12") {
                    result.$defs = defs;
                }
                else {
                    result.definitions = defs;
                }
            }
        }
        try {
            // this "finalizes" this schema and ensures all cycles are removed
            // each call to .emit() is functionally independent
            // though the seen map is shared
            return JSON.parse(JSON.stringify(result));
        }
        catch (_err) {
            throw new Error("Error converting schema to JSON.");
        }
    }
}
toJsonSchema.JSONSchemaGenerator = JSONSchemaGenerator;
function toJSONSchema(input, _params) {
    if (input instanceof registries_js_1.$ZodRegistry) {
        const gen = new JSONSchemaGenerator(_params);
        const defs = {};
        for (const entry of input._idmap.entries()) {
            const [_, schema] = entry;
            gen.process(schema);
        }
        const schemas = {};
        const external = {
            registry: input,
            uri: _params?.uri,
            defs,
        };
        for (const entry of input._idmap.entries()) {
            const [key, schema] = entry;
            schemas[key] = gen.emit(schema, {
                ..._params,
                external,
            });
        }
        if (Object.keys(defs).length > 0) {
            const defsSegment = gen.target === "draft-2020-12" ? "$defs" : "definitions";
            schemas.__shared = {
                [defsSegment]: defs,
            };
        }
        return { schemas };
    }
    const gen = new JSONSchemaGenerator(_params);
    gen.process(input);
    return gen.emit(input, _params);
}
function isTransforming(_schema, _ctx) {
    const ctx = _ctx ?? { seen: new Set() };
    if (ctx.seen.has(_schema))
        return false;
    ctx.seen.add(_schema);
    const schema = _schema;
    const def = schema._zod.def;
    switch (def.type) {
        case "string":
        case "number":
        case "bigint":
        case "boolean":
        case "date":
        case "symbol":
        case "undefined":
        case "null":
        case "any":
        case "unknown":
        case "never":
        case "void":
        case "literal":
        case "enum":
        case "nan":
        case "file":
        case "template_literal":
            return false;
        case "array": {
            return isTransforming(def.element, ctx);
        }
        case "object": {
            for (const key in def.shape) {
                if (isTransforming(def.shape[key], ctx))
                    return true;
            }
            return false;
        }
        case "union": {
            for (const option of def.options) {
                if (isTransforming(option, ctx))
                    return true;
            }
            return false;
        }
        case "intersection": {
            return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
        }
        case "tuple": {
            for (const item of def.items) {
                if (isTransforming(item, ctx))
                    return true;
            }
            if (def.rest && isTransforming(def.rest, ctx))
                return true;
            return false;
        }
        case "record": {
            return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
        }
        case "map": {
            return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
        }
        case "set": {
            return isTransforming(def.valueType, ctx);
        }
        // inner types
        case "promise":
        case "optional":
        case "nonoptional":
        case "nullable":
        case "readonly":
            return isTransforming(def.innerType, ctx);
        case "lazy":
            return isTransforming(def.getter(), ctx);
        case "default": {
            return isTransforming(def.innerType, ctx);
        }
        case "prefault": {
            return isTransforming(def.innerType, ctx);
        }
        case "custom": {
            return false;
        }
        case "transform": {
            return true;
        }
        case "pipe": {
            return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
        }
        case "success": {
            return false;
        }
        case "catch": {
            return false;
        }
        case "function": {
            return false;
        }
    }
    throw new Error(`Unknown schema type: ${def.type}`);
}

var jsonSchema = {};

Object.defineProperty(jsonSchema, "__esModule", { value: true });

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.JSONSchema = exports.locales = exports.regexes = exports.util = void 0;
	__exportStar(core$3, exports);
	__exportStar(parse$1, exports);
	__exportStar(errors$1, exports);
	__exportStar(schemas$3, exports);
	__exportStar(checks$2, exports);
	__exportStar(versions, exports);
	exports.util = __importStar(util$3);
	exports.regexes = __importStar(regexes);
	exports.locales = __importStar(locales);
	__exportStar(registries, exports);
	__exportStar(doc, exports);
	__exportStar(api, exports);
	__exportStar(toJsonSchema, exports);
	exports.JSONSchema = __importStar(jsonSchema); 
} (core$4));

var schemas$1 = {};

var checks = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.toUpperCase = exports.toLowerCase = exports.trim = exports.normalize = exports.overwrite = exports.mime = exports.property = exports.endsWith = exports.startsWith = exports.includes = exports.uppercase = exports.lowercase = exports.regex = exports.length = exports.minLength = exports.maxLength = exports.size = exports.minSize = exports.maxSize = exports.multipleOf = exports.nonnegative = exports.nonpositive = exports.negative = exports.positive = exports.gte = exports.gt = exports.lte = exports.lt = void 0;
	var index_js_1 = core$4;
	Object.defineProperty(exports, "lt", { enumerable: true, get: function () { return index_js_1._lt; } });
	Object.defineProperty(exports, "lte", { enumerable: true, get: function () { return index_js_1._lte; } });
	Object.defineProperty(exports, "gt", { enumerable: true, get: function () { return index_js_1._gt; } });
	Object.defineProperty(exports, "gte", { enumerable: true, get: function () { return index_js_1._gte; } });
	Object.defineProperty(exports, "positive", { enumerable: true, get: function () { return index_js_1._positive; } });
	Object.defineProperty(exports, "negative", { enumerable: true, get: function () { return index_js_1._negative; } });
	Object.defineProperty(exports, "nonpositive", { enumerable: true, get: function () { return index_js_1._nonpositive; } });
	Object.defineProperty(exports, "nonnegative", { enumerable: true, get: function () { return index_js_1._nonnegative; } });
	Object.defineProperty(exports, "multipleOf", { enumerable: true, get: function () { return index_js_1._multipleOf; } });
	Object.defineProperty(exports, "maxSize", { enumerable: true, get: function () { return index_js_1._maxSize; } });
	Object.defineProperty(exports, "minSize", { enumerable: true, get: function () { return index_js_1._minSize; } });
	Object.defineProperty(exports, "size", { enumerable: true, get: function () { return index_js_1._size; } });
	Object.defineProperty(exports, "maxLength", { enumerable: true, get: function () { return index_js_1._maxLength; } });
	Object.defineProperty(exports, "minLength", { enumerable: true, get: function () { return index_js_1._minLength; } });
	Object.defineProperty(exports, "length", { enumerable: true, get: function () { return index_js_1._length; } });
	Object.defineProperty(exports, "regex", { enumerable: true, get: function () { return index_js_1._regex; } });
	Object.defineProperty(exports, "lowercase", { enumerable: true, get: function () { return index_js_1._lowercase; } });
	Object.defineProperty(exports, "uppercase", { enumerable: true, get: function () { return index_js_1._uppercase; } });
	Object.defineProperty(exports, "includes", { enumerable: true, get: function () { return index_js_1._includes; } });
	Object.defineProperty(exports, "startsWith", { enumerable: true, get: function () { return index_js_1._startsWith; } });
	Object.defineProperty(exports, "endsWith", { enumerable: true, get: function () { return index_js_1._endsWith; } });
	Object.defineProperty(exports, "property", { enumerable: true, get: function () { return index_js_1._property; } });
	Object.defineProperty(exports, "mime", { enumerable: true, get: function () { return index_js_1._mime; } });
	Object.defineProperty(exports, "overwrite", { enumerable: true, get: function () { return index_js_1._overwrite; } });
	Object.defineProperty(exports, "normalize", { enumerable: true, get: function () { return index_js_1._normalize; } });
	Object.defineProperty(exports, "trim", { enumerable: true, get: function () { return index_js_1._trim; } });
	Object.defineProperty(exports, "toLowerCase", { enumerable: true, get: function () { return index_js_1._toLowerCase; } });
	Object.defineProperty(exports, "toUpperCase", { enumerable: true, get: function () { return index_js_1._toUpperCase; } }); 
} (checks));

var iso = {};

var hasRequiredIso;

function requireIso () {
	if (hasRequiredIso) return iso;
	hasRequiredIso = 1;
	(function (exports) {
		var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    var desc = Object.getOwnPropertyDescriptor(m, k);
		    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
		      desc = { enumerable: true, get: function() { return m[k]; } };
		    }
		    Object.defineProperty(o, k2, desc);
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
		    Object.defineProperty(o, "default", { enumerable: true, value: v });
		}) : function(o, v) {
		    o["default"] = v;
		});
		var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
		    if (mod && mod.__esModule) return mod;
		    var result = {};
		    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		    __setModuleDefault(result, mod);
		    return result;
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.ZodISODuration = exports.ZodISOTime = exports.ZodISODate = exports.ZodISODateTime = void 0;
		exports.datetime = datetime;
		exports.date = date;
		exports.time = time;
		exports.duration = duration;
		const core = __importStar(core$4);
		const schemas = __importStar(requireSchemas());
		exports.ZodISODateTime = core.$constructor("ZodISODateTime", (inst, def) => {
		    core.$ZodISODateTime.init(inst, def);
		    schemas.ZodStringFormat.init(inst, def);
		});
		function datetime(params) {
		    return core._isoDateTime(exports.ZodISODateTime, params);
		}
		exports.ZodISODate = core.$constructor("ZodISODate", (inst, def) => {
		    core.$ZodISODate.init(inst, def);
		    schemas.ZodStringFormat.init(inst, def);
		});
		function date(params) {
		    return core._isoDate(exports.ZodISODate, params);
		}
		exports.ZodISOTime = core.$constructor("ZodISOTime", (inst, def) => {
		    core.$ZodISOTime.init(inst, def);
		    schemas.ZodStringFormat.init(inst, def);
		});
		function time(params) {
		    return core._isoTime(exports.ZodISOTime, params);
		}
		exports.ZodISODuration = core.$constructor("ZodISODuration", (inst, def) => {
		    core.$ZodISODuration.init(inst, def);
		    schemas.ZodStringFormat.init(inst, def);
		});
		function duration(params) {
		    return core._isoDuration(exports.ZodISODuration, params);
		} 
	} (iso));
	return iso;
}

var parse = {};

var errors = {};

var __createBinding$2 = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault$2 = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar$2 = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding$2(result, mod, k);
    __setModuleDefault$2(result, mod);
    return result;
};
Object.defineProperty(errors, "__esModule", { value: true });
errors.ZodRealError = errors.ZodError = void 0;
const core$2 = __importStar$2(core$4);
const index_js_1 = core$4;
const util = __importStar$2(util$3);
const initializer = (inst, issues) => {
    index_js_1.$ZodError.init(inst, issues);
    inst.name = "ZodError";
    Object.defineProperties(inst, {
        format: {
            value: (mapper) => core$2.formatError(inst, mapper),
            // enumerable: false,
        },
        flatten: {
            value: (mapper) => core$2.flattenError(inst, mapper),
            // enumerable: false,
        },
        addIssue: {
            value: (issue) => {
                inst.issues.push(issue);
                inst.message = JSON.stringify(inst.issues, util.jsonStringifyReplacer, 2);
            },
            // enumerable: false,
        },
        addIssues: {
            value: (issues) => {
                inst.issues.push(...issues);
                inst.message = JSON.stringify(inst.issues, util.jsonStringifyReplacer, 2);
            },
            // enumerable: false,
        },
        isEmpty: {
            get() {
                return inst.issues.length === 0;
            },
            // enumerable: false,
        },
    });
    // Object.defineProperty(inst, "isEmpty", {
    //   get() {
    //     return inst.issues.length === 0;
    //   },
    // });
};
errors.ZodError = core$2.$constructor("ZodError", initializer);
errors.ZodRealError = core$2.$constructor("ZodError", initializer, {
    Parent: Error,
});

var __createBinding$1 = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault$1 = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar$1 = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding$1(result, mod, k);
    __setModuleDefault$1(result, mod);
    return result;
};
Object.defineProperty(parse, "__esModule", { value: true });
parse.safeDecodeAsync = parse.safeEncodeAsync = parse.safeDecode = parse.safeEncode = parse.decodeAsync = parse.encodeAsync = parse.decode = parse.encode = parse.safeParseAsync = parse.safeParse = parse.parseAsync = parse.parse = void 0;
const core$1 = __importStar$1(core$4);
const errors_js_1 = errors;
parse.parse = core$1._parse(errors_js_1.ZodRealError);
parse.parseAsync = core$1._parseAsync(errors_js_1.ZodRealError);
parse.safeParse = core$1._safeParse(errors_js_1.ZodRealError);
parse.safeParseAsync = core$1._safeParseAsync(errors_js_1.ZodRealError);
// Codec functions
parse.encode = core$1._encode(errors_js_1.ZodRealError);
parse.decode = core$1._decode(errors_js_1.ZodRealError);
parse.encodeAsync = core$1._encodeAsync(errors_js_1.ZodRealError);
parse.decodeAsync = core$1._decodeAsync(errors_js_1.ZodRealError);
parse.safeEncode = core$1._safeEncode(errors_js_1.ZodRealError);
parse.safeDecode = core$1._safeDecode(errors_js_1.ZodRealError);
parse.safeEncodeAsync = core$1._safeEncodeAsync(errors_js_1.ZodRealError);
parse.safeDecodeAsync = core$1._safeDecodeAsync(errors_js_1.ZodRealError);

var hasRequiredSchemas;

function requireSchemas () {
	if (hasRequiredSchemas) return schemas$1;
	hasRequiredSchemas = 1;
	(function (exports) {
		var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    var desc = Object.getOwnPropertyDescriptor(m, k);
		    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
		      desc = { enumerable: true, get: function() { return m[k]; } };
		    }
		    Object.defineProperty(o, k2, desc);
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
		    Object.defineProperty(o, "default", { enumerable: true, value: v });
		}) : function(o, v) {
		    o["default"] = v;
		});
		var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
		    if (mod && mod.__esModule) return mod;
		    var result = {};
		    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		    __setModuleDefault(result, mod);
		    return result;
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.ZodTransform = exports.ZodFile = exports.ZodLiteral = exports.ZodEnum = exports.ZodSet = exports.ZodMap = exports.ZodRecord = exports.ZodTuple = exports.ZodIntersection = exports.ZodDiscriminatedUnion = exports.ZodUnion = exports.ZodObject = exports.ZodArray = exports.ZodDate = exports.ZodVoid = exports.ZodNever = exports.ZodUnknown = exports.ZodAny = exports.ZodNull = exports.ZodUndefined = exports.ZodSymbol = exports.ZodBigIntFormat = exports.ZodBigInt = exports.ZodBoolean = exports.ZodNumberFormat = exports.ZodNumber = exports.ZodCustomStringFormat = exports.ZodJWT = exports.ZodE164 = exports.ZodBase64URL = exports.ZodBase64 = exports.ZodCIDRv6 = exports.ZodCIDRv4 = exports.ZodIPv6 = exports.ZodIPv4 = exports.ZodKSUID = exports.ZodXID = exports.ZodULID = exports.ZodCUID2 = exports.ZodCUID = exports.ZodNanoID = exports.ZodEmoji = exports.ZodURL = exports.ZodUUID = exports.ZodGUID = exports.ZodEmail = exports.ZodStringFormat = exports.ZodString = exports._ZodString = exports.ZodType = void 0;
		exports.stringbool = exports.ZodCustom = exports.ZodFunction = exports.ZodPromise = exports.ZodLazy = exports.ZodTemplateLiteral = exports.ZodReadonly = exports.ZodCodec = exports.ZodPipe = exports.ZodNaN = exports.ZodCatch = exports.ZodSuccess = exports.ZodNonOptional = exports.ZodPrefault = exports.ZodDefault = exports.ZodNullable = exports.ZodOptional = void 0;
		exports.string = string;
		exports.email = email;
		exports.guid = guid;
		exports.uuid = uuid;
		exports.uuidv4 = uuidv4;
		exports.uuidv6 = uuidv6;
		exports.uuidv7 = uuidv7;
		exports.url = url;
		exports.httpUrl = httpUrl;
		exports.emoji = emoji;
		exports.nanoid = nanoid;
		exports.cuid = cuid;
		exports.cuid2 = cuid2;
		exports.ulid = ulid;
		exports.xid = xid;
		exports.ksuid = ksuid;
		exports.ipv4 = ipv4;
		exports.ipv6 = ipv6;
		exports.cidrv4 = cidrv4;
		exports.cidrv6 = cidrv6;
		exports.base64 = base64;
		exports.base64url = base64url;
		exports.e164 = e164;
		exports.jwt = jwt;
		exports.stringFormat = stringFormat;
		exports.hostname = hostname;
		exports.hex = hex;
		exports.hash = hash;
		exports.number = number;
		exports.int = int;
		exports.float32 = float32;
		exports.float64 = float64;
		exports.int32 = int32;
		exports.uint32 = uint32;
		exports.boolean = boolean;
		exports.bigint = bigint;
		exports.int64 = int64;
		exports.uint64 = uint64;
		exports.symbol = symbol;
		exports.undefined = _undefined;
		exports.null = _null;
		exports.any = any;
		exports.unknown = unknown;
		exports.never = never;
		exports.void = _void;
		exports.date = date;
		exports.array = array;
		exports.keyof = keyof;
		exports.object = object;
		exports.strictObject = strictObject;
		exports.looseObject = looseObject;
		exports.union = union;
		exports.discriminatedUnion = discriminatedUnion;
		exports.intersection = intersection;
		exports.tuple = tuple;
		exports.record = record;
		exports.partialRecord = partialRecord;
		exports.map = map;
		exports.set = set;
		exports.enum = _enum;
		exports.nativeEnum = nativeEnum;
		exports.literal = literal;
		exports.file = file;
		exports.transform = transform;
		exports.optional = optional;
		exports.nullable = nullable;
		exports.nullish = nullish;
		exports._default = _default;
		exports.prefault = prefault;
		exports.nonoptional = nonoptional;
		exports.success = success;
		exports.catch = _catch;
		exports.nan = nan;
		exports.pipe = pipe;
		exports.codec = codec;
		exports.readonly = readonly;
		exports.templateLiteral = templateLiteral;
		exports.lazy = lazy;
		exports.promise = promise;
		exports._function = _function;
		exports.function = _function;
		exports._function = _function;
		exports.function = _function;
		exports.check = check;
		exports.custom = custom;
		exports.refine = refine;
		exports.superRefine = superRefine;
		exports.instanceof = _instanceof;
		exports.json = json;
		exports.preprocess = preprocess;
		const core = __importStar(core$4);
		const index_js_1 = core$4;
		const checks$1 = __importStar(checks);
		const iso = __importStar(requireIso());
		const parse$1 = __importStar(parse);
		exports.ZodType = core.$constructor("ZodType", (inst, def) => {
		    core.$ZodType.init(inst, def);
		    inst.def = def;
		    inst.type = def.type;
		    Object.defineProperty(inst, "_def", { value: def });
		    // base methods
		    inst.check = (...checks) => {
		        return inst.clone({
		            ...def,
		            checks: [
		                ...(def.checks ?? []),
		                ...checks.map((ch) => typeof ch === "function" ? { _zod: { check: ch, def: { check: "custom" }, onattach: [] } } : ch),
		            ],
		        }
		        // { parent: true }
		        );
		    };
		    inst.clone = (def, params) => core.clone(inst, def, params);
		    inst.brand = () => inst;
		    inst.register = ((reg, meta) => {
		        reg.add(inst, meta);
		        return inst;
		    });
		    // parsing
		    inst.parse = (data, params) => parse$1.parse(inst, data, params, { callee: inst.parse });
		    inst.safeParse = (data, params) => parse$1.safeParse(inst, data, params);
		    inst.parseAsync = async (data, params) => parse$1.parseAsync(inst, data, params, { callee: inst.parseAsync });
		    inst.safeParseAsync = async (data, params) => parse$1.safeParseAsync(inst, data, params);
		    inst.spa = inst.safeParseAsync;
		    // encoding/decoding
		    inst.encode = (data, params) => parse$1.encode(inst, data, params);
		    inst.decode = (data, params) => parse$1.decode(inst, data, params);
		    inst.encodeAsync = async (data, params) => parse$1.encodeAsync(inst, data, params);
		    inst.decodeAsync = async (data, params) => parse$1.decodeAsync(inst, data, params);
		    inst.safeEncode = (data, params) => parse$1.safeEncode(inst, data, params);
		    inst.safeDecode = (data, params) => parse$1.safeDecode(inst, data, params);
		    inst.safeEncodeAsync = async (data, params) => parse$1.safeEncodeAsync(inst, data, params);
		    inst.safeDecodeAsync = async (data, params) => parse$1.safeDecodeAsync(inst, data, params);
		    // refinements
		    inst.refine = (check, params) => inst.check(refine(check, params));
		    inst.superRefine = (refinement) => inst.check(superRefine(refinement));
		    inst.overwrite = (fn) => inst.check(checks$1.overwrite(fn));
		    // wrappers
		    inst.optional = () => optional(inst);
		    inst.nullable = () => nullable(inst);
		    inst.nullish = () => optional(nullable(inst));
		    inst.nonoptional = (params) => nonoptional(inst, params);
		    inst.array = () => array(inst);
		    inst.or = (arg) => union([inst, arg]);
		    inst.and = (arg) => intersection(inst, arg);
		    inst.transform = (tx) => pipe(inst, transform(tx));
		    inst.default = (def) => _default(inst, def);
		    inst.prefault = (def) => prefault(inst, def);
		    // inst.coalesce = (def, params) => coalesce(inst, def, params);
		    inst.catch = (params) => _catch(inst, params);
		    inst.pipe = (target) => pipe(inst, target);
		    inst.readonly = () => readonly(inst);
		    // meta
		    inst.describe = (description) => {
		        const cl = inst.clone();
		        core.globalRegistry.add(cl, { description });
		        return cl;
		    };
		    Object.defineProperty(inst, "description", {
		        get() {
		            return core.globalRegistry.get(inst)?.description;
		        },
		        configurable: true,
		    });
		    inst.meta = (...args) => {
		        if (args.length === 0) {
		            return core.globalRegistry.get(inst);
		        }
		        const cl = inst.clone();
		        core.globalRegistry.add(cl, args[0]);
		        return cl;
		    };
		    // helpers
		    inst.isOptional = () => inst.safeParse(undefined).success;
		    inst.isNullable = () => inst.safeParse(null).success;
		    return inst;
		});
		/** @internal */
		exports._ZodString = core.$constructor("_ZodString", (inst, def) => {
		    core.$ZodString.init(inst, def);
		    exports.ZodType.init(inst, def);
		    const bag = inst._zod.bag;
		    inst.format = bag.format ?? null;
		    inst.minLength = bag.minimum ?? null;
		    inst.maxLength = bag.maximum ?? null;
		    // validations
		    inst.regex = (...args) => inst.check(checks$1.regex(...args));
		    inst.includes = (...args) => inst.check(checks$1.includes(...args));
		    inst.startsWith = (...args) => inst.check(checks$1.startsWith(...args));
		    inst.endsWith = (...args) => inst.check(checks$1.endsWith(...args));
		    inst.min = (...args) => inst.check(checks$1.minLength(...args));
		    inst.max = (...args) => inst.check(checks$1.maxLength(...args));
		    inst.length = (...args) => inst.check(checks$1.length(...args));
		    inst.nonempty = (...args) => inst.check(checks$1.minLength(1, ...args));
		    inst.lowercase = (params) => inst.check(checks$1.lowercase(params));
		    inst.uppercase = (params) => inst.check(checks$1.uppercase(params));
		    // transforms
		    inst.trim = () => inst.check(checks$1.trim());
		    inst.normalize = (...args) => inst.check(checks$1.normalize(...args));
		    inst.toLowerCase = () => inst.check(checks$1.toLowerCase());
		    inst.toUpperCase = () => inst.check(checks$1.toUpperCase());
		});
		exports.ZodString = core.$constructor("ZodString", (inst, def) => {
		    core.$ZodString.init(inst, def);
		    exports._ZodString.init(inst, def);
		    inst.email = (params) => inst.check(core._email(exports.ZodEmail, params));
		    inst.url = (params) => inst.check(core._url(exports.ZodURL, params));
		    inst.jwt = (params) => inst.check(core._jwt(exports.ZodJWT, params));
		    inst.emoji = (params) => inst.check(core._emoji(exports.ZodEmoji, params));
		    inst.guid = (params) => inst.check(core._guid(exports.ZodGUID, params));
		    inst.uuid = (params) => inst.check(core._uuid(exports.ZodUUID, params));
		    inst.uuidv4 = (params) => inst.check(core._uuidv4(exports.ZodUUID, params));
		    inst.uuidv6 = (params) => inst.check(core._uuidv6(exports.ZodUUID, params));
		    inst.uuidv7 = (params) => inst.check(core._uuidv7(exports.ZodUUID, params));
		    inst.nanoid = (params) => inst.check(core._nanoid(exports.ZodNanoID, params));
		    inst.guid = (params) => inst.check(core._guid(exports.ZodGUID, params));
		    inst.cuid = (params) => inst.check(core._cuid(exports.ZodCUID, params));
		    inst.cuid2 = (params) => inst.check(core._cuid2(exports.ZodCUID2, params));
		    inst.ulid = (params) => inst.check(core._ulid(exports.ZodULID, params));
		    inst.base64 = (params) => inst.check(core._base64(exports.ZodBase64, params));
		    inst.base64url = (params) => inst.check(core._base64url(exports.ZodBase64URL, params));
		    inst.xid = (params) => inst.check(core._xid(exports.ZodXID, params));
		    inst.ksuid = (params) => inst.check(core._ksuid(exports.ZodKSUID, params));
		    inst.ipv4 = (params) => inst.check(core._ipv4(exports.ZodIPv4, params));
		    inst.ipv6 = (params) => inst.check(core._ipv6(exports.ZodIPv6, params));
		    inst.cidrv4 = (params) => inst.check(core._cidrv4(exports.ZodCIDRv4, params));
		    inst.cidrv6 = (params) => inst.check(core._cidrv6(exports.ZodCIDRv6, params));
		    inst.e164 = (params) => inst.check(core._e164(exports.ZodE164, params));
		    // iso
		    inst.datetime = (params) => inst.check(iso.datetime(params));
		    inst.date = (params) => inst.check(iso.date(params));
		    inst.time = (params) => inst.check(iso.time(params));
		    inst.duration = (params) => inst.check(iso.duration(params));
		});
		function string(params) {
		    return core._string(exports.ZodString, params);
		}
		exports.ZodStringFormat = core.$constructor("ZodStringFormat", (inst, def) => {
		    core.$ZodStringFormat.init(inst, def);
		    exports._ZodString.init(inst, def);
		});
		exports.ZodEmail = core.$constructor("ZodEmail", (inst, def) => {
		    // ZodStringFormat.init(inst, def);
		    core.$ZodEmail.init(inst, def);
		    exports.ZodStringFormat.init(inst, def);
		});
		function email(params) {
		    return core._email(exports.ZodEmail, params);
		}
		exports.ZodGUID = core.$constructor("ZodGUID", (inst, def) => {
		    // ZodStringFormat.init(inst, def);
		    core.$ZodGUID.init(inst, def);
		    exports.ZodStringFormat.init(inst, def);
		});
		function guid(params) {
		    return core._guid(exports.ZodGUID, params);
		}
		exports.ZodUUID = core.$constructor("ZodUUID", (inst, def) => {
		    // ZodStringFormat.init(inst, def);
		    core.$ZodUUID.init(inst, def);
		    exports.ZodStringFormat.init(inst, def);
		});
		function uuid(params) {
		    return core._uuid(exports.ZodUUID, params);
		}
		function uuidv4(params) {
		    return core._uuidv4(exports.ZodUUID, params);
		}
		// ZodUUIDv6
		function uuidv6(params) {
		    return core._uuidv6(exports.ZodUUID, params);
		}
		// ZodUUIDv7
		function uuidv7(params) {
		    return core._uuidv7(exports.ZodUUID, params);
		}
		exports.ZodURL = core.$constructor("ZodURL", (inst, def) => {
		    // ZodStringFormat.init(inst, def);
		    core.$ZodURL.init(inst, def);
		    exports.ZodStringFormat.init(inst, def);
		});
		function url(params) {
		    return core._url(exports.ZodURL, params);
		}
		function httpUrl(params) {
		    return core._url(exports.ZodURL, {
		        protocol: /^https?$/,
		        hostname: core.regexes.domain,
		        ...index_js_1.util.normalizeParams(params),
		    });
		}
		exports.ZodEmoji = core.$constructor("ZodEmoji", (inst, def) => {
		    // ZodStringFormat.init(inst, def);
		    core.$ZodEmoji.init(inst, def);
		    exports.ZodStringFormat.init(inst, def);
		});
		function emoji(params) {
		    return core._emoji(exports.ZodEmoji, params);
		}
		exports.ZodNanoID = core.$constructor("ZodNanoID", (inst, def) => {
		    // ZodStringFormat.init(inst, def);
		    core.$ZodNanoID.init(inst, def);
		    exports.ZodStringFormat.init(inst, def);
		});
		function nanoid(params) {
		    return core._nanoid(exports.ZodNanoID, params);
		}
		exports.ZodCUID = core.$constructor("ZodCUID", (inst, def) => {
		    // ZodStringFormat.init(inst, def);
		    core.$ZodCUID.init(inst, def);
		    exports.ZodStringFormat.init(inst, def);
		});
		function cuid(params) {
		    return core._cuid(exports.ZodCUID, params);
		}
		exports.ZodCUID2 = core.$constructor("ZodCUID2", (inst, def) => {
		    // ZodStringFormat.init(inst, def);
		    core.$ZodCUID2.init(inst, def);
		    exports.ZodStringFormat.init(inst, def);
		});
		function cuid2(params) {
		    return core._cuid2(exports.ZodCUID2, params);
		}
		exports.ZodULID = core.$constructor("ZodULID", (inst, def) => {
		    // ZodStringFormat.init(inst, def);
		    core.$ZodULID.init(inst, def);
		    exports.ZodStringFormat.init(inst, def);
		});
		function ulid(params) {
		    return core._ulid(exports.ZodULID, params);
		}
		exports.ZodXID = core.$constructor("ZodXID", (inst, def) => {
		    // ZodStringFormat.init(inst, def);
		    core.$ZodXID.init(inst, def);
		    exports.ZodStringFormat.init(inst, def);
		});
		function xid(params) {
		    return core._xid(exports.ZodXID, params);
		}
		exports.ZodKSUID = core.$constructor("ZodKSUID", (inst, def) => {
		    // ZodStringFormat.init(inst, def);
		    core.$ZodKSUID.init(inst, def);
		    exports.ZodStringFormat.init(inst, def);
		});
		function ksuid(params) {
		    return core._ksuid(exports.ZodKSUID, params);
		}
		exports.ZodIPv4 = core.$constructor("ZodIPv4", (inst, def) => {
		    // ZodStringFormat.init(inst, def);
		    core.$ZodIPv4.init(inst, def);
		    exports.ZodStringFormat.init(inst, def);
		});
		function ipv4(params) {
		    return core._ipv4(exports.ZodIPv4, params);
		}
		exports.ZodIPv6 = core.$constructor("ZodIPv6", (inst, def) => {
		    // ZodStringFormat.init(inst, def);
		    core.$ZodIPv6.init(inst, def);
		    exports.ZodStringFormat.init(inst, def);
		});
		function ipv6(params) {
		    return core._ipv6(exports.ZodIPv6, params);
		}
		exports.ZodCIDRv4 = core.$constructor("ZodCIDRv4", (inst, def) => {
		    core.$ZodCIDRv4.init(inst, def);
		    exports.ZodStringFormat.init(inst, def);
		});
		function cidrv4(params) {
		    return core._cidrv4(exports.ZodCIDRv4, params);
		}
		exports.ZodCIDRv6 = core.$constructor("ZodCIDRv6", (inst, def) => {
		    core.$ZodCIDRv6.init(inst, def);
		    exports.ZodStringFormat.init(inst, def);
		});
		function cidrv6(params) {
		    return core._cidrv6(exports.ZodCIDRv6, params);
		}
		exports.ZodBase64 = core.$constructor("ZodBase64", (inst, def) => {
		    // ZodStringFormat.init(inst, def);
		    core.$ZodBase64.init(inst, def);
		    exports.ZodStringFormat.init(inst, def);
		});
		function base64(params) {
		    return core._base64(exports.ZodBase64, params);
		}
		exports.ZodBase64URL = core.$constructor("ZodBase64URL", (inst, def) => {
		    // ZodStringFormat.init(inst, def);
		    core.$ZodBase64URL.init(inst, def);
		    exports.ZodStringFormat.init(inst, def);
		});
		function base64url(params) {
		    return core._base64url(exports.ZodBase64URL, params);
		}
		exports.ZodE164 = core.$constructor("ZodE164", (inst, def) => {
		    // ZodStringFormat.init(inst, def);
		    core.$ZodE164.init(inst, def);
		    exports.ZodStringFormat.init(inst, def);
		});
		function e164(params) {
		    return core._e164(exports.ZodE164, params);
		}
		exports.ZodJWT = core.$constructor("ZodJWT", (inst, def) => {
		    // ZodStringFormat.init(inst, def);
		    core.$ZodJWT.init(inst, def);
		    exports.ZodStringFormat.init(inst, def);
		});
		function jwt(params) {
		    return core._jwt(exports.ZodJWT, params);
		}
		exports.ZodCustomStringFormat = core.$constructor("ZodCustomStringFormat", (inst, def) => {
		    // ZodStringFormat.init(inst, def);
		    core.$ZodCustomStringFormat.init(inst, def);
		    exports.ZodStringFormat.init(inst, def);
		});
		function stringFormat(format, fnOrRegex, _params = {}) {
		    return core._stringFormat(exports.ZodCustomStringFormat, format, fnOrRegex, _params);
		}
		function hostname(_params) {
		    return core._stringFormat(exports.ZodCustomStringFormat, "hostname", core.regexes.hostname, _params);
		}
		function hex(_params) {
		    return core._stringFormat(exports.ZodCustomStringFormat, "hex", core.regexes.hex, _params);
		}
		function hash(alg, params) {
		    const enc = params?.enc ?? "hex";
		    const format = `${alg}_${enc}`;
		    const regex = core.regexes[format];
		    if (!regex)
		        throw new Error(`Unrecognized hash format: ${format}`);
		    return core._stringFormat(exports.ZodCustomStringFormat, format, regex, params);
		}
		exports.ZodNumber = core.$constructor("ZodNumber", (inst, def) => {
		    core.$ZodNumber.init(inst, def);
		    exports.ZodType.init(inst, def);
		    inst.gt = (value, params) => inst.check(checks$1.gt(value, params));
		    inst.gte = (value, params) => inst.check(checks$1.gte(value, params));
		    inst.min = (value, params) => inst.check(checks$1.gte(value, params));
		    inst.lt = (value, params) => inst.check(checks$1.lt(value, params));
		    inst.lte = (value, params) => inst.check(checks$1.lte(value, params));
		    inst.max = (value, params) => inst.check(checks$1.lte(value, params));
		    inst.int = (params) => inst.check(int(params));
		    inst.safe = (params) => inst.check(int(params));
		    inst.positive = (params) => inst.check(checks$1.gt(0, params));
		    inst.nonnegative = (params) => inst.check(checks$1.gte(0, params));
		    inst.negative = (params) => inst.check(checks$1.lt(0, params));
		    inst.nonpositive = (params) => inst.check(checks$1.lte(0, params));
		    inst.multipleOf = (value, params) => inst.check(checks$1.multipleOf(value, params));
		    inst.step = (value, params) => inst.check(checks$1.multipleOf(value, params));
		    // inst.finite = (params) => inst.check(core.finite(params));
		    inst.finite = () => inst;
		    const bag = inst._zod.bag;
		    inst.minValue =
		        Math.max(bag.minimum ?? Number.NEGATIVE_INFINITY, bag.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null;
		    inst.maxValue =
		        Math.min(bag.maximum ?? Number.POSITIVE_INFINITY, bag.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null;
		    inst.isInt = (bag.format ?? "").includes("int") || Number.isSafeInteger(bag.multipleOf ?? 0.5);
		    inst.isFinite = true;
		    inst.format = bag.format ?? null;
		});
		function number(params) {
		    return core._number(exports.ZodNumber, params);
		}
		exports.ZodNumberFormat = core.$constructor("ZodNumberFormat", (inst, def) => {
		    core.$ZodNumberFormat.init(inst, def);
		    exports.ZodNumber.init(inst, def);
		});
		function int(params) {
		    return core._int(exports.ZodNumberFormat, params);
		}
		function float32(params) {
		    return core._float32(exports.ZodNumberFormat, params);
		}
		function float64(params) {
		    return core._float64(exports.ZodNumberFormat, params);
		}
		function int32(params) {
		    return core._int32(exports.ZodNumberFormat, params);
		}
		function uint32(params) {
		    return core._uint32(exports.ZodNumberFormat, params);
		}
		exports.ZodBoolean = core.$constructor("ZodBoolean", (inst, def) => {
		    core.$ZodBoolean.init(inst, def);
		    exports.ZodType.init(inst, def);
		});
		function boolean(params) {
		    return core._boolean(exports.ZodBoolean, params);
		}
		exports.ZodBigInt = core.$constructor("ZodBigInt", (inst, def) => {
		    core.$ZodBigInt.init(inst, def);
		    exports.ZodType.init(inst, def);
		    inst.gte = (value, params) => inst.check(checks$1.gte(value, params));
		    inst.min = (value, params) => inst.check(checks$1.gte(value, params));
		    inst.gt = (value, params) => inst.check(checks$1.gt(value, params));
		    inst.gte = (value, params) => inst.check(checks$1.gte(value, params));
		    inst.min = (value, params) => inst.check(checks$1.gte(value, params));
		    inst.lt = (value, params) => inst.check(checks$1.lt(value, params));
		    inst.lte = (value, params) => inst.check(checks$1.lte(value, params));
		    inst.max = (value, params) => inst.check(checks$1.lte(value, params));
		    inst.positive = (params) => inst.check(checks$1.gt(BigInt(0), params));
		    inst.negative = (params) => inst.check(checks$1.lt(BigInt(0), params));
		    inst.nonpositive = (params) => inst.check(checks$1.lte(BigInt(0), params));
		    inst.nonnegative = (params) => inst.check(checks$1.gte(BigInt(0), params));
		    inst.multipleOf = (value, params) => inst.check(checks$1.multipleOf(value, params));
		    const bag = inst._zod.bag;
		    inst.minValue = bag.minimum ?? null;
		    inst.maxValue = bag.maximum ?? null;
		    inst.format = bag.format ?? null;
		});
		function bigint(params) {
		    return core._bigint(exports.ZodBigInt, params);
		}
		exports.ZodBigIntFormat = core.$constructor("ZodBigIntFormat", (inst, def) => {
		    core.$ZodBigIntFormat.init(inst, def);
		    exports.ZodBigInt.init(inst, def);
		});
		// int64
		function int64(params) {
		    return core._int64(exports.ZodBigIntFormat, params);
		}
		// uint64
		function uint64(params) {
		    return core._uint64(exports.ZodBigIntFormat, params);
		}
		exports.ZodSymbol = core.$constructor("ZodSymbol", (inst, def) => {
		    core.$ZodSymbol.init(inst, def);
		    exports.ZodType.init(inst, def);
		});
		function symbol(params) {
		    return core._symbol(exports.ZodSymbol, params);
		}
		exports.ZodUndefined = core.$constructor("ZodUndefined", (inst, def) => {
		    core.$ZodUndefined.init(inst, def);
		    exports.ZodType.init(inst, def);
		});
		function _undefined(params) {
		    return core._undefined(exports.ZodUndefined, params);
		}
		exports.ZodNull = core.$constructor("ZodNull", (inst, def) => {
		    core.$ZodNull.init(inst, def);
		    exports.ZodType.init(inst, def);
		});
		function _null(params) {
		    return core._null(exports.ZodNull, params);
		}
		exports.ZodAny = core.$constructor("ZodAny", (inst, def) => {
		    core.$ZodAny.init(inst, def);
		    exports.ZodType.init(inst, def);
		});
		function any() {
		    return core._any(exports.ZodAny);
		}
		exports.ZodUnknown = core.$constructor("ZodUnknown", (inst, def) => {
		    core.$ZodUnknown.init(inst, def);
		    exports.ZodType.init(inst, def);
		});
		function unknown() {
		    return core._unknown(exports.ZodUnknown);
		}
		exports.ZodNever = core.$constructor("ZodNever", (inst, def) => {
		    core.$ZodNever.init(inst, def);
		    exports.ZodType.init(inst, def);
		});
		function never(params) {
		    return core._never(exports.ZodNever, params);
		}
		exports.ZodVoid = core.$constructor("ZodVoid", (inst, def) => {
		    core.$ZodVoid.init(inst, def);
		    exports.ZodType.init(inst, def);
		});
		function _void(params) {
		    return core._void(exports.ZodVoid, params);
		}
		exports.ZodDate = core.$constructor("ZodDate", (inst, def) => {
		    core.$ZodDate.init(inst, def);
		    exports.ZodType.init(inst, def);
		    inst.min = (value, params) => inst.check(checks$1.gte(value, params));
		    inst.max = (value, params) => inst.check(checks$1.lte(value, params));
		    const c = inst._zod.bag;
		    inst.minDate = c.minimum ? new Date(c.minimum) : null;
		    inst.maxDate = c.maximum ? new Date(c.maximum) : null;
		});
		function date(params) {
		    return core._date(exports.ZodDate, params);
		}
		exports.ZodArray = core.$constructor("ZodArray", (inst, def) => {
		    core.$ZodArray.init(inst, def);
		    exports.ZodType.init(inst, def);
		    inst.element = def.element;
		    inst.min = (minLength, params) => inst.check(checks$1.minLength(minLength, params));
		    inst.nonempty = (params) => inst.check(checks$1.minLength(1, params));
		    inst.max = (maxLength, params) => inst.check(checks$1.maxLength(maxLength, params));
		    inst.length = (len, params) => inst.check(checks$1.length(len, params));
		    inst.unwrap = () => inst.element;
		});
		function array(element, params) {
		    return core._array(exports.ZodArray, element, params);
		}
		// .keyof
		function keyof(schema) {
		    const shape = schema._zod.def.shape;
		    return _enum(Object.keys(shape));
		}
		exports.ZodObject = core.$constructor("ZodObject", (inst, def) => {
		    core.$ZodObjectJIT.init(inst, def);
		    exports.ZodType.init(inst, def);
		    index_js_1.util.defineLazy(inst, "shape", () => def.shape);
		    inst.keyof = () => _enum(Object.keys(inst._zod.def.shape));
		    inst.catchall = (catchall) => inst.clone({ ...inst._zod.def, catchall: catchall });
		    inst.passthrough = () => inst.clone({ ...inst._zod.def, catchall: unknown() });
		    inst.loose = () => inst.clone({ ...inst._zod.def, catchall: unknown() });
		    inst.strict = () => inst.clone({ ...inst._zod.def, catchall: never() });
		    inst.strip = () => inst.clone({ ...inst._zod.def, catchall: undefined });
		    inst.extend = (incoming) => {
		        return index_js_1.util.extend(inst, incoming);
		    };
		    inst.safeExtend = (incoming) => {
		        return index_js_1.util.safeExtend(inst, incoming);
		    };
		    inst.merge = (other) => index_js_1.util.merge(inst, other);
		    inst.pick = (mask) => index_js_1.util.pick(inst, mask);
		    inst.omit = (mask) => index_js_1.util.omit(inst, mask);
		    inst.partial = (...args) => index_js_1.util.partial(exports.ZodOptional, inst, args[0]);
		    inst.required = (...args) => index_js_1.util.required(exports.ZodNonOptional, inst, args[0]);
		});
		function object(shape, params) {
		    const def = {
		        type: "object",
		        get shape() {
		            index_js_1.util.assignProp(this, "shape", shape ? index_js_1.util.objectClone(shape) : {});
		            return this.shape;
		        },
		        ...index_js_1.util.normalizeParams(params),
		    };
		    return new exports.ZodObject(def);
		}
		// strictObject
		function strictObject(shape, params) {
		    return new exports.ZodObject({
		        type: "object",
		        get shape() {
		            index_js_1.util.assignProp(this, "shape", index_js_1.util.objectClone(shape));
		            return this.shape;
		        },
		        catchall: never(),
		        ...index_js_1.util.normalizeParams(params),
		    });
		}
		// looseObject
		function looseObject(shape, params) {
		    return new exports.ZodObject({
		        type: "object",
		        get shape() {
		            index_js_1.util.assignProp(this, "shape", index_js_1.util.objectClone(shape));
		            return this.shape;
		        },
		        catchall: unknown(),
		        ...index_js_1.util.normalizeParams(params),
		    });
		}
		exports.ZodUnion = core.$constructor("ZodUnion", (inst, def) => {
		    core.$ZodUnion.init(inst, def);
		    exports.ZodType.init(inst, def);
		    inst.options = def.options;
		});
		function union(options, params) {
		    return new exports.ZodUnion({
		        type: "union",
		        options: options,
		        ...index_js_1.util.normalizeParams(params),
		    });
		}
		exports.ZodDiscriminatedUnion = core.$constructor("ZodDiscriminatedUnion", (inst, def) => {
		    exports.ZodUnion.init(inst, def);
		    core.$ZodDiscriminatedUnion.init(inst, def);
		});
		function discriminatedUnion(discriminator, options, params) {
		    // const [options, params] = args;
		    return new exports.ZodDiscriminatedUnion({
		        type: "union",
		        options,
		        discriminator,
		        ...index_js_1.util.normalizeParams(params),
		    });
		}
		exports.ZodIntersection = core.$constructor("ZodIntersection", (inst, def) => {
		    core.$ZodIntersection.init(inst, def);
		    exports.ZodType.init(inst, def);
		});
		function intersection(left, right) {
		    return new exports.ZodIntersection({
		        type: "intersection",
		        left: left,
		        right: right,
		    });
		}
		exports.ZodTuple = core.$constructor("ZodTuple", (inst, def) => {
		    core.$ZodTuple.init(inst, def);
		    exports.ZodType.init(inst, def);
		    inst.rest = (rest) => inst.clone({
		        ...inst._zod.def,
		        rest: rest,
		    });
		});
		function tuple(items, _paramsOrRest, _params) {
		    const hasRest = _paramsOrRest instanceof core.$ZodType;
		    const params = hasRest ? _params : _paramsOrRest;
		    const rest = hasRest ? _paramsOrRest : null;
		    return new exports.ZodTuple({
		        type: "tuple",
		        items: items,
		        rest,
		        ...index_js_1.util.normalizeParams(params),
		    });
		}
		exports.ZodRecord = core.$constructor("ZodRecord", (inst, def) => {
		    core.$ZodRecord.init(inst, def);
		    exports.ZodType.init(inst, def);
		    inst.keyType = def.keyType;
		    inst.valueType = def.valueType;
		});
		function record(keyType, valueType, params) {
		    return new exports.ZodRecord({
		        type: "record",
		        keyType,
		        valueType: valueType,
		        ...index_js_1.util.normalizeParams(params),
		    });
		}
		// type alksjf = core.output<core.$ZodRecordKey>;
		function partialRecord(keyType, valueType, params) {
		    const k = core.clone(keyType);
		    k._zod.values = undefined;
		    return new exports.ZodRecord({
		        type: "record",
		        keyType: k,
		        valueType: valueType,
		        ...index_js_1.util.normalizeParams(params),
		    });
		}
		exports.ZodMap = core.$constructor("ZodMap", (inst, def) => {
		    core.$ZodMap.init(inst, def);
		    exports.ZodType.init(inst, def);
		    inst.keyType = def.keyType;
		    inst.valueType = def.valueType;
		});
		function map(keyType, valueType, params) {
		    return new exports.ZodMap({
		        type: "map",
		        keyType: keyType,
		        valueType: valueType,
		        ...index_js_1.util.normalizeParams(params),
		    });
		}
		exports.ZodSet = core.$constructor("ZodSet", (inst, def) => {
		    core.$ZodSet.init(inst, def);
		    exports.ZodType.init(inst, def);
		    inst.min = (...args) => inst.check(core._minSize(...args));
		    inst.nonempty = (params) => inst.check(core._minSize(1, params));
		    inst.max = (...args) => inst.check(core._maxSize(...args));
		    inst.size = (...args) => inst.check(core._size(...args));
		});
		function set(valueType, params) {
		    return new exports.ZodSet({
		        type: "set",
		        valueType: valueType,
		        ...index_js_1.util.normalizeParams(params),
		    });
		}
		exports.ZodEnum = core.$constructor("ZodEnum", (inst, def) => {
		    core.$ZodEnum.init(inst, def);
		    exports.ZodType.init(inst, def);
		    inst.enum = def.entries;
		    inst.options = Object.values(def.entries);
		    const keys = new Set(Object.keys(def.entries));
		    inst.extract = (values, params) => {
		        const newEntries = {};
		        for (const value of values) {
		            if (keys.has(value)) {
		                newEntries[value] = def.entries[value];
		            }
		            else
		                throw new Error(`Key ${value} not found in enum`);
		        }
		        return new exports.ZodEnum({
		            ...def,
		            checks: [],
		            ...index_js_1.util.normalizeParams(params),
		            entries: newEntries,
		        });
		    };
		    inst.exclude = (values, params) => {
		        const newEntries = { ...def.entries };
		        for (const value of values) {
		            if (keys.has(value)) {
		                delete newEntries[value];
		            }
		            else
		                throw new Error(`Key ${value} not found in enum`);
		        }
		        return new exports.ZodEnum({
		            ...def,
		            checks: [],
		            ...index_js_1.util.normalizeParams(params),
		            entries: newEntries,
		        });
		    };
		});
		function _enum(values, params) {
		    const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
		    return new exports.ZodEnum({
		        type: "enum",
		        entries,
		        ...index_js_1.util.normalizeParams(params),
		    });
		}
		/** @deprecated This API has been merged into `z.enum()`. Use `z.enum()` instead.
		 *
		 * ```ts
		 * enum Colors { red, green, blue }
		 * z.enum(Colors);
		 * ```
		 */
		function nativeEnum(entries, params) {
		    return new exports.ZodEnum({
		        type: "enum",
		        entries,
		        ...index_js_1.util.normalizeParams(params),
		    });
		}
		exports.ZodLiteral = core.$constructor("ZodLiteral", (inst, def) => {
		    core.$ZodLiteral.init(inst, def);
		    exports.ZodType.init(inst, def);
		    inst.values = new Set(def.values);
		    Object.defineProperty(inst, "value", {
		        get() {
		            if (def.values.length > 1) {
		                throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
		            }
		            return def.values[0];
		        },
		    });
		});
		function literal(value, params) {
		    return new exports.ZodLiteral({
		        type: "literal",
		        values: Array.isArray(value) ? value : [value],
		        ...index_js_1.util.normalizeParams(params),
		    });
		}
		exports.ZodFile = core.$constructor("ZodFile", (inst, def) => {
		    core.$ZodFile.init(inst, def);
		    exports.ZodType.init(inst, def);
		    inst.min = (size, params) => inst.check(core._minSize(size, params));
		    inst.max = (size, params) => inst.check(core._maxSize(size, params));
		    inst.mime = (types, params) => inst.check(core._mime(Array.isArray(types) ? types : [types], params));
		});
		function file(params) {
		    return core._file(exports.ZodFile, params);
		}
		exports.ZodTransform = core.$constructor("ZodTransform", (inst, def) => {
		    core.$ZodTransform.init(inst, def);
		    exports.ZodType.init(inst, def);
		    inst._zod.parse = (payload, _ctx) => {
		        if (_ctx.direction === "backward") {
		            throw new core.$ZodEncodeError(inst.constructor.name);
		        }
		        payload.addIssue = (issue) => {
		            if (typeof issue === "string") {
		                payload.issues.push(index_js_1.util.issue(issue, payload.value, def));
		            }
		            else {
		                // for Zod 3 backwards compatibility
		                const _issue = issue;
		                if (_issue.fatal)
		                    _issue.continue = false;
		                _issue.code ?? (_issue.code = "custom");
		                _issue.input ?? (_issue.input = payload.value);
		                _issue.inst ?? (_issue.inst = inst);
		                // _issue.continue ??= true;
		                payload.issues.push(index_js_1.util.issue(_issue));
		            }
		        };
		        const output = def.transform(payload.value, payload);
		        if (output instanceof Promise) {
		            return output.then((output) => {
		                payload.value = output;
		                return payload;
		            });
		        }
		        payload.value = output;
		        return payload;
		    };
		});
		function transform(fn) {
		    return new exports.ZodTransform({
		        type: "transform",
		        transform: fn,
		    });
		}
		exports.ZodOptional = core.$constructor("ZodOptional", (inst, def) => {
		    core.$ZodOptional.init(inst, def);
		    exports.ZodType.init(inst, def);
		    inst.unwrap = () => inst._zod.def.innerType;
		});
		function optional(innerType) {
		    return new exports.ZodOptional({
		        type: "optional",
		        innerType: innerType,
		    });
		}
		exports.ZodNullable = core.$constructor("ZodNullable", (inst, def) => {
		    core.$ZodNullable.init(inst, def);
		    exports.ZodType.init(inst, def);
		    inst.unwrap = () => inst._zod.def.innerType;
		});
		function nullable(innerType) {
		    return new exports.ZodNullable({
		        type: "nullable",
		        innerType: innerType,
		    });
		}
		// nullish
		function nullish(innerType) {
		    return optional(nullable(innerType));
		}
		exports.ZodDefault = core.$constructor("ZodDefault", (inst, def) => {
		    core.$ZodDefault.init(inst, def);
		    exports.ZodType.init(inst, def);
		    inst.unwrap = () => inst._zod.def.innerType;
		    inst.removeDefault = inst.unwrap;
		});
		function _default(innerType, defaultValue) {
		    return new exports.ZodDefault({
		        type: "default",
		        innerType: innerType,
		        get defaultValue() {
		            return typeof defaultValue === "function" ? defaultValue() : index_js_1.util.shallowClone(defaultValue);
		        },
		    });
		}
		exports.ZodPrefault = core.$constructor("ZodPrefault", (inst, def) => {
		    core.$ZodPrefault.init(inst, def);
		    exports.ZodType.init(inst, def);
		    inst.unwrap = () => inst._zod.def.innerType;
		});
		function prefault(innerType, defaultValue) {
		    return new exports.ZodPrefault({
		        type: "prefault",
		        innerType: innerType,
		        get defaultValue() {
		            return typeof defaultValue === "function" ? defaultValue() : index_js_1.util.shallowClone(defaultValue);
		        },
		    });
		}
		exports.ZodNonOptional = core.$constructor("ZodNonOptional", (inst, def) => {
		    core.$ZodNonOptional.init(inst, def);
		    exports.ZodType.init(inst, def);
		    inst.unwrap = () => inst._zod.def.innerType;
		});
		function nonoptional(innerType, params) {
		    return new exports.ZodNonOptional({
		        type: "nonoptional",
		        innerType: innerType,
		        ...index_js_1.util.normalizeParams(params),
		    });
		}
		exports.ZodSuccess = core.$constructor("ZodSuccess", (inst, def) => {
		    core.$ZodSuccess.init(inst, def);
		    exports.ZodType.init(inst, def);
		    inst.unwrap = () => inst._zod.def.innerType;
		});
		function success(innerType) {
		    return new exports.ZodSuccess({
		        type: "success",
		        innerType: innerType,
		    });
		}
		exports.ZodCatch = core.$constructor("ZodCatch", (inst, def) => {
		    core.$ZodCatch.init(inst, def);
		    exports.ZodType.init(inst, def);
		    inst.unwrap = () => inst._zod.def.innerType;
		    inst.removeCatch = inst.unwrap;
		});
		function _catch(innerType, catchValue) {
		    return new exports.ZodCatch({
		        type: "catch",
		        innerType: innerType,
		        catchValue: (typeof catchValue === "function" ? catchValue : () => catchValue),
		    });
		}
		exports.ZodNaN = core.$constructor("ZodNaN", (inst, def) => {
		    core.$ZodNaN.init(inst, def);
		    exports.ZodType.init(inst, def);
		});
		function nan(params) {
		    return core._nan(exports.ZodNaN, params);
		}
		exports.ZodPipe = core.$constructor("ZodPipe", (inst, def) => {
		    core.$ZodPipe.init(inst, def);
		    exports.ZodType.init(inst, def);
		    inst.in = def.in;
		    inst.out = def.out;
		});
		function pipe(in_, out) {
		    return new exports.ZodPipe({
		        type: "pipe",
		        in: in_,
		        out: out,
		        // ...util.normalizeParams(params),
		    });
		}
		exports.ZodCodec = core.$constructor("ZodCodec", (inst, def) => {
		    exports.ZodPipe.init(inst, def);
		    core.$ZodCodec.init(inst, def);
		});
		function codec(in_, out, params) {
		    return new exports.ZodCodec({
		        type: "pipe",
		        in: in_,
		        out: out,
		        transform: params.decode,
		        reverseTransform: params.encode,
		    });
		}
		exports.ZodReadonly = core.$constructor("ZodReadonly", (inst, def) => {
		    core.$ZodReadonly.init(inst, def);
		    exports.ZodType.init(inst, def);
		    inst.unwrap = () => inst._zod.def.innerType;
		});
		function readonly(innerType) {
		    return new exports.ZodReadonly({
		        type: "readonly",
		        innerType: innerType,
		    });
		}
		exports.ZodTemplateLiteral = core.$constructor("ZodTemplateLiteral", (inst, def) => {
		    core.$ZodTemplateLiteral.init(inst, def);
		    exports.ZodType.init(inst, def);
		});
		function templateLiteral(parts, params) {
		    return new exports.ZodTemplateLiteral({
		        type: "template_literal",
		        parts,
		        ...index_js_1.util.normalizeParams(params),
		    });
		}
		exports.ZodLazy = core.$constructor("ZodLazy", (inst, def) => {
		    core.$ZodLazy.init(inst, def);
		    exports.ZodType.init(inst, def);
		    inst.unwrap = () => inst._zod.def.getter();
		});
		function lazy(getter) {
		    return new exports.ZodLazy({
		        type: "lazy",
		        getter: getter,
		    });
		}
		exports.ZodPromise = core.$constructor("ZodPromise", (inst, def) => {
		    core.$ZodPromise.init(inst, def);
		    exports.ZodType.init(inst, def);
		    inst.unwrap = () => inst._zod.def.innerType;
		});
		function promise(innerType) {
		    return new exports.ZodPromise({
		        type: "promise",
		        innerType: innerType,
		    });
		}
		exports.ZodFunction = core.$constructor("ZodFunction", (inst, def) => {
		    core.$ZodFunction.init(inst, def);
		    exports.ZodType.init(inst, def);
		});
		function _function(params) {
		    return new exports.ZodFunction({
		        type: "function",
		        input: Array.isArray(params?.input) ? tuple(params?.input) : (params?.input ?? array(unknown())),
		        output: params?.output ?? unknown(),
		    });
		}
		exports.ZodCustom = core.$constructor("ZodCustom", (inst, def) => {
		    core.$ZodCustom.init(inst, def);
		    exports.ZodType.init(inst, def);
		});
		// custom checks
		function check(fn) {
		    const ch = new core.$ZodCheck({
		        check: "custom",
		        // ...util.normalizeParams(params),
		    });
		    ch._zod.check = fn;
		    return ch;
		}
		function custom(fn, _params) {
		    return core._custom(exports.ZodCustom, fn ?? (() => true), _params);
		}
		function refine(fn, _params = {}) {
		    return core._refine(exports.ZodCustom, fn, _params);
		}
		// superRefine
		function superRefine(fn) {
		    return core._superRefine(fn);
		}
		function _instanceof(cls, params = {
		    error: `Input not instance of ${cls.name}`,
		}) {
		    const inst = new exports.ZodCustom({
		        type: "custom",
		        check: "custom",
		        fn: (data) => data instanceof cls,
		        abort: true,
		        ...index_js_1.util.normalizeParams(params),
		    });
		    inst._zod.bag.Class = cls;
		    return inst;
		}
		// stringbool
		const stringbool = (...args) => core._stringbool({
		    Codec: exports.ZodCodec,
		    Boolean: exports.ZodBoolean,
		    String: exports.ZodString,
		}, ...args);
		exports.stringbool = stringbool;
		function json(params) {
		    const jsonSchema = lazy(() => {
		        return union([string(params), number(), boolean(), _null(), array(jsonSchema), record(string(), jsonSchema)]);
		    });
		    return jsonSchema;
		}
		// preprocess
		// /** @deprecated Use `z.pipe()` and `z.transform()` instead. */
		function preprocess(fn, schema) {
		    return pipe(transform(fn), schema);
		} 
	} (schemas$1));
	return schemas$1;
}

var compat = {};

(function (exports) {
	// Zod 3 compat layer
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ZodFirstPartyTypeKind = exports.config = exports.$brand = exports.ZodIssueCode = void 0;
	exports.setErrorMap = setErrorMap;
	exports.getErrorMap = getErrorMap;
	const core = __importStar(core$4);
	/** @deprecated Use the raw string literal codes instead, e.g. "invalid_type". */
	exports.ZodIssueCode = {
	    invalid_type: "invalid_type",
	    too_big: "too_big",
	    too_small: "too_small",
	    invalid_format: "invalid_format",
	    not_multiple_of: "not_multiple_of",
	    unrecognized_keys: "unrecognized_keys",
	    invalid_union: "invalid_union",
	    invalid_key: "invalid_key",
	    invalid_element: "invalid_element",
	    invalid_value: "invalid_value",
	    custom: "custom",
	};
	var index_js_1 = core$4;
	Object.defineProperty(exports, "$brand", { enumerable: true, get: function () { return index_js_1.$brand; } });
	Object.defineProperty(exports, "config", { enumerable: true, get: function () { return index_js_1.config; } });
	/** @deprecated Use `z.config(params)` instead. */
	function setErrorMap(map) {
	    core.config({
	        customError: map,
	    });
	}
	/** @deprecated Use `z.config()` instead. */
	function getErrorMap() {
	    return core.config().customError;
	}
	/** @deprecated Do not use. Stub definition, only included for zod-to-json-schema compatibility. */
	var ZodFirstPartyTypeKind;
	(function (ZodFirstPartyTypeKind) {
	})(ZodFirstPartyTypeKind || (exports.ZodFirstPartyTypeKind = ZodFirstPartyTypeKind = {})); 
} (compat));

var coerce = {};

var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(coerce, "__esModule", { value: true });
coerce.string = string;
coerce.number = number;
coerce.boolean = boolean;
coerce.bigint = bigint;
coerce.date = date;
const core = __importStar(core$4);
const schemas = __importStar(requireSchemas());
function string(params) {
    return core._coercedString(schemas.ZodString, params);
}
function number(params) {
    return core._coercedNumber(schemas.ZodNumber, params);
}
function boolean(params) {
    return core._coercedBoolean(schemas.ZodBoolean, params);
}
function bigint(params) {
    return core._coercedBigint(schemas.ZodBigInt, params);
}
function date(params) {
    return core._coercedDate(schemas.ZodDate, params);
}

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.coerce = exports.iso = exports.ZodISODuration = exports.ZodISOTime = exports.ZodISODate = exports.ZodISODateTime = exports.locales = exports.NEVER = exports.util = exports.TimePrecision = exports.toJSONSchema = exports.flattenError = exports.formatError = exports.prettifyError = exports.treeifyError = exports.regexes = exports.clone = exports.$brand = exports.$input = exports.$output = exports.config = exports.registry = exports.globalRegistry = exports.core = void 0;
	exports.core = __importStar(core$4);
	__exportStar(requireSchemas(), exports);
	__exportStar(checks, exports);
	__exportStar(errors, exports);
	__exportStar(parse, exports);
	__exportStar(compat, exports);
	// zod-specified
	const index_js_1 = core$4;
	const en_js_1 = __importDefault(en);
	(0, index_js_1.config)((0, en_js_1.default)());
	var index_js_2 = core$4;
	Object.defineProperty(exports, "globalRegistry", { enumerable: true, get: function () { return index_js_2.globalRegistry; } });
	Object.defineProperty(exports, "registry", { enumerable: true, get: function () { return index_js_2.registry; } });
	Object.defineProperty(exports, "config", { enumerable: true, get: function () { return index_js_2.config; } });
	Object.defineProperty(exports, "$output", { enumerable: true, get: function () { return index_js_2.$output; } });
	Object.defineProperty(exports, "$input", { enumerable: true, get: function () { return index_js_2.$input; } });
	Object.defineProperty(exports, "$brand", { enumerable: true, get: function () { return index_js_2.$brand; } });
	Object.defineProperty(exports, "clone", { enumerable: true, get: function () { return index_js_2.clone; } });
	Object.defineProperty(exports, "regexes", { enumerable: true, get: function () { return index_js_2.regexes; } });
	Object.defineProperty(exports, "treeifyError", { enumerable: true, get: function () { return index_js_2.treeifyError; } });
	Object.defineProperty(exports, "prettifyError", { enumerable: true, get: function () { return index_js_2.prettifyError; } });
	Object.defineProperty(exports, "formatError", { enumerable: true, get: function () { return index_js_2.formatError; } });
	Object.defineProperty(exports, "flattenError", { enumerable: true, get: function () { return index_js_2.flattenError; } });
	Object.defineProperty(exports, "toJSONSchema", { enumerable: true, get: function () { return index_js_2.toJSONSchema; } });
	Object.defineProperty(exports, "TimePrecision", { enumerable: true, get: function () { return index_js_2.TimePrecision; } });
	Object.defineProperty(exports, "util", { enumerable: true, get: function () { return index_js_2.util; } });
	Object.defineProperty(exports, "NEVER", { enumerable: true, get: function () { return index_js_2.NEVER; } });
	exports.locales = __importStar(locales);
	// iso
	// must be exported from top-level
	// https://github.com/colinhacks/zod/issues/4491
	var iso_js_1 = requireIso();
	Object.defineProperty(exports, "ZodISODateTime", { enumerable: true, get: function () { return iso_js_1.ZodISODateTime; } });
	Object.defineProperty(exports, "ZodISODate", { enumerable: true, get: function () { return iso_js_1.ZodISODate; } });
	Object.defineProperty(exports, "ZodISOTime", { enumerable: true, get: function () { return iso_js_1.ZodISOTime; } });
	Object.defineProperty(exports, "ZodISODuration", { enumerable: true, get: function () { return iso_js_1.ZodISODuration; } });
	exports.iso = __importStar(requireIso());
	exports.coerce = __importStar(coerce); 
} (external));

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.z = void 0;
	const z = __importStar(external);
	exports.z = z;
	__exportStar(external, exports);
	exports.default = z; 
} (zod));

Object.defineProperty(LLMTranslator$1, "__esModule", {
  value: true
});
LLMTranslator$1.getPrompt = LLMTranslator$1.LLMTranslator = void 0;
var _zod$1 = zod;
var __awaiter$3 = function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const getPrompt = (text, from, to) => {
  // use full language name
  const langFormatter = new Intl.DisplayNames(['en'], {
    type: 'language'
  });
  const originLang = from == 'auto' ? 'auto' : langFormatter.of(from);
  const targetLang = langFormatter.of(to);
  return `You are a text translation service. I will provide an array of texts, and your task is to translate them from language ${originLang} to language ${targetLang}.
If I specify the source language as 'auto', you should automatically detect it and translate it into the target language I set.
The array in your response must be the same length as the one in the request. Do not add any explanations — translate strictly according to the content. 
Be careful when creating an array; it must be syntactically correct and do not change quotation marks. Return an array of translated texts while preserving their order.
Here is the JSON array of texts: ${JSON.stringify(text)}`;
};
LLMTranslator$1.getPrompt = getPrompt;
class LLMTranslator {
  constructor(llm, options) {
    var _a, _b, _c, _d, _e, _f, _g;
    this.llm = llm;
    this.config = {
      retryLimit: (_b = (_a = options === null || options === void 0 ? void 0 : options.retryOptions) === null || _a === void 0 ? void 0 : _a.retryLimit) !== null && _b !== void 0 ? _b : 3,
      retryTimeout: (_d = (_c = options === null || options === void 0 ? void 0 : options.retryOptions) === null || _c === void 0 ? void 0 : _c.retryTimeout) !== null && _d !== void 0 ? _d : this.llm.getRequestsTimeout(),
      maxRetryTimeout: (_e = options === null || options === void 0 ? void 0 : options.retryOptions) === null || _e === void 0 ? void 0 : _e.maxRetryTimeout,
      retryBackoffFactor: (_f = options === null || options === void 0 ? void 0 : options.retryOptions) === null || _f === void 0 ? void 0 : _f.retryBackoffFactor,
      getPrompt: (_g = options === null || options === void 0 ? void 0 : options.getPrompt) !== null && _g !== void 0 ? _g : getPrompt
    };
  }
  translate(text, from, to) {
    return __awaiter$3(this, void 0, void 0, function* () {
      const translated = yield this.translateBatch([text], from, to);
      return translated[0];
    });
  }
  translateBatch(text, from, to) {
    return __awaiter$3(this, void 0, void 0, function* () {
      let attempt = 0;
      // Retry loop
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      while (true) {
        try {
          // first request without delay
          if (attempt > 0) {
            yield this.waitRetryDelay(attempt);
          }
          const response = yield this.llm.fetch(this.config.getPrompt(text, from, to));
          const validateResult = _zod$1.z.string().array().length(text.length, {
            message: 'The response must be the same length as the requested array'
          }).parse(JSON.parse(response));
          return validateResult;
        } catch (error) {
          attempt++;
          if (attempt >= this.config.retryLimit) throw error;
        }
      }
    });
  }
  getLengthLimit() {
    return this.llm.getLengthLimit();
  }
  getRequestsTimeout() {
    return this.llm.getRequestsTimeout();
  }
  checkLimitExceeding(text) {
    const plainText = Array.isArray(text) ? text.join('') : text;
    const extra = plainText.length - this.getLengthLimit();
    return extra > 0 ? extra : 0;
  }
  /**
   * Calculates retry delays: starts with retryTimeout,
   * then increases exponentially (retryTimeout * factor^n) up to maxRetryTimeout (default: 4000).
   * Default retryBackoffFactor: 1.5
   */
  waitRetryDelay(attempt) {
    var _a, _b;
    const maxTimeout = (_a = this.config.maxRetryTimeout) !== null && _a !== void 0 ? _a : 4000;
    const factor = (_b = this.config.retryBackoffFactor) !== null && _b !== void 0 ? _b : 1.5;
    const delay = Math.min(maxTimeout, this.config.retryTimeout * Math.pow(factor, attempt - 1));
    return new Promise(r => setTimeout(r, delay));
  }
}
LLMTranslator$1.LLMTranslator = LLMTranslator;

var ChatGPTLLMFetcher$1 = {};

var utils = {};

var fetcher = {};

var basicFetcher$1 = {};

/* eslint-disable no-prototype-builtins */
var g =
  (typeof globalThis !== 'undefined' && globalThis) ||
  (typeof self !== 'undefined' && self) ||
  // eslint-disable-next-line no-undef
  (typeof global !== 'undefined' && global) ||
  {};

var support = {
  searchParams: 'URLSearchParams' in g,
  iterable: 'Symbol' in g && 'iterator' in Symbol,
  blob:
    'FileReader' in g &&
    'Blob' in g &&
    (function() {
      try {
        new Blob();
        return true
      } catch (e) {
        return false
      }
    })(),
  formData: 'FormData' in g,
  arrayBuffer: 'ArrayBuffer' in g
};

function isDataView(obj) {
  return obj && DataView.prototype.isPrototypeOf(obj)
}

if (support.arrayBuffer) {
  var viewClasses = [
    '[object Int8Array]',
    '[object Uint8Array]',
    '[object Uint8ClampedArray]',
    '[object Int16Array]',
    '[object Uint16Array]',
    '[object Int32Array]',
    '[object Uint32Array]',
    '[object Float32Array]',
    '[object Float64Array]'
  ];

  var isArrayBufferView =
    ArrayBuffer.isView ||
    function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    };
}

function normalizeName(name) {
  if (typeof name !== 'string') {
    name = String(name);
  }
  if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name) || name === '') {
    throw new TypeError('Invalid character in header field name: "' + name + '"')
  }
  return name.toLowerCase()
}

function normalizeValue(value) {
  if (typeof value !== 'string') {
    value = String(value);
  }
  return value
}

// Build a destructive iterator for the value list
function iteratorFor(items) {
  var iterator = {
    next: function() {
      var value = items.shift();
      return {done: value === undefined, value: value}
    }
  };

  if (support.iterable) {
    iterator[Symbol.iterator] = function() {
      return iterator
    };
  }

  return iterator
}

function Headers(headers) {
  this.map = {};

  if (headers instanceof Headers) {
    headers.forEach(function(value, name) {
      this.append(name, value);
    }, this);
  } else if (Array.isArray(headers)) {
    headers.forEach(function(header) {
      if (header.length != 2) {
        throw new TypeError('Headers constructor: expected name/value pair to be length 2, found' + header.length)
      }
      this.append(header[0], header[1]);
    }, this);
  } else if (headers) {
    Object.getOwnPropertyNames(headers).forEach(function(name) {
      this.append(name, headers[name]);
    }, this);
  }
}

Headers.prototype.append = function(name, value) {
  name = normalizeName(name);
  value = normalizeValue(value);
  var oldValue = this.map[name];
  this.map[name] = oldValue ? oldValue + ', ' + value : value;
};

Headers.prototype['delete'] = function(name) {
  delete this.map[normalizeName(name)];
};

Headers.prototype.get = function(name) {
  name = normalizeName(name);
  return this.has(name) ? this.map[name] : null
};

Headers.prototype.has = function(name) {
  return this.map.hasOwnProperty(normalizeName(name))
};

Headers.prototype.set = function(name, value) {
  this.map[normalizeName(name)] = normalizeValue(value);
};

Headers.prototype.forEach = function(callback, thisArg) {
  for (var name in this.map) {
    if (this.map.hasOwnProperty(name)) {
      callback.call(thisArg, this.map[name], name, this);
    }
  }
};

Headers.prototype.keys = function() {
  var items = [];
  this.forEach(function(value, name) {
    items.push(name);
  });
  return iteratorFor(items)
};

Headers.prototype.values = function() {
  var items = [];
  this.forEach(function(value) {
    items.push(value);
  });
  return iteratorFor(items)
};

Headers.prototype.entries = function() {
  var items = [];
  this.forEach(function(value, name) {
    items.push([name, value]);
  });
  return iteratorFor(items)
};

if (support.iterable) {
  Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
}

function consumed(body) {
  if (body._noBody) return
  if (body.bodyUsed) {
    return Promise.reject(new TypeError('Already read'))
  }
  body.bodyUsed = true;
}

function fileReaderReady(reader) {
  return new Promise(function(resolve, reject) {
    reader.onload = function() {
      resolve(reader.result);
    };
    reader.onerror = function() {
      reject(reader.error);
    };
  })
}

function readBlobAsArrayBuffer(blob) {
  var reader = new FileReader();
  var promise = fileReaderReady(reader);
  reader.readAsArrayBuffer(blob);
  return promise
}

function readBlobAsText(blob) {
  var reader = new FileReader();
  var promise = fileReaderReady(reader);
  var match = /charset=([A-Za-z0-9_-]+)/.exec(blob.type);
  var encoding = match ? match[1] : 'utf-8';
  reader.readAsText(blob, encoding);
  return promise
}

function readArrayBufferAsText(buf) {
  var view = new Uint8Array(buf);
  var chars = new Array(view.length);

  for (var i = 0; i < view.length; i++) {
    chars[i] = String.fromCharCode(view[i]);
  }
  return chars.join('')
}

function bufferClone(buf) {
  if (buf.slice) {
    return buf.slice(0)
  } else {
    var view = new Uint8Array(buf.byteLength);
    view.set(new Uint8Array(buf));
    return view.buffer
  }
}

function Body() {
  this.bodyUsed = false;

  this._initBody = function(body) {
    /*
      fetch-mock wraps the Response object in an ES6 Proxy to
      provide useful test harness features such as flush. However, on
      ES5 browsers without fetch or Proxy support pollyfills must be used;
      the proxy-pollyfill is unable to proxy an attribute unless it exists
      on the object before the Proxy is created. This change ensures
      Response.bodyUsed exists on the instance, while maintaining the
      semantic of setting Request.bodyUsed in the constructor before
      _initBody is called.
    */
    // eslint-disable-next-line no-self-assign
    this.bodyUsed = this.bodyUsed;
    this._bodyInit = body;
    if (!body) {
      this._noBody = true;
      this._bodyText = '';
    } else if (typeof body === 'string') {
      this._bodyText = body;
    } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
      this._bodyBlob = body;
    } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
      this._bodyFormData = body;
    } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
      this._bodyText = body.toString();
    } else if (support.arrayBuffer && support.blob && isDataView(body)) {
      this._bodyArrayBuffer = bufferClone(body.buffer);
      // IE 10-11 can't handle a DataView body.
      this._bodyInit = new Blob([this._bodyArrayBuffer]);
    } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
      this._bodyArrayBuffer = bufferClone(body);
    } else {
      this._bodyText = body = Object.prototype.toString.call(body);
    }

    if (!this.headers.get('content-type')) {
      if (typeof body === 'string') {
        this.headers.set('content-type', 'text/plain;charset=UTF-8');
      } else if (this._bodyBlob && this._bodyBlob.type) {
        this.headers.set('content-type', this._bodyBlob.type);
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
      }
    }
  };

  if (support.blob) {
    this.blob = function() {
      var rejected = consumed(this);
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return Promise.resolve(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(new Blob([this._bodyArrayBuffer]))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as blob')
      } else {
        return Promise.resolve(new Blob([this._bodyText]))
      }
    };
  }

  this.arrayBuffer = function() {
    if (this._bodyArrayBuffer) {
      var isConsumed = consumed(this);
      if (isConsumed) {
        return isConsumed
      } else if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
        return Promise.resolve(
          this._bodyArrayBuffer.buffer.slice(
            this._bodyArrayBuffer.byteOffset,
            this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
          )
        )
      } else {
        return Promise.resolve(this._bodyArrayBuffer)
      }
    } else if (support.blob) {
      return this.blob().then(readBlobAsArrayBuffer)
    } else {
      throw new Error('could not read as ArrayBuffer')
    }
  };

  this.text = function() {
    var rejected = consumed(this);
    if (rejected) {
      return rejected
    }

    if (this._bodyBlob) {
      return readBlobAsText(this._bodyBlob)
    } else if (this._bodyArrayBuffer) {
      return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
    } else if (this._bodyFormData) {
      throw new Error('could not read FormData body as text')
    } else {
      return Promise.resolve(this._bodyText)
    }
  };

  if (support.formData) {
    this.formData = function() {
      return this.text().then(decode)
    };
  }

  this.json = function() {
    return this.text().then(JSON.parse)
  };

  return this
}

// HTTP methods whose capitalization should be normalized
var methods = ['CONNECT', 'DELETE', 'GET', 'HEAD', 'OPTIONS', 'PATCH', 'POST', 'PUT', 'TRACE'];

function normalizeMethod(method) {
  var upcased = method.toUpperCase();
  return methods.indexOf(upcased) > -1 ? upcased : method
}

function Request(input, options) {
  if (!(this instanceof Request)) {
    throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
  }

  options = options || {};
  var body = options.body;

  if (input instanceof Request) {
    if (input.bodyUsed) {
      throw new TypeError('Already read')
    }
    this.url = input.url;
    this.credentials = input.credentials;
    if (!options.headers) {
      this.headers = new Headers(input.headers);
    }
    this.method = input.method;
    this.mode = input.mode;
    this.signal = input.signal;
    if (!body && input._bodyInit != null) {
      body = input._bodyInit;
      input.bodyUsed = true;
    }
  } else {
    this.url = String(input);
  }

  this.credentials = options.credentials || this.credentials || 'same-origin';
  if (options.headers || !this.headers) {
    this.headers = new Headers(options.headers);
  }
  this.method = normalizeMethod(options.method || this.method || 'GET');
  this.mode = options.mode || this.mode || null;
  this.signal = options.signal || this.signal || (function () {
    if ('AbortController' in g) {
      var ctrl = new AbortController();
      return ctrl.signal;
    }
  }());
  this.referrer = null;

  if ((this.method === 'GET' || this.method === 'HEAD') && body) {
    throw new TypeError('Body not allowed for GET or HEAD requests')
  }
  this._initBody(body);

  if (this.method === 'GET' || this.method === 'HEAD') {
    if (options.cache === 'no-store' || options.cache === 'no-cache') {
      // Search for a '_' parameter in the query string
      var reParamSearch = /([?&])_=[^&]*/;
      if (reParamSearch.test(this.url)) {
        // If it already exists then set the value with the current time
        this.url = this.url.replace(reParamSearch, '$1_=' + new Date().getTime());
      } else {
        // Otherwise add a new '_' parameter to the end with the current time
        var reQueryString = /\?/;
        this.url += (reQueryString.test(this.url) ? '&' : '?') + '_=' + new Date().getTime();
      }
    }
  }
}

Request.prototype.clone = function() {
  return new Request(this, {body: this._bodyInit})
};

function decode(body) {
  var form = new FormData();
  body
    .trim()
    .split('&')
    .forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=');
        var name = split.shift().replace(/\+/g, ' ');
        var value = split.join('=').replace(/\+/g, ' ');
        form.append(decodeURIComponent(name), decodeURIComponent(value));
      }
    });
  return form
}

function parseHeaders(rawHeaders) {
  var headers = new Headers();
  // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
  // https://tools.ietf.org/html/rfc7230#section-3.2
  var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
  // Avoiding split via regex to work around a common IE11 bug with the core-js 3.6.0 regex polyfill
  // https://github.com/github/fetch/issues/748
  // https://github.com/zloirock/core-js/issues/751
  preProcessedHeaders
    .split('\r')
    .map(function(header) {
      return header.indexOf('\n') === 0 ? header.substr(1, header.length) : header
    })
    .forEach(function(line) {
      var parts = line.split(':');
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(':').trim();
        try {
          headers.append(key, value);
        } catch (error) {
          console.warn('Response ' + error.message);
        }
      }
    });
  return headers
}

Body.call(Request.prototype);

function Response(bodyInit, options) {
  if (!(this instanceof Response)) {
    throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
  }
  if (!options) {
    options = {};
  }

  this.type = 'default';
  this.status = options.status === undefined ? 200 : options.status;
  if (this.status < 200 || this.status > 599) {
    throw new RangeError("Failed to construct 'Response': The status provided (0) is outside the range [200, 599].")
  }
  this.ok = this.status >= 200 && this.status < 300;
  this.statusText = options.statusText === undefined ? '' : '' + options.statusText;
  this.headers = new Headers(options.headers);
  this.url = options.url || '';
  this._initBody(bodyInit);
}

Body.call(Response.prototype);

Response.prototype.clone = function() {
  return new Response(this._bodyInit, {
    status: this.status,
    statusText: this.statusText,
    headers: new Headers(this.headers),
    url: this.url
  })
};

Response.error = function() {
  var response = new Response(null, {status: 200, statusText: ''});
  response.ok = false;
  response.status = 0;
  response.type = 'error';
  return response
};

var redirectStatuses = [301, 302, 303, 307, 308];

Response.redirect = function(url, status) {
  if (redirectStatuses.indexOf(status) === -1) {
    throw new RangeError('Invalid status code')
  }

  return new Response(null, {status: status, headers: {location: url}})
};

var DOMException = g.DOMException;
try {
  new DOMException();
} catch (err) {
  DOMException = function(message, name) {
    this.message = message;
    this.name = name;
    var error = Error(message);
    this.stack = error.stack;
  };
  DOMException.prototype = Object.create(Error.prototype);
  DOMException.prototype.constructor = DOMException;
}

function fetch$1(input, init) {
  return new Promise(function(resolve, reject) {
    var request = new Request(input, init);

    if (request.signal && request.signal.aborted) {
      return reject(new DOMException('Aborted', 'AbortError'))
    }

    var xhr = new XMLHttpRequest();

    function abortXhr() {
      xhr.abort();
    }

    xhr.onload = function() {
      var options = {
        statusText: xhr.statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders() || '')
      };
      // This check if specifically for when a user fetches a file locally from the file system
      // Only if the status is out of a normal range
      if (request.url.indexOf('file://') === 0 && (xhr.status < 200 || xhr.status > 599)) {
        options.status = 200;
      } else {
        options.status = xhr.status;
      }
      options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
      var body = 'response' in xhr ? xhr.response : xhr.responseText;
      setTimeout(function() {
        resolve(new Response(body, options));
      }, 0);
    };

    xhr.onerror = function() {
      setTimeout(function() {
        reject(new TypeError('Network request failed'));
      }, 0);
    };

    xhr.ontimeout = function() {
      setTimeout(function() {
        reject(new TypeError('Network request timed out'));
      }, 0);
    };

    xhr.onabort = function() {
      setTimeout(function() {
        reject(new DOMException('Aborted', 'AbortError'));
      }, 0);
    };

    function fixUrl(url) {
      try {
        return url === '' && g.location.href ? g.location.href : url
      } catch (e) {
        return url
      }
    }

    xhr.open(request.method, fixUrl(request.url), true);

    if (request.credentials === 'include') {
      xhr.withCredentials = true;
    } else if (request.credentials === 'omit') {
      xhr.withCredentials = false;
    }

    if ('responseType' in xhr) {
      if (support.blob) {
        xhr.responseType = 'blob';
      } else if (
        support.arrayBuffer
      ) {
        xhr.responseType = 'arraybuffer';
      }
    }

    if (init && typeof init.headers === 'object' && !(init.headers instanceof Headers || (g.Headers && init.headers instanceof g.Headers))) {
      var names = [];
      Object.getOwnPropertyNames(init.headers).forEach(function(name) {
        names.push(normalizeName(name));
        xhr.setRequestHeader(name, normalizeValue(init.headers[name]));
      });
      request.headers.forEach(function(value, name) {
        if (names.indexOf(name) === -1) {
          xhr.setRequestHeader(name, value);
        }
      });
    } else {
      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value);
      });
    }

    if (request.signal) {
      request.signal.addEventListener('abort', abortXhr);

      xhr.onreadystatechange = function() {
        // DONE (success or failure)
        if (xhr.readyState === 4) {
          request.signal.removeEventListener('abort', abortXhr);
        }
      };
    }

    xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
  })
}

fetch$1.polyfill = true;

if (!g.fetch) {
  g.fetch = fetch$1;
  g.Headers = Headers;
  g.Request = Request;
  g.Response = Response;
}

// the whatwg-fetch polyfill installs the fetch() function
// on the global object (window or self)
//
// Return that as the export for use in Webpack, Browserify etc.

self.fetch.bind(self);

Object.defineProperty(basicFetcher$1, "__esModule", {
  value: true
});
basicFetcher$1.convertHeadersToMap = basicFetcher$1.basicFetcher = void 0;

var __awaiter$2 = function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __rest = function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const convertHeadersToMap = headers => {
  const map = new Map();
  headers.forEach((key, value) => {
    map.set(key, value);
  });
  return map;
};
/**
 * Basic implementation of API fetcher
 */
basicFetcher$1.convertHeadersToMap = convertHeadersToMap;
const basicFetcher = (url, _a) => __awaiter$2(void 0, void 0, void 0, function* () {
  var {
      responseType
    } = _a,
    options = __rest(_a, ["responseType"]);
  return fetch(url, options).then(response => __awaiter$2(void 0, void 0, void 0, function* () {
    const data = yield response[responseType]();
    const {
      ok,
      status,
      statusText
    } = response;
    return {
      headers: convertHeadersToMap(response.headers),
      ok,
      status,
      statusText,
      data
    };
  }));
});
basicFetcher$1.basicFetcher = basicFetcher;

var types = {};

Object.defineProperty(types, "__esModule", {
  value: true
});

(function (exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var _basicFetcher = basicFetcher$1;
	Object.keys(_basicFetcher).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  if (key in exports && exports[key] === _basicFetcher[key]) return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function () {
	      return _basicFetcher[key];
	    }
	  });
	});
	var _types = types;
	Object.keys(_types).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  if (key in exports && exports[key] === _types[key]) return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function () {
	      return _types[key];
	    }
	  });
	});
	
} (fetcher));

var cache = {};

Object.defineProperty(cache, "__esModule", {
  value: true
});

var text = {};

var splitLongText$1 = {};

Object.defineProperty(splitLongText$1, "__esModule", {
  value: true
});
splitLongText$1.splitLongText = void 0;
/**
 * This code taken from https://github.com/zlargon/google-tts/blob/42bae63cf406c3cf20521e0cf36cbc5d9b9dce31/src/splitLongText.ts
 * This code is under MIT license (2016 Leon Huang)
 */
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
const SPACE_REGEX = '\\s\\uFEFF\\xA0';
// https://remarkablemark.org/blog/2019/09/28/javascript-remove-punctuation/
const DEFAULT_PUNCTUATION_REGEX = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
/**
 * split the long text to short texts
 * Time Complexity: O(n)
 *
 * @param {string}  text
 * @param {object?} option
 * @param {number?} option.maxLength  default is 200
 * @param {string?} option.splitPunct default is ''
 * @returns {string[]} short text list
 */
const splitLongText = (text, {
  maxLength = 200,
  splitPunct = ''
} = {}) => {
  const isSpaceOrPunct = (s, i) => {
    const regex = new RegExp('[' + SPACE_REGEX + DEFAULT_PUNCTUATION_REGEX + splitPunct + ']');
    return regex.test(s.charAt(i));
  };
  const lastIndexOfSpaceOrPunct = (s, left, right) => {
    for (let i = right; i >= left; i--) {
      if (isSpaceOrPunct(s, i)) return i;
    }
    return -1; // not found
  };
  const result = [];
  const addResult = (text, start, end) => {
    result.push(text.slice(start, end + 1));
  };
  let start = 0;
  for (;;) {
    // check text's length
    if (text.length - start <= maxLength) {
      addResult(text, start, text.length - 1);
      break; // end of text
    }
    // check whether the word is cut in the middle.
    let end = start + maxLength - 1;
    if (isSpaceOrPunct(text, end) || isSpaceOrPunct(text, end + 1)) {
      addResult(text, start, end);
      start = end + 1;
      continue;
    }
    // find last index of space
    end = lastIndexOfSpaceOrPunct(text, start, end);
    if (end === -1) {
      const str = text.slice(start, start + maxLength);
      throw new Error('The word is too long to split into a short text:' + `\n${str} ...` + '\n\nTry the option "splitPunct" to split the text by punctuation.');
    }
    // add result
    addResult(text, start, end);
    start = end + 1;
  }
  return result;
};
splitLongText$1.splitLongText = splitLongText;

(function (exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var _splitLongText = splitLongText$1;
	Object.keys(_splitLongText).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  if (key in exports && exports[key] === _splitLongText[key]) return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function () {
	      return _splitLongText[key];
	    }
	  });
	});
	
} (text));

var Multiplexor$1 = {};

var strings = {};

Object.defineProperty(strings, "__esModule", {
  value: true
});
strings.escapeRegExp = void 0;
const escapeRegExp = text => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};
strings.escapeRegExp = escapeRegExp;

Object.defineProperty(Multiplexor$1, "__esModule", {
  value: true
});
Multiplexor$1.Multiplexor = void 0;
var _strings = strings;
const tokens = ['tokenStart', 'tokenEnd', 'tokenClose'];
/**
 * Util for pack multiple requests to one
 *
 * It's just encode/decode all texts with custom separation options
 */
class Multiplexor {
  // private readonly token: Array<Array<string>> = [];
  constructor(options) {
    this.options = {
      tokenStart: '<',
      tokenEnd: '>',
      tokenClose: '/'
    };
    if (options !== undefined) {
      ['tokenStart', 'tokenEnd', 'tokenClose'].forEach(key => {
        const item = options[key];
        if (item !== undefined && item.search(/&|:/) !== -1) {
          throw new Error(`Option ${key} has disallow characters (& or :)`);
        }
      });
      for (const key in options) {
        this.options[key] = options[key];
      }
    }
  }
  encode(data) {
    const {
      tokenStart: start = '',
      tokenEnd: end = '',
      tokenClose: close = ''
    } = this.options;
    return data.map(({
      id,
      text
    }) => start + id + end + this.escape(text) + start + close + id + end).join(' ');
  }
  decode(text) {
    const {
      tokenStart: start = '',
      tokenEnd: end = '',
      tokenClose: close = ''
    } = this.options;
    const pattern = `${start}\\s*(\\d+)\\s*${end}([\\w\\W]+?)${start}\\s*${close}\\s*\\1\\s*${end}`;
    const matchSet = text.matchAll(new RegExp(pattern, 'gm'));
    const result = [];
    let match = matchSet.next();
    while (!match.done) {
      result.push({
        id: match.value[1],
        text: this.unescape(match.value[2])
      });
      match = matchSet.next();
    }
    return result;
  }
  escape(text) {
    return tokens.reduce((text, tokenName, index) => {
      const token = this.options[tokenName];
      if (!token) return text;
      return text.replace(new RegExp((0, _strings.escapeRegExp)(token), 'g'), `&${index + 1}:`);
    }, text);
  }
  unescape(text) {
    return tokens.reduce((text, tokenName, index) => {
      const token = this.options[tokenName];
      if (!token) return text;
      return text.replace(new RegExp(`&${index + 1}:`, 'g'), token);
    }, text);
  }
}
Multiplexor$1.Multiplexor = Multiplexor;

var Semaphore$1 = {};

var time = {};

Object.defineProperty(time, "__esModule", {
  value: true
});
time.wait = void 0;
const wait = time => new Promise(res => setTimeout(res, time));
time.wait = wait;

Object.defineProperty(Semaphore$1, "__esModule", {
  value: true
});
Semaphore$1.Semaphore = void 0;
var _time = time;
var __awaiter$1 = function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
/**
 * Semaphore for the flow control in queues
 *
 * @example
 * const semafor = QueueSemafor({ timeout: 100 });
 * items.map(async item=> {
 * 	const free = await semafor.take();
 * 	// do something with item...
 * 	free();
 * })
 */
class Semaphore {
  constructor(options) {
    this.timeout = 0;
    this.hijackPrevention = true;
    this.lastAccess = 0;
    this.semafor = null;
    const {
      timeout,
      hijackPrevention
    } = options || {};
    if (timeout !== undefined) {
      if (timeout < 0) {
        throw new Error('Negative number');
      }
      this.timeout = timeout;
    }
    if (hijackPrevention !== undefined) {
      this.hijackPrevention = hijackPrevention;
    }
  }
  take() {
    return __awaiter$1(this, void 0, void 0, function* () {
      // Await loop
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      while (true) {
        // Wait timeout
        if (this.timeout > 0) {
          const idle = new Date().getTime() - this.lastAccess;
          if (idle < this.timeout) {
            yield (0, _time.wait)(this.timeout - idle);
          }
        }
        if (this.semafor === null) {
          break;
        }
        yield this.semafor;
        // Wait random time until 30ms to prevent flow hijacking
        if (this.hijackPrevention) {
          yield (0, _time.wait)(Math.floor(Math.random() * 30));
        }
      }
      let semaforResolver;
      this.semafor = new Promise(resolve => {
        semaforResolver = resolve;
      });
      return () => {
        this.lastAccess = new Date().getTime();
        this.semafor = null;
        semaforResolver();
      };
    });
  }
}
Semaphore$1.Semaphore = Semaphore;

var buffers = {};

Object.defineProperty(buffers, "__esModule", {
  value: true
});
buffers.bufferToArrayBuffer = buffers.arrayBufferToBuffer = void 0;
/**
 * Convert a nodejs `Buffer` to `ArrayBuffer`
 */
const bufferToArrayBuffer = buffer => {
  const arrayBuffer = new ArrayBuffer(buffer.length);
  // Copy bytes
  const view = new Uint8Array(arrayBuffer);
  for (let i = 0; i < buffer.length; i++) {
    view[i] = buffer[i];
  }
  return arrayBuffer;
};
/**
 * Convert `ArrayBuffer` to a nodejs `Buffer`
 */
buffers.bufferToArrayBuffer = bufferToArrayBuffer;
const arrayBufferToBuffer = arrayBuffer => {
  const buffer = Buffer.alloc(arrayBuffer.byteLength);
  // Copy bytes
  const view = new Uint8Array(arrayBuffer);
  for (let i = 0; i < buffer.length; i++) {
    buffer[i] = view[i];
  }
  return buffer;
};
buffers.arrayBufferToBuffer = arrayBufferToBuffer;

var url = {};

Object.defineProperty(url, "__esModule", {
  value: true
});
url.buildUrl = void 0;
const buildUrl = (baseUrl, path) => baseUrl + path;
url.buildUrl = buildUrl;

(function (exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var _fetcher = fetcher;
	Object.keys(_fetcher).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  if (key in exports && exports[key] === _fetcher[key]) return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function () {
	      return _fetcher[key];
	    }
	  });
	});
	var _cache = cache;
	Object.keys(_cache).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  if (key in exports && exports[key] === _cache[key]) return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function () {
	      return _cache[key];
	    }
	  });
	});
	var _text = text;
	Object.keys(_text).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  if (key in exports && exports[key] === _text[key]) return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function () {
	      return _text[key];
	    }
	  });
	});
	var _Multiplexor = Multiplexor$1;
	Object.keys(_Multiplexor).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  if (key in exports && exports[key] === _Multiplexor[key]) return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function () {
	      return _Multiplexor[key];
	    }
	  });
	});
	var _Semaphore = Semaphore$1;
	Object.keys(_Semaphore).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  if (key in exports && exports[key] === _Semaphore[key]) return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function () {
	      return _Semaphore[key];
	    }
	  });
	});
	var _buffers = buffers;
	Object.keys(_buffers).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  if (key in exports && exports[key] === _buffers[key]) return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function () {
	      return _buffers[key];
	    }
	  });
	});
	var _time = time;
	Object.keys(_time).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  if (key in exports && exports[key] === _time[key]) return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function () {
	      return _time[key];
	    }
	  });
	});
	var _strings = strings;
	Object.keys(_strings).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  if (key in exports && exports[key] === _strings[key]) return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function () {
	      return _strings[key];
	    }
	  });
	});
	var _url = url;
	Object.keys(_url).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  if (key in exports && exports[key] === _url[key]) return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function () {
	      return _url[key];
	    }
	  });
	});
	
} (utils));

Object.defineProperty(ChatGPTLLMFetcher$1, "__esModule", {
  value: true
});
ChatGPTLLMFetcher$1.ChatGPTLLMResponseSchema = ChatGPTLLMFetcher$1.ChatGPTLLMFetcher = void 0;
var _zod = zod;
var _utils = utils;
var __awaiter = function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const ChatGPTLLMResponseSchema = ChatGPTLLMFetcher$1.ChatGPTLLMResponseSchema = _zod.z.object({
  choices: _zod.z.object({
    message: _zod.z.object({
      content: _zod.z.string()
    })
  }).array().min(1)
});
class ChatGPTLLMFetcher {
  constructor({
    apiKey,
    model,
    baseUrl
  }) {
    this.config = {
      apiKey: apiKey,
      model: model !== null && model !== void 0 ? model : 'gpt-4o-mini',
      baseUrl: baseUrl !== null && baseUrl !== void 0 ? baseUrl : 'https://api.openai.com/v1'
    };
  }
  getLengthLimit() {
    return 5000;
  }
  getRequestsTimeout() {
    return 500;
  }
  fetch(prompt) {
    return __awaiter(this, void 0, void 0, function* () {
      const response = yield fetch((0, _utils.buildUrl)(this.config.baseUrl, '/chat/completions'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify({
          model: this.config.model,
          messages: [{
            role: 'user',
            content: prompt
          }]
        })
      });
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
      }
      // validate response structure
      const parseResult = ChatGPTLLMResponseSchema.parse(yield response.json());
      // a list of chat completion choices, there can be more than one only if specified directly.
      // source: https://platform.openai.com/docs/api-reference/chat/object#chat/object-choices
      return parseResult.choices[0].message.content;
    });
  }
}
ChatGPTLLMFetcher$1.ChatGPTLLMFetcher = ChatGPTLLMFetcher;

Object.defineProperty(ChatGPTLLMTranslator$1, "__esModule", {
  value: true
});
var ChatGPTLLMTranslator_2 = ChatGPTLLMTranslator$1.ChatGPTLLMTranslator = void 0;
var _languages = languages$1;
var _LLMTranslator = LLMTranslator$1;
var _ChatGPTLLMFetcher = ChatGPTLLMFetcher$1;
class ChatGPTLLMTranslator extends _LLMTranslator.LLMTranslator {
  constructor(config) {
    var _a, _b, _c, _d;
    const llm = new _ChatGPTLLMFetcher.ChatGPTLLMFetcher({
      apiKey: config.apiKey,
      model: config.model,
      baseUrl: config.baseUrl
    });
    super(llm, {
      getPrompt: config.getPrompt,
      retryOptions: {
        retryLimit: (_a = config.retryOptions) === null || _a === void 0 ? void 0 : _a.retryLimit,
        retryTimeout: (_b = config.retryOptions) === null || _b === void 0 ? void 0 : _b.retryTimeout,
        maxRetryTimeout: (_c = config.retryOptions) === null || _c === void 0 ? void 0 : _c.maxRetryTimeout,
        retryBackoffFactor: (_d = config.retryOptions) === null || _d === void 0 ? void 0 : _d.retryBackoffFactor
      }
    });
  }
}
ChatGPTLLMTranslator_2 = ChatGPTLLMTranslator$1.ChatGPTLLMTranslator = ChatGPTLLMTranslator;
ChatGPTLLMTranslator.translatorName = 'ChatGPTLLMTranslator';
ChatGPTLLMTranslator.isRequiredKey = () => true;
ChatGPTLLMTranslator.isSupportedAutoFrom = () => true;
// ChatGPT docs don’t list supported languages for text models, we can use the list for text-to-speech instead
// source: https://platform.openai.com/docs/guides/text-to-speech#supported-languages
ChatGPTLLMTranslator.getSupportedLanguages = () => {
  // eslint-disable
  // prettier-ignore
  return (0, _languages.getLanguageCodesISO639)('v1');
  // eslint-enable
};

function ChatGPTTranslator(options) {
    return new ChatGPTLLMTranslator_2({
        ...options,
        // Insert your API key here
        apiKey: '',
        // Optional. Custom API endpoint
        // baseUrl: 'https://openrouter.ai/api/v1',
        // Optional. Custom model name
        // model: 'openai/gpt-4o-mini',
    });
}
ChatGPTTranslator.__proto__ = ChatGPTLLMTranslator_2;
globalThis.translator = ChatGPTTranslator;
