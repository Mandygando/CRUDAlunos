import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, Dialog, FAB, Text, Portal } from 'react-native-paper';
import Toast from 'react-native-toast-message';

export default function ListaAlunos({ navigation }) {
  const [alunos, setAlunos] = useState([
    {
      nome: 'João Paulo',
      matricula: '001',
      turno: 'Manhã',
      curso: 'Engenharia',
    },
    {
      nome: 'Jorge Luiz',
      matricula: '002',
      turno: 'Tarde',
      curso: 'Medicina',
    },
  ]);
  const [showModalExcluirAluno, setShowModalExcluirAluno] = useState(false);
  const [alunoASerExcluido, setAlunoASerExcluido] = useState(null);

  const showModal = () => setShowModalExcluirAluno(true);

  const hideModal = () => setShowModalExcluirAluno(false);

  function adicionarAluno(aluno) {
    setAlunos([...alunos, aluno]);
  }

  function editarAluno(alunoAntigo, novosDados) {
    const novosAlunos = alunos.map((aluno) =>
      aluno.matricula === alunoAntigo.matricula ? novosDados : aluno
    );
    setAlunos(novosAlunos);
  }

  function excluirAluno(aluno) {
    const novosAlunos = alunos.filter((a) => a.matricula !== aluno.matricula);
    setAlunos(novosAlunos);
    Toast.show({
      type: 'success',
      text1: 'Aluno excluído com sucesso!',
    });
  }

  function handleExcluirAluno() {
    excluirAluno(alunoASerExcluido);
    setAlunoASerExcluido(null);
    hideModal();
  }

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
                    onPress={() =>
                      navigation.push('FormAlunos', { acao: editarAluno, aluno: item })
                    }
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
        onPress={() => navigation.push('FormAlunos', { acao: adicionarAluno })}
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
