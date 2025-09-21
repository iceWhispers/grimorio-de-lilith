Grimório de Lilith — Starter Site (Shop + Blog)
=================================================

Arquitetura
-----------
Site estático em HTML/CSS/JS, minimalista e responsivo, tema escuro.
Páginas:
- index.html (home com destaque de produto e post)
- shop.html (grade de produtos)
- product-1.html (exemplo de página de produto)
- blog.html (lista de posts)
- post-1.html, post-2.html (exemplos de posts)
- assets/styles.css (estilos)
- assets/script.js (carrinho localStorage + checkout por e-mail)
- assets/placeholder-cover.jpg (imagem temporária)

Como usar
---------
1) Abra index.html localmente (duplo clique) para visualizar.
2) Edite textos diretamente no HTML para publicar novos posts/produtos.
   - Copie post-1.html para post-N.html e ajuste.
   - Copie product-1.html para product-N.html e ajuste.
3) Preços e botões "adicionar" usam atributo data-product com JSON simples:
   data-product='{"id":"p1","name":"Nome","price":39.00}'

Checkout
--------
O botão "checkout" abre um e-mail pré-preenchido (mailto). Troque o e-mail
em assets/script.js pela sua caixa real. Depois, substitua por links de pagamento
(Gumroad, PagSeguro, Stripe/Link, Mercado Pago) quando desejar.

Publicação rápida (grátis)
--------------------------
- GitHub Pages: crie um repositório, faça upload dos arquivos e ative Pages.
- Netlify: arraste a pasta para o painel do Netlify (drag-and-drop).
- Cloudflare Pages: similar ao Netlify, integrado com GitHub.

Personalização
--------------
Cores em :root (assets/styles.css)
  --accent: roxo (Lilith)
  --accent-2: magenta (contraste)

Assinatura
----------
Rodapé guarda a frase "até que o gelo derreta." na home.

Licença
-------
Seu conteúdo é seu. O template pode ser usado/alterado livremente por você.
