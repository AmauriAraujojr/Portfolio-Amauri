import {
  Project as ProjectWrapper,
  ProjectTitle,
  ProjectStack,
  ProjectStackTech,
  ProjectLink,
  ProjectLinks,
} from "./style";

import { Text } from "@/styles/Text";
import { useEffect, useState } from "react";
import { FaGithub, FaShare } from "react-icons/fa";
import { userData } from "@/utils/userData";

interface ReposType {
  id: number;
  name: string;
  language: string;
  description: string;
  html_url: string;
  homepage: string;
}

export const Project = (): JSX.Element => {
  const [repositories, setRepositories] = useState<ReposType[]>([]);

  const [projectsList, setPojectsList] = useState<any>([
    {
      id: 1,

      name: "MotoLink",
      language: "TypeScript",

      description:
        "Uma plataforma de entregas que facilita a comunicação entre empresas e motoboys.A empresa em si criando novas entregas com seus respectivos endereços e taxas e cabendo ao motoboy aceitá-la ou não.O usuário pode se cadastrar em uma das duas categorias citadas a cima e tendo acesso a sua respectiva home page.Essa aplicação foi criada em REACT e TYPESCRIPT, utilizando também bibliotecas como: React Hook-form para a validação e registro de formulários juntamente com o ZOD, React Router dom para criação , navegação entre rotas, proteção de rotas, styled-components para estilo, Axios para as requisiçoes na API. ",
      homepage: "https://moto-link.vercel.app/",

      html_url: "https://github.com/ProjetoFrontEndG4-MotoLink/MotoLink",
    },

    {
      id: 2,

      name: "KenzieHub",
      language: "JavaScript",

      description:
        "Kezie Hub é um projeto desenvolvido durante meu curso na Kenzie , trata-se de uma plataforma de alunos, onde o aluno pode listar, deletar, e atualizar as tecnologias que ele domina. Tecnologías utilizadas: React, JavaScript, Styled-Components, React-hook-form, React-RouterDom.",
      homepage: "https://keziehub.vercel.app/",

      html_url:
        "https://github.com/Kenzie-Academy-Brasil-Developers/entrega-kenzie-hub-AmauriAraujo",
    },
    {
      id: 3,

      name: "Hamburgueria",
      language: "JavaScript",

      description:
        "Uma Hamburgueria online, temos um cardápio onde é possível filtrar produtos por nome e categoria, adicionando o mesmo ao carrinho.Tecnologías utilizadas: React, JavaScript, Styled-Components, React-hook-form, React-RouterDom.",
      homepage: "https://kenzie-burguer-v2-template-amauri-araujo.vercel.app/",

      html_url:
        "https://github.com/Kenzie-Academy-Brasil-Developers/kenzie-burguer-v2-template-AmauriAraujo",
    },
    {
      id: 4,

      name: "NuKenzie",
      language: "JavaScript",

      description:
        "Essa é uma pequena aplicação de controle financeiro, para cadastro de receitas e despesas. Tecnologías utilizadas: React, JavaScript, Css.",
      homepage:
        "https://react-entrega-s1-template-nu-kenzie-amauri-ar-aujo.vercel.app/",

      html_url:
        "https://github.com/Kenzie-Academy-Brasil-Developers/react-entrega-s1-template-nu-kenzie-AmauriARaujo",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://api.github.com/users/${userData.githubUser}/repos?sort=created&direction=desc`
      );

      const json = await data.json();

      setRepositories([json, ...projectsList]);

      return json;
    };

    fetchData();
  }, []);


  return (
    <>
      {repositories &&
        repositories?.map?.((repository) => (
          <ProjectWrapper key={repository.id}>
            <ProjectTitle
              as="h2"
              type="heading3"
              css={{ marginBottom: "$3" }}
              color="grey4"
            >
              {repository.name}
            </ProjectTitle>

            <ProjectStack>
              <Text type="body2" color="grey2">
                Primary Language:
              </Text>
              {repository.language ? (
                <ProjectStackTech>
                  <Text color="grey2" type="body2">
                    {repository.language}
                  </Text>
                </ProjectStackTech>
              ) : (
                <ProjectStackTech>
                  <Text color="grey2" type="body2">
                    Primary language not identified
                  </Text>
                </ProjectStackTech>
              )}
            </ProjectStack>

            <Text type="body1" color="grey2">
              {repository.description?.substring(0, 129)}
            </Text>
            <ProjectLinks>
              <ProjectLink target="_blank" href={repository.html_url}>
                <FaGithub /> Github Code
              </ProjectLink>
              {repository.homepage && (
                <ProjectLink target="_blank" href={repository.homepage}>
                  <FaShare /> See demo
                </ProjectLink>
              )}
            </ProjectLinks>
          </ProjectWrapper>
        ))}
    </>
  );
};
