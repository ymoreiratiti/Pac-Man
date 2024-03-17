---
id: adrs-adr001
title: "ADR001: Use Excalibur Framework"
# prettier-ignore
description: Architecture Decision Record (ADR) for Excalibur Framework
---

## Context

Várias rotinas dentro do código possuem comportamento padrão de outros jogos. Ex.: Movimentação dos personagens, colisão, controle, calculos, etc..

## Decision

Utilizar o [Excalibur.js](https://excaliburjs.com/) como framerwork. Dessa forma teremos códigos padronizado utilizando tipagem de dado e redução de código duplicados

## Consequences

- Menor complexidade no código
- Desenvolvimento de forma mais ágil e precisa
- Melhor Integraçãocom ferramentas como o Tiled
