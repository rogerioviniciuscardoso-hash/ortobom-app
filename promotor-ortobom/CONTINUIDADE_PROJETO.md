# PROMOTOR ORTOBOM — DOCUMENTO DE TRANSIÇÃO
Atualizado em 29/10/2026. Para uso por outro desenvolvedor ou outra conta do ChatGPT.

## Objetivo
Aplicativo web mobile de registro de visitas de promotores, com fotos antes e depois do trabalho, GPS, acompanhamento e relatórios. Idioma: português brasileiro. **Preservar os dados existentes**.

## Código e publicação
- Repositório: https://github.com/rogerioviniciuscardoso-hash/ortobom-app
- Frontend principal: `promotor-ortobom/index.html` (HTML/CSS/JS, Supabase JS via esm.sh).
- Site: https://rogerioviniciuscardoso-hash.github.io/ortobom-app/promotor-ortobom/
- Estado de referência do frontend: commit `df859ff98b13515c301cba837dceb74b281eacfb` (versão 22 restaurada, com botão de IA retirado).
- Hospedagem: GitHub Pages. Modificações no arquivo acima são publicadas pelo repositório. Para evitar cache, usar query string `?v=numero`.

## Backend
- Supabase projeto **PROMOTOR ORTOBOM**, ref `anptyalbmgfbhgfkhvpi`.
- URL pública do projeto: https://anptyalbmgfbhgfkhvpi.supabase.co
- Schema PostgreSQL: `promotor_ortobom`.
- Edge Function: `promotor-api` (atualmente v11, `verify_jwt=true`).
- Tabelas: `usuarios`, `visitas`, `fotos`, `auditoria`, `contagens_visuais`.
- Views: `resumo_diario`, `relatorio_visitas`.
- Storage privado: `promotor-ortobom-fotos`.
- RPC pública para lista do login: `public.promotor_lista_usuarios(p_unidade integer)`.
- **NÃO alterar** o projeto Supabase separado `ryuipntsmhybxvxjauqw` (PROGRAMACAO ORTOBOM).
- Nunca compartilhar service-role key, senha, token de sessão ou API key em conversas/documentos.

## Usuários e unidades
Unidades: 2, 4, 5, 6, 7, 8, 9, 10, 11, 15, 18, 26, 27.
Usuário inicial existente: Rogerio, perfil `diretor`, unidade 2, ativo. O diretor deve ter acesso às unidades permitidas. Não expor credenciais.
Login: selecionar unidade, usuário e senha numérica de 6 dígitos. Primeiro acesso permite redefinição de senha. A lista de usuários vem da RPC acima.
Permissões: detalhes fotográficos no Dashboard somente para `supervisor`, `gerente` e `diretor`; demais ações dependem das verificações da Edge Function.

## Funcionalidades existentes
1. Fotografia antes e após o trabalho, usando câmera e GPS do celular.
2. Nome da loja em maiúsculas, bairro e sugestão de lojas; a foto final é associada à visita inicial.
3. Localização por GPS e endereço aproximado por Nominatim/OpenStreetMap.
4. Data/hora e comentários nas fotografias; salvamento em Storage privado.
5. Dashboard: locais com foto, visitas com 1/2 fotos, fotos por pessoa, imagens e links de mapa, tempo na loja e deslocamento (mesmo promotor e dia).
6. Exportação CSV da unidade.
7. Após salvar fotografia, retorno ao Dashboard.
8. A versão atual **não exibe** botão de IA nem aviso de chave de IA.

## IA — ADIADA
O usuário decidiu adiar a visão computacional. Roboflow workspace `PROMOTOR ORTOBOM`, projeto `CONTAGEM COLCHOES E TRAVESSEIROS`, tipo detecção de objetos, recebeu 10 imagens ainda não anotadas/treinadas na última verificação. Pretende contar colchões e travesseiros de qualquer marca, comparar automaticamente com visita anterior à mesma loja, sem botão. **Não ativar IA agora**.
A Edge Function ainda pode conter endpoints legados `analisar_frentes` e `foto_anterior` dependentes de `OPENAI_API_KEY`, mas o frontend atual não os chama.

## Exclusão lógica — NÃO concluída na interface
Foi criada a ação de servidor `excluir_registros` na Edge Function v11: diretor, filtro por unidade, período e opcionalmente funcionário/loja (nome exato), prévia de quantidades, confirmação, motivo obrigatório, marca `fotos.excluida_em/excluida_por/motivo_exclusao`, registra evento em `auditoria`. **A interface que expunha a ação foi retirada ao restaurar o frontend v22 a pedido do usuário**. Não afirmar que a funcionalidade está disponível no app atual. Precisa de revisão de segurança, testes end-to-end e reintrodução aprovada.
Observação: exclusão lógica mantém os arquivos no Storage e os registros no banco.

## Atenções e testes necessários
- Testar login real e RPC `promotor_lista_usuarios` (houve relato de usuário não aparecer, depois tela posterior mostrou Dashboard logado).
- Testar câmera/GPS, duas fotos na mesma visita, permissões por unidade, exportação e dashboard com sessão real.
- Testar se Edge Function pode acessar o schema `promotor_ortobom` pela Data API e se os privilégios estão corretos.
- Confirmar políticas de privacidade e retenção das fotos; evitar logs com dados sensíveis.
- Corrigir bugs sem perder o histórico. Não migrar/destruir dados sem backup e autorização.
- A implantação do código não equivale a teste funcional no navegador.

## Para outra conta do ChatGPT
Compartilhe este documento e o link do repositório com a outra pessoa. Instrua: “Continue o projeto PROMOTOR ORTOBOM a partir do documento de transição no GitHub; preserve banco, usuários e funcionalidades; não reative a IA; antes de alterar, inspecione frontend, Edge Function e schema Supabase; explique e teste cada mudança.”
Para editar, o novo desenvolvedor precisará de acesso autorizado ao GitHub e ao projeto Supabase. **Não compartilhar senhas nem chaves secretas**. Para acesso a fotos reais e dados pessoais, conceder apenas o mínimo necessário.

## Status
Documento de continuidade; não é backup integral do banco de dados nem exportação das fotografias. Repositório guarda código frontend; backend e dados permanecem no Supabase. Recomenda-se realizar backup separado de banco e Storage antes de transferir a manutenção.
