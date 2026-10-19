# PROJECT A.L. — Operação: Um Encontro

Convite digital interativo para Ana Lívia, criado como uma edição especial em estética de página de quadrinhos: retículas, contornos de tinta, selos de capa, onomatopeias, cores de impressão e arte original em CSS/SVG. A aventura cruza referências ao Homem-Aranha, Stark/J.A.R.V.I.S., Doutor Estranho, Vingadores, Wakanda, Bifrost, Thanos e Joias do Infinito. É um projeto estático, sem backend, rastreamento, envio de dados, APIs, dependências ou etapa de build. Os nomes, respostas e escolhas são tratados no navegador.

## Abrir localmente

1. Extraia o ZIP (ou abra a pasta do projeto).
2. Abra `index.html` no Chrome, Safari, Firefox ou Edge atual.
3. Também pode servir a pasta com qualquer servidor estático, por exemplo `python -m http.server 8000`, e abrir `http://localhost:8000`.

Não há dependências para instalar. O site usa fontes de sistema e gráficos CSS/SVG locais; não precisa de conexão externa para funcionar.

## O que testar

1. Veja a inicialização ou use **Pular inicialização**; avance pelo botão da primeira cena.
2. Na cena Briefing, confira os dados e avance.
3. Abra os quatro portais. O botão de continuação é liberado quando todos forem explorados.
4. Na cena dos portais, clique cinco vezes no reator Arc para o Easter egg de Stark; clique no símbolo místico e no pequeno artefato para ver os outros dois.
5. No arquivo A.L., avance até o convite final.
6. Teste **Quero saber mais** e o retorno ao convite; depois teste **Topo sim!** e a confirmação local.
7. Ative/desative o controle de áudio (som sintético breve, apenas após interação) e experimente a navegação por teclado.
8. Redimensione para largura de celular e desktop. O sistema respeita `prefers-reduced-motion`.

## Personalizar conteúdo

Os textos e a lógica principal estão em `script.js`, no objeto `CONFIG` e nos elementos por ID em `index.html`.

- Para trocar convidada e remetente, altere `CONFIG.guest` e `CONFIG.host` e atualize as ocorrências visíveis no HTML.
- Para mudar as quatro mensagens dos portais, edite `CONFIG.portals` em `script.js`.
- Para ajustar os dados do encontro, edite o painel `.date-panel` no HTML. Data, horário e local começam intencionalmente indefinidos.
- Para alterar botões, confirmação e briefing, procure os textos correspondentes em `index.html`.
- Cores, espaçamentos e tipografia estão em variáveis no começo de `style.css`.

## Imagens, ícones e áudio

O site não usa fotografias ou recursos de terceiros. Os portais, selos e grafismos são desenhos originais em CSS/SVG, sem imagens de personagens ou logotipos oficiais. O favicon em `assets/favicon.svg` pode ser substituído por outro SVG local; atualize o `href` do favicon no `<head>` se mudar o nome. O controle de som ativa uma ambiência sintética discreta via Web Audio API; o áudio só começa após a pessoa ligar o controle e pode ser desligado a qualquer momento. Para adicionar trilha própria, prefira áudio original ou com licença adequada, hospede o arquivo dentro de `assets/` e mantenha o controle de reprodução manual.

## Criar outro ZIP

Compacte a pasta `project-al-missao` inteira, preservando a estrutura. No Windows, selecione a pasta e use **Enviar para > Pasta compactada**. No PowerShell, a partir da pasta que contém o projeto:

```powershell
Compress-Archive -Path .\project-al-missao\index.html,.\project-al-missao\style.css,.\project-al-missao\script.js,.\project-al-missao\README.md,.\project-al-missao\assets -DestinationPath .\project-al-missao.zip -Force
```

Não inclua caches, pastas temporárias ou `node_modules` (este projeto não tem dependências).

## Publicar gratuitamente no Vercel

### Pelo painel

1. Entre no Vercel e escolha **Add New → Project**.
2. Importe o repositório GitHub contendo os arquivos do projeto, ou use a opção de deploy CLI abaixo.
3. Se o projeto estiver na raiz do repositório, deixe **Framework Preset: Other**, **Build Command** vazio e **Output Directory** como `.` (ou raiz).
4. Se o projeto estiver dentro de uma subpasta, configure essa subpasta como **Root Directory**.
5. Clique em **Deploy**. O Vercel serve `index.html` como site estático.

### Pela CLI

Com Node.js e a CLI do Vercel instalados, entre na pasta do projeto, execute `vercel` e siga as perguntas. Para produção, execute `vercel --prod`. Nenhum build é necessário.

## Publicar pelo GitHub

1. Crie um repositório novo no GitHub.
2. Envie os arquivos da pasta do projeto para a raiz do repositório (incluindo `index.html`, `style.css`, `script.js`, `README.md` e `assets/`).
3. Para publicar também pelo GitHub Pages: em **Settings → Pages**, selecione **Deploy from a branch**, escolha `main` e `/ (root)`, e salve. Aguarde o GitHub fornecer o endereço.
4. Para deploy Vercel conectado ao GitHub, importe esse repositório no Vercel; cada push poderá gerar um novo deploy.

## Build e problemas comuns

Não há build configurado ou necessário. Se um provedor solicitar build, use preset **Other** e deixe o comando de build vazio; publique a raiz que contém `index.html`.

- **Página não encontrada:** confira se `index.html` está na raiz configurada no deploy e se o nome está em minúsculas.
- **Arquivos sem estilo:** mantenha `style.css`, `script.js` e `assets/` ao lado de `index.html`; não altere a estrutura sem atualizar os caminhos.
- **Git rejeita o push:** faça `git pull --rebase origin main` (ou a branch real do repositório), resolva conflitos e então envie novamente. Se sua branch tiver outro nome, selecione essa mesma branch nas configurações do Pages/Vercel.
- **A CLI do Vercel não existe:** instale Node.js e a CLI conforme a documentação atual do Vercel; a publicação pelo painel não exige CLI local.

## Compatibilidade e autoria

HTML, CSS e JavaScript modernos, layout adaptável, controles por teclado, foco visível, preferência por movimento reduzido e sem dependências externas. A reprodução de áudio é opcional. O projeto é uma homenagem de fã e não é oficial nem afiliado à Marvel, Disney ou S.H.I.E.L.D.
