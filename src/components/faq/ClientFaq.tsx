"use client";
import Title from "../Title";
import { Accordion, AccordionItem } from "@nextui-org/react";

const faq = [
  {
    title: "Quais produtos vocês oferecem?",
    content:
      "Oferecemos uma ampla variedade de produtos relacionados ao tabaco, incluindo cigarros, charutos, cachimbos, fumo para cachimbos, acessórios como isqueiros, cinzeiros e estojos, além de produtos para higiene e conservação dos itens.",
  },
  {
    title: "Vocês vendem produtos de tabaco para menores de idade?",
    content:
      "Não. De acordo com a legislação local e as diretrizes éticas da nossa empresa, não vendemos produtos de tabaco para menores de idade. A verificação da idade é feita no momento da compra.",
  },
  {
    title: "Qual é a política de devolução?",
    content:
      "Aceitamos devoluções de produtos não utilizados e em sua embalagem original dentro de um prazo específico após a compra. Consulte nossa política de devolução para obter detalhes específicos.",
  },
  {
    title: "Vocês oferecem envio internacional?",
    content:
      "Atualmente, nosso envio está limitado a determinadas regiões. Consulte nossa página de informações de envio para ver se seu país está incluído.",
  },
  {
    title: "Como faço para acompanhar meu pedido?",
    content:
      "Você receberá um e-mail de confirmação com um número de rastreamento assim que seu pedido for enviado. Esse número pode ser usado para rastrear seu pedido através da transportadora.",
  },
  {
    title: "Vocês oferecem atendimento ao cliente?",
    content:
      "Sim, nossa equipe de atendimento ao cliente está disponível para ajudar com qualquer dúvida ou problema que você possa ter. Entre em contato conosco através do nosso formulário de contato.",
  },
  {
    title: "Como faço para me cadastrar?",
    content:
      'Você pode se cadastrar em nossa loja online durante o processo de compra ou antecipadamente através da opção "Criar Conta" no menu principal. Basta preencher seus dados e criar uma senha.',
  },
  {
    title: "Posso cancelar meu pedido?",
    content:
      "Você pode cancelar seu pedido antes do envio. Após o envio, entre em contato conosco o mais rápido possível para ver se é possível cancelar o pedido.",
  },
  {
    title: "Como faço para fazer uma reclamação?",
    content:
      "Se você tiver alguma reclamação sobre nossos produtos ou serviços, entre em contato conosco imediatamente para que possamos resolver o problema da melhor maneira possível.",
  },
];

function ClientFaq() {
  const renderedItems = faq.map((question, index) => {
    return (
      <AccordionItem
        key={index}
        title={question.title}
        className="text-justify"
      >
        {question.content}
      </AccordionItem>
    );
  });
  return (
    <>
      <Title label="FAQ" isUpperCase />
      <div className="border-1 border-content2 bg-content2 text-content1 shadow-md rounded-md">
        <Accordion className="max-w-3xl">{renderedItems}</Accordion>
      </div>
    </>
  );
}

export default ClientFaq;
