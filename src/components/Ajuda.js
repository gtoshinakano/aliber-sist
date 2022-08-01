import React from 'react'
import {Panel } from 'rsuite'

const Ajuda = () => {
  return(
    <>
      <Panel header="Sobre este sistema" collapsible bordered defaultExpanded={true} style={styles.spacer}>
        <p>
          Este sistema envia os dados de movimentações financeiras da ALIBER diretamente para a planilha <code>'movimentacao_financeira'</code> do arquivo <b>Controle Feira da Liberdade</b> do Google SpreadSheets.
        </p>
        <p>
          É possível alterar os dados diretamente na planilha <code>'movimentacao_financeira'</code> (que pode estar oculta no arquivo do Google SpreadSheets), porém o preenchimento aqui é facilitado.
        </p>
        <p>
          <b>- Caso a planilha esteja oculta no Google SpreadSheets e você queira consultar/alterar os dados diretamente:</b>
        </p>
        <ol style={styles.spacer}>
          <li style={styles.liSpacer}>Abra o arquivo <a href="https://docs.google.com/spreadsheets/d/1axGJhwBgY2Y9vswxDI5Eyl-XAQksIdOjbGfuNKSylEA/edit#gid=1577927336" rel="noopener noreferrer" target="_blank">Controle Feira da Liberdade</a></li>
          <li style={styles.liSpacer}>No menu superior <code><b>Ver &gt; Páginas Ocultas &gt; movimentacao_financeira</b></code></li>
          <li style={styles.liSpacer}>A Planilha estará visível para consulta/edição na barra inferior</li>
        </ol>
        <p>
          <b>- Caso deseje ocultar a planilha novamente:</b>
        </p>
        <ol style={styles.spacer}>
          <li style={styles.liSpacer}>Abra o arquivo <a href="https://docs.google.com/spreadsheets/d/1axGJhwBgY2Y9vswxDI5Eyl-XAQksIdOjbGfuNKSylEA/edit#gid=1577927336" rel="noopener noreferrer" target="_blank">Controle Feira da Liberdade</a></li>
          <li style={styles.liSpacer}>Na barra inferior, <b>clique com o botão direito do mouse</b> na planilha 'movimentacao_financeira'</li>
          <li style={styles.liSpacer}>em seguida, clique em <code><b>Ocultar página</b></code></li>
        </ol>
      </Panel>
      <Panel header="Informações sobre os Campos do Formulário" collapsible bordered defaultExpanded={true} style={styles.spacer}>
        <ol style={styles.spacer}>
          <li style={styles.liSpacer}>
            <p><b>Data</b> - Data em que ocorreu o recebimento/pagamento.</p>
          </li>
          <li style={styles.liSpacer}>
            <p><b>Tipo</b> - Tipo da movimentação financeira</p>
            <p>O <b>Tipo</b> pode ser um dos seguintes itens:</p>
            <ul>
              <li><b>Contribuição: </b>Recebimento de contribuição do expositor por dia de exposição <i><b>(preenchimento do campo Diaobrigatório)</b> </i></li>
              <li><b>Receita: </b>Outros tipos de recebimentos (Ex: rendimentos de aplicação), sem referência a um dia de exposição específico</li>
              <li><b>Despesa: </b>Despesas por dia de exposição <i><b>(preenchimento do campo Dia obrigatório)</b></i></li>
              <li><b>Despesa Mensal: </b>Outros tipos de despesas mensais ou periódicas sem referência a um dia de exposição específico</li>
            </ul>
          </li>
          <li style={styles.liSpacer}><p><b>Mês</b> - Mês de referência do recebimento/pagamento</p></li>
          <li style={styles.liSpacer}>
            <p><b>Dia</b> - Dia da exposição referente ao recebimento/pagamento</p>
            <p><i>* Obrigatório caso o campo <b>Tipo</b> seja <code>Contribuição</code> ou <code>Despesa</code></i></p>
          </li>
          <li style={styles.liSpacer}>
            <p><b>Descrição</b> - Nome descritivo para identificação do recebimento/pagamento</p>
            <p>Para que a soma na planilha 'Balanço Mensal' do Google seja feita corretamente, este campo deve ser preenchido exatamente como preenchido anteriormente.</p>
            <p>Por exemplo: ao preencher o recebimento da contribuição do Setor de Alimentação, utilizar sempre o mesmo texto como descritivo</p>
            <p><code><b>Contribuição do Setor de Alimentação</b></code> (Utilize sempre este mesmo texto para a mesma finalidade)</p>
          </li>
          <li style={styles.liSpacer}>
            <p><b>Valor</b> - Valor do recebimento/pagamento</p>
            <p>Obs: O caractere separador de decimais é o . (ponto)</p>
            <p>Obs: Mesmo que a movimentação financeira seja uma Despesa ou uma Despesa Mensal, os valores devem ser digitados em positivo (sem o sinal de - negativo)</p>
          </li>
          <li style={styles.liSpacer}>
            <p><b>Observações</b> - Outras informações referentes ao recebimento/pagamento</p>
            <p>Campo não obrigatório</p>
          </li>
        </ol>
        <p>Após preencher o formulário e clicar em <b>'Adicionar à Lista'</b>, os dados serão enviados para uma lista temporária antes de ser registrada oficialmente na planilha do Google.</p>
        <p>Esta lista temporária(esquerda) servirá para conferência dos dados anterior ao envio definitivo para a planilha do Google.</p>
        <p>Após a conferência dos dados, clique em <b>'Enviar Lista'</b> no canto inferior esquerdo da tela para fazer o envio definitivo de todos os dados da movimentação financeira.</p>
      </Panel>
    </>
  )
}

const styles = {
  spacer: {margin: 8},
  liSpacer: {margin: 10}
}

export default Ajuda
