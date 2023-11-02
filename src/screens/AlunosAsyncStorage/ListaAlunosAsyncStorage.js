import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, Dialog, FAB, Text, Portal } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export default function ListaAlunosAsyncStorage({ navigation }) {
    const [alunos, setAlunos] = useState([]);
    const [showModalExcluirAluno, setShowModalExcluirAluno] = useState(false);
    const [alunoASerExcluido, setAlunoASerExcluido] = useState(null);

    useEffect(() => {
        AsyncStorage.getItem('alunosAsyncStorage')
            .then((data) => {
                const alunos = data ? JSON.parse(data) : [];
                setAlunos(alunos);
            })
            .catch((error) => console.error(error));
    }, []);

    function adicionarAluno(aluno) {
        const novaListaAlunos = [...alunos, aluno];
        AsyncStorage.setItem('alunosAsyncStorage', JSON.stringify(novaListaAlunos))
            .then(() => {
                setAlunos(novaListaAlunos);
            });
    }

    function editarAluno(alunoAntigo, novosDados) {
        const novaListaAlunos = alunos.map((aluno) => {
            return aluno.matricula === alunoAntigo.matricula ? novosDados : aluno;
        });

        AsyncStorage.setItem('alunosAsyncStorage', JSON.stringify(novaListaAlunos))
            .then(() => {
                setAlunos(novaListaAlunos);
            });
    }

    function excluirAluno(aluno) {
        const novaListaAlunos = alunos.filter((a) => a.matricula !== aluno.matricula);
        AsyncStorage.setItem('alunosAsyncStorage', JSON.stringify(novaListaAlunos))
            .then(() => {
                setAlunos(novaListaAlunos);
                Toast.show({
                    type: 'success',
                    text1: 'Aluno excluído com sucesso!',
                });
            });
    }

    function handleExcluirAluno() {
        excluirAluno(alunoASerExcluido);
        setAlunoASerExcluido(null);
        setShowModalExcluirAluno(false);
    }

    function getImc(aluno) {
        const peso = parseFloat(aluno.peso);
        const altura = parseFloat(aluno.altura);
        const imc = peso / ((altura / 100) * (altura / 100));
        return imc.toFixed(2);
    }

    const showModal = () => setShowModalExcluirAluno(true);

    const hideModal = () => setShowModalExcluirAluno(false);

    return (
        <View style={styles.container}>
            <Text variant="titleLarge" style={styles.title}>
                Lista de Alunos
            </Text>
            <FlatList
                style={styles.list}
                data={alunos}
                renderItem={({ item }) => (
                    <Card mode="outlined" style={styles.card}>
                        <Card.Content style={styles.cardContent}>
                            <View style={styles.cardRow}>
                                <Text variant="titleMedium">{item?.nome}</Text>
                                <View style={styles.buttonRow}>
                                    <Button
                                        onPress={() => navigation.push('FormAlunosAsyncStorage', { acao: editarAluno, aluno: item })}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        onPress={() => {
                                            setAlunoASerExcluido(item);
                                            showModal();
                                        }}
                                    >
                                        Excluir
                                    </Button>
                                </View>
                            </View>
                            <View style={styles.cardRow}>
                                <Text variant="bodyLarge">Matrícula: {item?.matricula}</Text>
                                <Text variant="bodyLarge">Turno: {item?.turno}</Text>
                                <Text variant="bodyLarge">Curso: {item.curso}</Text>
                            </View>
                        </Card.Content>
                    </Card>
                )}
            />
            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => navigation.push('FormAlunosAsyncStorage', { acao: adicionarAluno })}
            />
            <Portal>
                <Dialog visible={showModalExcluirAluno} onDismiss={hideModal}>
                    <Dialog.Title>Atenção!</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">Tem certeza que deseja excluir este aluno?</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideModal}>Voltar</Button>
                        <Button onPress={handleExcluirAluno}>Tenho Certeza</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 10,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    list: {
        width: '100%',
    },
    card: {
        marginBottom: 16,
    },
    cardContent: {
        padding: 16,
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonRow: {
        flexDirection: 'row',
    },
});
