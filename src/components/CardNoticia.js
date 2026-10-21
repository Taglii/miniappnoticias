import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function CardNoticia({ categoria, titulo, resumo, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.categoria}>{categoria}</Text>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.resumo}>{resumo}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  categoria: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#64748B',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 6,
  },
  resumo: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 18,
  },
});

