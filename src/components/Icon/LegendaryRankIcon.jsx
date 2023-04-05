import * as React from 'react';

export const LegendaryRankIcon = (props) => (
	<svg
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		style={{
			'--stop-color1': 'var(--theme-rank-7-color-bottom)',
			'--stop-color2': 'var(--theme-rank-7-color-top)',
		}}
		{...props}
	>
		<defs>
			<linearGradient
				x1="50%"
				y1="100%"
				x2="50%"
				y2="0%"
				id="rank-6vx3n9"
			>
				<stop stopColor="var(--stop-color1)" offset="0%" />
				<stop stopColor="var(--stop-color2)" offset="100%" />
			</linearGradient>
		</defs>
		<g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
			<path
				d="M12.0027158,17.949 L12.5531404,18.4134483 L13.0522401,18.8182988 L13.3045035,19.0172039 L13.8872893,19.4624402 L13.8872893,19.4624402 L14.1023462,19.620622 L14.1023462,19.620622 C14.2139993,19.7018464 14.2381933,19.8582778 14.1566318,19.9696841 C14.1361159,19.9977071 14.1099862,20.0211481 14.0791207,20.0371481 L12.7572702,20.798888 L12.6147667,20.8712883 C12.2272392,21.0429039 11.7841925,21.0429039 11.3966649,20.8712883 L11.2541614,20.798888 L9.93277621,20.0358859 C9.81320697,19.9668435 9.77224686,19.8139436 9.84128924,19.6943744 C9.85908368,19.6635575 9.88325202,19.6368946 9.91217842,19.6161683 L9.95289761,19.5869922 C10.1146557,19.4679163 10.2781343,19.3449892 10.4433016,19.2183238 L10.9438377,18.827226 L11.4433657,18.4221972 L12.0027158,17.949 Z M16.811,12.5 L16.8363648,12.5004028 L17.2454086,12.9767355 L17.4432018,13.2129576 L17.4432018,13.2129576 L17.9171745,13.7968494 L17.9171745,13.7968494 L18.3604682,14.3696751 L18.6918561,14.8186687 C18.7453103,14.8927526 18.7978636,14.9664486 18.8494978,15.0397361 L19.1481248,15.4743936 C20.5846365,17.6215188 21.1607641,19.3638338 20.3801568,20.144441 C19.4563961,21.0682018 17.1858541,20.0919833 14.4914343,18.038349 L13.9970744,17.6532717 L13.5086615,17.25717 C13.2360344,17.0318774 12.9603972,16.7971859 12.6826179,16.5538693 L13.3498943,16.9020104 C13.7392153,17.1066885 14.1851514,17.1773179 14.6186667,17.1029642 L14.7648536,17.0723253 C14.9489688,17.0265848 15.1214205,16.9561399 15.2792304,16.8652023 L15.4913848,17.0213228 L15.9050626,17.3154123 C15.9727683,17.3623716 16.039834,17.4082903 16.10623,17.4531489 L16.4963322,17.7094258 C17.8954998,18.6013315 18.9418207,18.9614568 19.3194967,18.5837808 C19.6922699,18.2110076 19.3462729,17.1868369 18.4793506,15.8146307 L18.2176546,15.4133635 C18.0798901,15.2082568 17.931879,14.9966369 17.7741981,14.7793883 L17.4461142,14.3376483 L17.0013098,13.766761 L17.0013098,13.766761 L16.5198197,13.1779485 L16.336,12.963 L16.811,12.5 Z M7.199,12.5 L7.671,12.961 L7.48737335,13.1779485 L7.09931049,13.6503343 C6.97376965,13.806037 6.85209923,13.9598933 6.73447013,14.111641 L6.3938777,14.5602963 C6.1751266,14.8548333 5.97322442,15.1398879 5.78953839,15.4133635 L5.52784239,15.8146307 C4.66092012,17.1868369 4.31492316,18.2110076 4.68769635,18.5837808 C4.99685672,18.8929412 5.75406497,18.7077131 6.78626825,18.1409571 L7.14028363,17.9380626 C7.2615255,17.865824 7.38592499,17.7890301 7.5132447,17.7078356 L7.90372717,17.4512051 C8.03664997,17.3613642 8.17225562,17.2672776 8.31030674,17.1691 L8.73155909,16.8624491 C9.3056545,17.1949426 10.0316536,17.2331599 10.6615373,16.9020104 L11.3196313,16.5582519 L10.995126,16.8392713 L10.4985315,17.25717 L10.0101187,17.6532717 L9.51575877,18.038349 L9.2720049,18.222052 L9.2720049,18.222052 L8.79211975,18.5711003 C6.41964354,20.2537753 4.46681871,20.9842235 3.62703618,20.144441 C2.8724492,19.389854 3.38565548,17.7366046 4.71830335,15.6877362 L5.00556892,15.2583524 C5.10512353,15.1134528 5.20842854,14.9668366 5.31533687,14.8186687 L5.6467248,14.3696751 L5.9988503,13.9123617 L6.37083097,13.4477185 C6.49803568,13.2917258 6.62840252,13.1346764 6.76178442,12.9767355 L7.17082824,12.5004028 L7.199,12.5 Z M12.2269987,7.68140769 C12.325605,7.73007281 12.4054188,7.80988657 12.4540839,7.90849288 L13.3588437,9.74173649 C13.3949036,9.81480179 13.4476212,9.87676538 13.5114281,9.92358146 C13.5764935,9.97132094 13.6530898,10.0033095 13.7353126,10.0152571 L15.758417,10.3092314 C16.0316894,10.3489402 16.2210302,10.6026617 16.1813214,10.8759341 C16.1655091,10.9847526 16.1142655,11.0853238 16.0355237,11.1620781 L14.5715916,12.5890593 C14.4537485,12.7039278 14.3999743,12.8694279 14.4277932,13.031625 L14.7733807,15.0465547 C14.8200612,15.3187229 14.6372673,15.5772009 14.3650991,15.6238814 C14.2567203,15.6424698 14.1452363,15.6248125 14.047906,15.5736429 L12.2383864,14.6223222 C12.0927244,14.5457431 11.9187073,14.5457431 11.7730453,14.6223222 L9.96352565,15.5736429 C9.71910336,15.7021433 9.41678978,15.6081701 9.28828937,15.3637478 C9.23711984,15.2664175 9.2194625,15.1549335 9.23805092,15.0465547 L9.58363842,13.031625 C9.61145739,12.8694279 9.55768315,12.7039278 9.4398401,12.5890593 L7.97590798,11.1620781 C7.77816619,10.9693275 7.77412004,10.6527709 7.96687064,10.4550291 C8.04362494,10.3762873 8.14419615,10.3250437 8.25301467,10.3092314 L10.2761191,10.0152571 C10.4389742,9.99159291 10.579757,9.88930822 10.652588,9.74173649 L11.5573478,7.90849288 C11.6795589,7.66086605 11.9793719,7.55919655 12.2269987,7.68140769 Z M20.005,10.0294865 L20.005,13.3048057 C20.0024696,13.4428537 19.8885407,13.552746 19.7504919,13.5502562 C19.6734939,13.5488676 19.6014328,13.5120698 19.555786,13.4500407 L19.4434214,13.3028452 L19.4434214,13.3028452 L19.0488288,12.8029288 L18.6317978,12.2937128 L18.22,11.808 L19.5494347,9.88720886 C19.6280125,9.7736783 19.7837471,9.74534346 19.8972776,9.82392122 C19.9647416,9.87061499 20.005,9.94743956 20.005,10.0294865 Z M4.4604396,9.90105643 L5.783,11.812 L5.37539526,12.2937128 L4.95836422,12.8029288 L4.5637716,13.3028452 C4.5303973,13.3459764 4.49335213,13.3943774 4.45263608,13.4480483 C4.36951286,13.5582966 4.21264606,13.5794845 4.10282528,13.4958002 C4.04001974,13.447942 4.00351567,13.3732254 4.00433499,13.2942681 L4.00487139,10.0432896 C4.00489358,9.90521843 4.11684038,9.7933298 4.25491156,9.7933298 C4.33694612,9.7933298 4.41375427,9.83360165 4.4604396,9.90105643 Z M4.02176289,4.5 C4.3088897,4.5 4.58002947,4.62325937 4.76845832,4.83481792 L4.84395508,4.93079002 L7.61601731,8.9345522 C7.34484653,9.03734524 7.09758825,9.19853031 6.8927411,9.40868188 L6.77754378,9.53737946 C6.6291597,9.71813478 6.51734305,9.91861107 6.44196948,10.1290797 L3.0889039,5.28460499 C3.03101398,5.20098621 3,5.10170223 3,5 C3,4.75454011 3.17687516,4.55039163 3.41012437,4.50805567 L3.5,4.5 L4.02176289,4.5 Z M20.5014317,4.5 C20.777574,4.5 21.0014317,4.72385763 21.0014317,5 C21.0014317,5.10170223 20.9704177,5.20098621 20.9125278,5.28460499 L17.5660392,10.1199064 L17.5660392,10.1199064 C17.3685501,9.57934694 16.9422777,9.13818776 16.3878339,8.93125141 L19.1574766,4.93079002 C19.34426,4.66099183 19.6515239,4.5 19.9796688,4.5 L20.5014317,4.5 Z M7.65176289,4.5 C7.9388897,4.5 8.21002947,4.62325937 8.39845832,4.83481792 L8.47395508,4.93079002 L10.155,7.36 L9.53971583,8.60667033 L9.066,8.675 L6.7189039,5.28460499 C6.66101398,5.20098621 6.63,5.10170223 6.63,5 C6.63,4.75454011 6.80687516,4.55039163 7.04012437,4.50805567 L7.13,4.5 L7.65176289,4.5 Z M16.8714317,4.5 C17.147574,4.5 17.3714317,4.72385763 17.3714317,5 C17.3714317,5.10170223 17.3404177,5.20098621 17.2825278,5.28460499 L14.935,8.674 L14.4707158,8.60667033 L13.851,7.351 L15.5274766,4.93079002 C15.71426,4.66099183 16.0215239,4.5 16.3496688,4.5 L16.8714317,4.5 Z M11.3966649,3.12871167 C11.7841925,2.95709611 12.2272392,2.95709611 12.6147667,3.12871167 L12.7572702,3.20111198 L14.0528229,3.94835555 C14.152492,4.00584227 14.1975998,4.12159001 14.1699459,4.22779037 L14.1391495,4.29863374 L14.1391495,4.29863374 L12.767,6.281 L12.7480254,6.2731973 C12.2468968,6.07227763 11.7050175,6.08889539 11.235227,6.28478564 L9.86953325,4.31220474 C9.79093938,4.19868533 9.81925213,4.04294675 9.93277155,3.96435288 L11.2541614,3.20111198 L11.3966649,3.12871167 Z"
				fill="url(#rank-6vx3n9)"
			/>
			<path
				d="M11.999,17.9510121 L11.9996875,20.9999879 C11.7940547,20.9991656 11.5885536,20.9562657 11.3966649,20.8712883 L11.2541614,20.798888 L9.93277621,20.0358859 C9.81320697,19.9668435 9.77224686,19.8139436 9.84128924,19.6943744 C9.85908368,19.6635575 9.88325202,19.6368946 9.91217842,19.6161683 L9.95289761,19.5869922 C10.1146557,19.4679163 10.2781343,19.3449892 10.4433016,19.2183238 L10.9438377,18.827226 L11.4433657,18.4221972 L11.999,17.9510121 Z M7.199,12.5 L7.671,12.961 L7.48737335,13.1779485 L7.09931049,13.6503343 C6.97376965,13.806037 6.85209923,13.9598933 6.73447013,14.111641 L6.3938777,14.5602963 C6.1751266,14.8548333 5.97322442,15.1398879 5.78953839,15.4133635 L5.52784239,15.8146307 C4.66092012,17.1868369 4.31492316,18.2110076 4.68769635,18.5837808 C4.99685672,18.8929412 5.75406497,18.7077131 6.78626825,18.1409571 L7.14028363,17.9380626 C7.2615255,17.865824 7.38592499,17.7890301 7.5132447,17.7078356 L7.90372717,17.4512051 C8.03664997,17.3613642 8.17225562,17.2672776 8.31030674,17.1691 L8.73155909,16.8624491 C9.3056545,17.1949426 10.0316536,17.2331599 10.6615373,16.9020104 L11.3196313,16.5582519 L10.995126,16.8392713 L10.4985315,17.25717 L10.0101187,17.6532717 L9.51575877,18.038349 L9.2720049,18.222052 L9.2720049,18.222052 L8.79211975,18.5711003 C6.41964354,20.2537753 4.46681871,20.9842235 3.62703618,20.144441 C2.8724492,19.389854 3.38565548,17.7366046 4.71830335,15.6877362 L5.00556892,15.2583524 C5.10512353,15.1134528 5.20842854,14.9668366 5.31533687,14.8186687 L5.6467248,14.3696751 L5.9988503,13.9123617 L6.37083097,13.4477185 C6.49803568,13.2917258 6.62840252,13.1346764 6.76178442,12.9767355 L7.17082824,12.5004028 L7.199,12.5 Z M4.25491156,9.7933298 C4.33694612,9.7933298 4.41375427,9.83360165 4.4604396,9.90105643 L5.783,11.812 L5.37539526,12.2937128 L4.95836422,12.8029288 L4.5637716,13.3028452 C4.5303973,13.3459764 4.49335213,13.3943774 4.45263608,13.4480483 C4.36951286,13.5582966 4.21264606,13.5794845 4.10282528,13.4958002 C4.04001974,13.447942 4.00351567,13.3732254 4.00433499,13.2942681 L4.00487139,10.0432896 C4.00489358,9.90521843 4.11684038,9.7933298 4.25491156,9.7933298 Z M4.02176289,4.5 C4.3088897,4.5 4.58002947,4.62325937 4.76845832,4.83481792 L4.84395508,4.93079002 L7.61601731,8.9345522 C7.34484653,9.03734524 7.09758825,9.19853031 6.8927411,9.40868188 L6.77754378,9.53737946 C6.6291597,9.71813478 6.51734305,9.91861107 6.44196948,10.1290797 L3.0889039,5.28460499 C3.03101398,5.20098621 3,5.10170223 3,5 C3,4.75454011 3.17687516,4.55039163 3.41012437,4.50805567 L3.5,4.5 L4.02176289,4.5 Z M7.65176289,4.5 C7.9388897,4.5 8.21002947,4.62325937 8.39845832,4.83481792 L8.47395508,4.93079002 L10.155,7.36 L9.53971583,8.60667033 L9.066,8.675 L6.7189039,5.28460499 C6.66101398,5.20098621 6.63,5.10170223 6.63,5 C6.63,4.75454011 6.80687516,4.55039163 7.04012437,4.50805567 L7.13,4.5 L7.65176289,4.5 Z M11.9996875,3.00001205 L11.9994072,6.13001535 C11.7358697,6.1310497 11.4760748,6.18435848 11.235227,6.28478564 L9.86953325,4.31220474 C9.79093938,4.19868533 9.81925213,4.04294675 9.93277155,3.96435288 L11.2541614,3.20111198 L11.3966649,3.12871167 C11.5885536,3.04373429 11.7940547,3.00083442 11.9996875,3.00001205 Z M12.2269987,7.68140769 C12.325605,7.73007281 12.4054188,7.80988657 12.4540839,7.90849288 L13.3588437,9.74173649 C13.3954459,9.81590074 13.4492108,9.87862682 13.5143147,9.92568361 L12.0094333,11.997 L16.1621452,10.6494712 C16.1852049,10.7202483 16.1927503,10.7972814 16.1813214,10.8759341 C16.1655091,10.9847526 16.1142655,11.0853238 16.0355237,11.1620781 L14.5715916,12.5890593 C14.5125405,12.6466198 14.4695772,12.7168939 14.4449066,12.7930952 L12.0104333,12.004 L14.5746352,15.5356027 C14.5144303,15.5794369 14.4434699,15.6104397 14.3650991,15.6238814 C14.2567203,15.6424698 14.1452363,15.6248125 14.047906,15.5736429 L12.2383864,14.6223222 C12.1652519,14.5838731 12.0849695,14.5647287 12.0047168,14.5648889 L12.0034333,12.004 L9.43718286,15.535883 C9.37680979,15.4921546 9.32532894,15.4342012 9.28828937,15.3637478 C9.23711984,15.2664175 9.2194625,15.1549335 9.23805092,15.0465547 L9.58363842,13.031625 C9.59763962,12.9499917 9.59097263,12.8675218 9.56587164,12.7910913 L11.9984333,12 L7.84921364,10.6496958 C7.87215149,10.5788139 7.91134578,10.5119917 7.96687064,10.4550291 C8.04362494,10.3762873 8.14419615,10.3250437 8.25301467,10.3092314 L10.2761191,10.0152571 C10.3575466,10.003425 10.4334561,9.9719378 10.4981126,9.92496213 L12.0034333,11.995 L12.0054645,7.62966382 C12.0799774,7.6295705 12.155654,7.64619699 12.2269987,7.68140769 Z"
				fillOpacity={0.2}
				fill="var(--theme-rank-highlight)"
			/>
			<path
				d="M4.02176289,4.5 C4.3088897,4.5 4.58002947,4.62325937 4.76845832,4.83481792 L4.84395508,4.93079002 L6.059,6.685 L4.476,7.29 L3.0889039,5.28460499 C3.03101398,5.20098621 3,5.10170223 3,5 C3,4.75454011 3.17687516,4.55039163 3.41012437,4.50805567 L3.5,4.5 L4.02176289,4.5 Z M20.5014317,4.5 C20.777574,4.5 21.0014317,4.72385763 21.0014317,5 C21.0014317,5.10170223 20.9704177,5.20098621 20.9125278,5.28460499 L19.5254312,7.28880423 L17.943,6.684 L19.1574766,4.93079002 C19.34426,4.66099183 19.6515239,4.5 19.9796688,4.5 L20.5014317,4.5 Z M7.65176289,4.5 C7.9388897,4.5 8.21002947,4.62325937 8.39845832,4.83481792 L8.47395508,4.93079002 L8.929,5.589 L7.347,6.193 L6.7189039,5.28460499 C6.66101398,5.20098621 6.63,5.10170223 6.63,5 C6.63,4.75454011 6.80687516,4.55039163 7.04012437,4.50805567 L7.13,4.5 L7.65176289,4.5 Z M16.8714317,4.5 C17.147574,4.5 17.3714317,4.72385763 17.3714317,5 C17.3714317,5.10170223 17.3404177,5.20098621 17.2825278,5.28460499 L16.654,6.191 L15.072,5.586 L15.5274766,4.93079002 C15.71426,4.66099183 16.0215239,4.5 16.3496688,4.5 L16.8714317,4.5 Z M12.6147667,3.12871167 L12.7572702,3.20111198 L14.0528229,3.94835555 C14.152492,4.00584227 14.1975998,4.12159001 14.1699459,4.22779037 L14.1391495,4.29863374 L13.629,5.035 L12.7572702,4.70111198 L12.6147667,4.62871167 C12.2756801,4.47854806 11.8940867,4.4597776 11.5443734,4.57240031 L11.3966649,4.62871167 L11.2541614,4.70111198 L10.372,5.038 L9.86953325,4.31220474 C9.79093938,4.19868533 9.81925213,4.04294675 9.93277155,3.96435288 L11.2541614,3.20111198 L11.3966649,3.12871167 C11.7841925,2.95709611 12.2272392,2.95709611 12.6147667,3.12871167 Z M10.7277468,18.996 L11.2541614,19.299888 L11.3966649,19.3722883 C11.7357516,19.5224519 12.117345,19.5412224 12.4670583,19.4285997 L12.6147667,19.3722883 L12.7572702,19.299888 L13.2797468,18.998 L13.8872893,19.4624402 L14.1023462,19.620622 C14.2139993,19.7018464 14.2381933,19.8582778 14.1566318,19.9696841 C14.1361159,19.9977071 14.1099862,20.0211481 14.0791207,20.0371481 L12.7572702,20.798888 L12.6147667,20.8712883 C12.2272392,21.0429039 11.7841925,21.0429039 11.3966649,20.8712883 L11.2541614,20.798888 L9.93277621,20.0358859 C9.81320697,19.9668435 9.77224686,19.8139436 9.84128924,19.6943744 C9.85908368,19.6635575 9.88325202,19.6368946 9.91217842,19.6161683 L9.95289761,19.5869922 C10.1146557,19.4679163 10.2781343,19.3449892 10.4433016,19.2183238 L10.7277468,18.996 Z M16.8363648,12.5004028 L17.2454086,12.9767355 L17.4432018,13.2129576 L17.8247791,13.6808944 L18.0083427,13.9123617 L18.3604682,14.3696751 L18.6918561,14.8186687 C18.7453103,14.8927526 18.7978636,14.9664486 18.8494978,15.0397361 L19.1481248,15.4743936 C20.5846365,17.6215188 21.1607641,19.3638338 20.3801568,20.144441 C19.4563961,21.0682018 17.1858541,20.0919833 14.4914343,18.038349 L14.6771446,18.1761785 C17.1809537,19.983945 18.4048229,18.8081525 17.7509445,18.413173 L17.6360598,18.3554527 C18.4551432,18.7496826 19.053347,18.8499305 19.3194967,18.5837808 C19.6922699,18.2110076 19.3462729,17.1868369 18.4793506,15.8146307 L18.2176546,15.4133635 C18.0798901,15.2082568 17.931879,14.9966369 17.7741981,14.7793883 L17.4461142,14.3376483 L17.0013098,13.766761 L16.5198197,13.1779485 L16.336,12.963 L16.811,12.5 L16.8363648,12.5004028 Z M7.199,12.5 L7.671,12.961 L7.48737335,13.1779485 L7.09931049,13.6503343 C6.97376965,13.806037 6.85209923,13.9598933 6.73447013,14.111641 L6.3938777,14.5602963 C6.1751266,14.8548333 5.97322442,15.1398879 5.78953839,15.4133635 L5.52784239,15.8146307 C4.66092012,17.1868369 4.31492316,18.2110076 4.68769635,18.5837808 C4.99685672,18.8929412 5.75406497,18.7077131 6.78626825,18.1409571 L6.70106535,18.192255 C5.90940047,18.7191519 7.79877865,19.1552077 8.7049189,18.6271519 L8.783,18.577 L8.55629665,18.7361708 C6.29069193,20.3007271 4.43882596,20.9562308 3.62703618,20.144441 C2.8724492,19.389854 3.38565548,17.7366046 4.71830335,15.6877362 L5.00556892,15.2583524 C5.10512353,15.1134528 5.20842854,14.9668366 5.31533687,14.8186687 L5.6467248,14.3696751 L5.9988503,13.9123617 L6.37083097,13.4477185 C6.49803568,13.2917258 6.62840252,13.1346764 6.76178442,12.9767355 L7.17082824,12.5004028 L7.199,12.5 Z M19.8972776,9.82392122 C19.9647416,9.87061499 20.005,9.94743956 20.005,10.0294865 L20.005,13.3048057 C20.0024696,13.4428537 19.8885407,13.552746 19.7504919,13.5502562 C19.6734939,13.5488676 19.6014328,13.5120698 19.555786,13.4500407 L19.5494347,9.88720886 C19.6280125,9.7736783 19.7837471,9.74534346 19.8972776,9.82392122 Z M4.25491156,9.7933298 C4.33694612,9.7933298 4.41375427,9.83360165 4.4604396,9.90105643 L4.4750716,12.4621492 L4.4750716,12.4621492 L4.46134768,13.3856363 L4.46134768,13.3856363 L4.45577556,13.4382512 C4.45476834,13.4433514 4.45372184,13.4466171 4.45263608,13.4480483 C4.36951286,13.5582966 4.21264606,13.5794845 4.10282528,13.4958002 C4.04001974,13.447942 4.00351567,13.3732254 4.00434896,13.2942681 L4.00487139,10.0432896 C4.00489358,9.90521843 4.11684038,9.7933298 4.25491156,9.7933298 Z"
				fillOpacity={0.2}
				fill="var(--theme-rank-highlight)"
			/>
			<path
				d="M12.0060521,7.62966422 L12.0074821,12.0054361 L10.4970907,9.92570256 C10.5622064,9.87864366 10.6159808,9.8159107 10.652588,9.74173649 L11.5573478,7.90849288 C11.6444408,7.73202318 11.8217308,7.62966422 12.0060521,7.62966422 Z"
				fillOpacity={0.64}
				fill="#FFFFFF"
			/>
		</g>
	</svg>
);
