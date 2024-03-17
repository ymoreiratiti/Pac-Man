---
id: adrs-adr002
title: "ADR002: Use Tiled Map Editor"
# prettier-ignore
description: Architecture Decision Record (ADR) for Tiled Map Editor
---

## Context

Para gerar um fase do game, é necessário ter informações sobre o labirinto, itens, posição inicial dos atores, etc.
A medida que vamos adicionando mais dados tornamos a manutenção das fases mais complexa.

## Decision

Utilizar o [Tiled](https://www.mapeditor.org/) como level editor e aproveitar a integração nativa com o ExcaliburJS

## Consequences

- Mais agilidade para montar os levels
- Gestão mais fácil das colisões e objetos
