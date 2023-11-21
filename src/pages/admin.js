"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import Planilla from "@/components/AdminComponents/planilla";
import GraficoArea from "@/components/AdminComponents/Estadisticas/graficoArea";
import GraficoBarra from "@/components/AdminComponents/Estadisticas/graficoBarra";
import GraficoTorta from "@/components/AdminComponents/Estadisticas/graficoTorta";
import Progress from "@/components/AdminComponents/Estadisticas/progressBar";
import CardsComunas from "@/components/AdminComponents/Estadisticas/cardsComunas";
import Usuarios from "@/components/AdminComponents/Estadisticas/usuarios";
import Visitas from "@/components/AdminComponents/Estadisticas/visitas";
import ComunasUsuarios from "@/components/AdminComponents/Estadisticas/comunasUsuarios";
import {
    Col,
    Card,
    Grid,
    Title,
    Text,
    Tab,
    TabList,
    TabGroup,
    TabPanel,
    TabPanels,
    Flex,
    Button,
} from "@tremor/react";

export async function getServerSideProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_IP}/api/colors`);
    const data = await res.json();
    const values = data.values;

    return {
        props: {
            data: values,
        },
    };
}

const Admin = ({ data }) => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            //Obtenemos el token del localStorage
            const token = localStorage.getItem("token");

            const response = await fetch("http://localhost:8000/api/getUsers", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                console.log(response);
                throw new Error("Error al obtener usuarios");
            }

            const dataUsers = await response.json();
            setUsers(dataUsers);
        } catch (error) {
            console.error("Error al obtener usuarios:", error.message);
            toast.error("Error al obtener usuarios");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRefreshClick = () => {
        fetchUsers();
    };

    return (
        <div className="bg-[#F9FAFB] dark:bg-dark-tremor-background-muted p-14">
            <Title>Bienvenido al Dashboard Administrador</Title>
            <div className="justify-between" style={{ display: "flex" }}>
                <Text className="dark:text-dark-tremor-content-emphasis">
                    Aquí podrá observar las métricas asociadas al proyecto
                    ColorRios
                </Text>
                <Button onClick={handleRefreshClick} size="xs">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            fillRule="evenodd"
                            d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
                            clipRule="evenodd"
                        />
                    </svg>
                </Button>
            </div>
            <TabGroup className="mt-6">
                <TabList>
                    <Tab>
                        <Flex>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"
                                />
                            </svg>
                            Estadísticas de Colores
                        </Flex>
                    </Tab>
                    <Tab>
                        <Flex>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                            Estadísticas de Usuarios
                        </Flex>
                    </Tab>
                    <Tab>
                        <Flex>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                                />
                            </svg>
                            Generar reportes
                        </Flex>
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Grid numItems={5} className="gap-3 mt-6">
                            <Col numColSpan={5}>
                                <Progress />
                            </Col>
                            <Col numColSpan={2}>
                                <GraficoTorta data={data} />
                            </Col>
                            <Col numColSpan={3}>
                                <CardsComunas />
                            </Col>
                            <Col numColSpan={2}>
                                <GraficoBarra />
                            </Col>
                            <Col numColSpan={3}>
                                <GraficoArea />
                            </Col>
                        </Grid>
                    </TabPanel>
                    <TabPanel>
                        <Grid numItems={2} className="gap-3 mt-6">
                            <Col numColSpan={2}>
                                <Usuarios dataUsers={users} />
                            </Col>
                            <Col numColSpan={2}>
                                <Visitas dataUsers={users} />
                            </Col>
                            <Col numColSpan={2}>
                                <ComunasUsuarios dataUsers={users} />
                            </Col>
                        </Grid>
                    </TabPanel>
                    <TabPanel>
                        <div className="mt-6">
                            <Card>
                                <Planilla data={data} />
                            </Card>
                        </div>
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    );
};

export default Admin;
