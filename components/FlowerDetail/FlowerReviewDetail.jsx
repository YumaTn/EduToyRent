import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';

const FlowerReviewDetail = ({ id }) => {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://10.87.47.231:8000/api/v1/reviews`);
        // Filter reviews to get only those that match the flowerId
        const filteredReviews = response.data.filter((review) => review.flowerId === id);
        setRates(filteredReviews);
      } catch (err) {
        setError('Failed to load reviews.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [id]);

  const renderStars = (rating) => (
    <View style={styles.starsContainer}>
      {[...Array(5)].map((_, index) => (
        <MaterialIcons
          key={index}
          name={index < rating ? 'star' : 'star-border'}
          size={20}
          color="gold"
        />
      ))}
    </View>
  );

  const totalRating = rates.reduce((sum, rate) => sum + rate.rating, 0);
  const ratingCount = rates.length;
  const averageRating = ratingCount > 0 ? (totalRating / ratingCount).toFixed(1) : 0;

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <>
      <View style={styles.line} />
      <View style={styles.container}>
        <Text style={styles.title}>Đánh giá sản phẩm</Text>
        <View style={styles.ratingSummary}>
          {renderStars(Math.round(averageRating))}
          <Text>({ratingCount} đánh giá)</Text>
        </View>
        <View style={styles.lineSmall}></View>
        {rates.length > 0 ? (
          rates.map((rate, index) => (
            <View key={index} style={styles.rateItem}>
              <View style={styles.userContainer}>
                <Text style={styles.userName}>{rate.userId.name}</Text>
              </View>
              {renderStars(rate.rating)}
              <Text>{rate.comment}</Text>
              <Text style={styles.date}>{new Date(rate.createdAt).toLocaleDateString()}</Text>
            </View>
          ))
        ) : (
          <Text>Không có đánh giá nào.</Text>
        )}
      </View>
      <View style={styles.line} />
    </>
  );
};

export default FlowerReviewDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  line: {
    borderWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#EFEFEF',
    borderColor: '#EFEFEF',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 10,
    marginLeft: 10,
  },
  ratingSummary: {
    fontSize: 14,
    marginVertical: 5,
    flexDirection: 'row',
    marginLeft: 10,
  },
  rateItem: {
    marginTop: 10,
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: '#CCCCCC',
  },
  errorText: {
    color: 'red',
    marginTop: 20,
    textAlign: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  lineSmall: {
    borderColor: '#CCCCCC',
    borderWidth: 0.2,
  },
  date: {
    color: '#888',
    fontSize: 12,
    marginTop: 5,
  },
});
