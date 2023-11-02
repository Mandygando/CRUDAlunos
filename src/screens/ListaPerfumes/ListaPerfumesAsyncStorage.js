import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, IconButton, Text, TextInput } from 'react-native-paper';

export default function ListaPerfumesAsyncStorage() {
    const [perfumes, setPerfumes] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [editando, setEditando] = useState(false);
    const [perfumeSendoEditado, setPerfumeSendoEditado] = useState(null);

    useEffect(() => {
        loadPerfumes();
    }, []);

    async function loadPerfumes() {
        const response = await AsyncStorage.getItem('perfumes');
        const perfumesStorage = response ? JSON.parse(response) : [];
        setPerfumes(perfumesStorage);
    }

    async function adicionarPerfume() {
        let novaListaPerfumes = perfumes;
        novaListaPerfumes.push(inputValue);
        await AsyncStorage.setItem('perfumes', JSON.stringify(novaListaPerfumes));
        setPerfumes(novaListaPerfumes);
        setPerfumeSendoEditado(null);
        setInputValue('');
    }

    async function editarPerfume() {
        let index = perfumes.indexOf(perfumeSendoEditado);
        let novaListaPerfumes = perfumes.slice();
        novaListaPerfumes[index] = inputValue;
        await AsyncStorage.setItem('perfumes', JSON.stringify(novaListaPerfumes));
        setPerfumes(novaListaPerfumes);
        setEditando(false);
        setInputValue('');
    }

    async function excluirPerfume(perfume) {
        let novaListaPerfumes = perfumes.filter(item => item !== perfume);
        await AsyncStorage.setItem('perfumes', JSON.stringify(novaListaPerfumes));
        setPerfumes(novaListaPerfumes);
    }

    function handleEditarPerfume(perfume) {
        setPerfumeSendoEditado(perfume);
        setInputValue(perfume);
        setEditando(true);
    }

    function handleButton() {
        if (editando) {
            editarPerfume();
        } else {
            adicionarPerfume();
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                {editando && <Text>Editando</Text>}
                <TextInput
                    style={{ flex: 4 }}
                    mode='outlined'
                    label='Perfume'
                    value={inputValue}
                    onChangeText={text => setInputValue(text)}
                />
                <Button
                    style={styles.button}
                    mode='contained'
                    onPress={handleButton}
                >
                    {editando ? 'Salvar' : 'Adicionar'}
                </Button>
            </View>
            <FlatList
                style={styles.list}
                data={perfumes}
                renderItem={({ item }) => (
                    <Card
                        style={styles.card}
                        mode='outlined'
                    >
                        <Card.Content style={styles.cardContent}>
                            <Text variant='titleMedium' style={{ flex: 1 }}>{item}</Text>
                            <IconButton icon='pen' onPress={() => handleEditarPerfume(item)} />
                            <IconButton icon='trash-can-outline' onPress={() => excluirPerfume(item)} />
                        </Card.Content>
                    </Card>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        width: '95%',
        paddingTop: 10,
        gap: 5,
        alignItems: 'center',
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
        width: '95%',
        marginTop: 10,
    },
    card: {
        margin: 5,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
