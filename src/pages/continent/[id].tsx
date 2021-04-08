import Head from 'next/head';

import { Flex } from '@chakra-ui/react';
import Gallery from '../../components/Gallery';
import Header from '../../components/Header';
import Jumbotron from '../../components/Jumbotron/Jumbotron';
import TextInfo from '../../components/TextInfo';

import db from '../../../db.json';
import { GetStaticPaths, GetStaticProps } from 'next';

export interface Country {
  id: number;
  image: string;
  name: string;
  capital: string;
  flag: string;
}

interface Continent {
  id: number;
  name: string;
  description: string;
  text: string;
  numberOfCountries: number;
  numberOfLanguages: number;
  jumbotronImage: string;
  carrouselImage: string;
  countries: Country[];
}

interface ContinentProps {
  continent: Continent
}

export default function Continent({ continent }: ContinentProps) {

  return (
    <>
      <Head>
        <title>{continent.name} | Worldtrip</title>
      </Head>


      <Flex
        w="100%"
        alignItems="center"
        direction="column"
        justifyContent="center">
        <Header />
        {continent && <Jumbotron
          image={continent.jumbotronImage}
          name={continent.name}
        />}
        {continent && <TextInfo
          text={continent.text}
          numberOfCountries={continent.numberOfCountries}
          numberOfLanguages={continent.numberOfLanguages}
        />}
        {continent && <Gallery countries={continent.countries} />}
      </Flex>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }

}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params
  const { continents } = db;

  const continent = continents.find(
    continent => continent.id === Number(id))

  return {
    props: {
      continent
    },
    revalidate: 30
  }
}