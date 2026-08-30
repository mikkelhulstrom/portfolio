---
title: V-DIPOL ANTENNE
category: RF · SDR · SATTELITER · DECODING · METAL ARBEJDE · 3D PRINT
rev: rev B
date: 2026
tags: RF, SDR, SATTELITES, 3D PRINT, METAL ARBEJDE, DECODING
repo: https://github.com/
summary: En V-Dipol antenne til at opfange radiosignaler fra vejr satelitter som de analoge signaler fra NOAA 15, 18 osv. Såvel også de digitale signaler fra feks Meteor No M2,M3 satelitten. Dette vil den gøre ved at have en resonant frekvens på 137MHz.
---

<figure style="margin: 0; display: inline-block;">
  <img src="/images/noaa18.png" alt="Beskrivelse af billedet">
  <figcaption style="font-size: 0.8rem; color: #555; text-align: left; margin-top: -30px;">Billede af NOAA18 fra https://en.wikipedia.org/wiki/NOAA-18.
  </figcaption>
</figure>

## Overview


En V-Dipol antenne er lavet ved at man har to længder rør/kabel kald det hvad du vil som er placeret 120 grader fra hinanden. 
En Dipol antenne er lavet ved at de to længder skal være 1/2 bølgelængde sammenlagt og 1/4 bølgelængde hver især. Det udregner man ved formlen 

$$
\lambda=\frac{c}{f}
$$  

Denne antenne kan man bruge til at opfange signaler fra vejrsatelitter når de er over en på himlen. Man kan bruge online værktøjer som https://www.n2yo.com. Til at tjekke præcist hvor satelitter er henne og hvornår. 
Derudover kan man bruge en SDR til at modtage de her signaler og processe dem. Et program som SDR++ kan herfra bruges til at tilgå SDR'en for at optage signalerne for så senere at kunne decode dem om til billeder.

## Design

Så som det første skal vi finde ud af hvad længden på de to antenner skal være. Som jeg nævnte før skal man bruge $\frac{1}{2}$ bølgelængde sammenlagt på de to antenner så man får to antenner på $\frac{1}{4}$ bølgelængde. Så lad os først starte med at regne bølgelængden ud af den frekvens vi godt vil have antennen til at være resonant ved. Vi ved at frekvensen på de kendte NOAA satelitter og Meteor satelitterne er begge ca $ 137,9$ MHz. 
$$  
\begin{aligned}
\lambda&=\frac{c}{f} \\
&=\frac{c}{137,9MHz} \\
&= 2,174m
\end{aligned}
$$  
Og så finder vi $\frac{1}{4}$ af bølgelængden.
$$ 
\lambda*\frac{1}{4}=0,5435m
$$  
Det vil så sige at hver antenne skal være omkring 54,3cm.

Men virkeligheden afspejler ikke altid formlerne og derfor er man nød til at bruge en anden mere realistisk tilgang.
Da jeg har tænkt mig at bruge massivt Ø10mm aluminium stænger, vil radiosignalerne have en langsommere hastighed i overfladen af metallet. Og man er derfor nød til at regne K-faktoren(k) ud. 
$$
\begin{aligned}
R=
\frac{\lambda}{2*D}
=\frac{2,174*10^3m}{2*10mm} 
=108,7
\end{aligned}
$$

$$k=0,9787-\Biggl[\frac{11,865}{(1+(\frac{R}{0,000449})^{1,7925})^{0,3}}\Biggr]$$

Og hvis vi så sætter $R$ ind i formlen får vi
$$k=0,955$$
Nu kan vi så udregne den længde antenner skal have ved at tage den teoretiske længde og gange med $k$
$$
0,5435m*0,955=0,519m
$$
Så har vi regnet os frem til at hver antenne ben skal have længde på $51,9$cm. Og vi behøves ikke tilføje længde til benene der hvor mounten skal sidde da den skal laves i 3d print materiale som PETG eller ASA hvilket nærmest er usynligt for radiobølger i den frekvens.

Udregning af båndbredde kan gøres ved 


## Firmware

blablablablablablablablablabla
blablablablablablablablablabla

## Results

blablablablablablablablablabla
blablablablablablablablablabla

## What I'd change next

blablablablablablablablablabla
blablablablablablablablablabla
