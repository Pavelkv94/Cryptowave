import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cryptocurrencies from './Cryptocurrencies';
import { useGetCryptosQuery } from "../services/cryptoApi";

jest.mock("../services/cryptoApi");

describe('Cryptocurrencies', () => {
  const mockCryptosList = {
    data: {
      coins: [
        {
          rank: 1,
          name: 'Bitcoin',
          symbol: 'BTC',
          price: 50000,
          marketCap: 1000000000,
          change: 5,
          "24hVolume": 20000000,
          iconUrl: 'bitcoin-icon-url',
          sparkline: [1, 2, 3, 4, 5],
          uuid: 'btc-uuid'
        },
        {
          rank: 2,
          name: 'Ethereum',
          symbol: 'ETH',
          price: 2000,
          marketCap: 500000000,
          change: -3,
          "24hVolume": 10000000,
          iconUrl: 'ethereum-icon-url',
          sparkline: [5, 4, 3, 2, 1],
          uuid: 'eth-uuid'
        }
      ]
    },
    isFetching: false
  };

  beforeEach(() => {
    useGetCryptosQuery.mockReturnValue(mockCryptosList);
  });

  test('renders cryptocurrency table with data', async () => {
    render(<Cryptocurrencies />);

    await waitFor(() => {
      expect(screen.getByText(/Today's Cryptocurrency prices by Market Cap/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Search CryptoCurrency')).toBeInTheDocument();

      expect(screen.getByText('Bitcoin (BTC)')).toBeInTheDocument();
      expect(screen.getByText('$50,000.00')).toBeInTheDocument();
      expect(screen.getByText('$1,000,000,000')).toBeInTheDocument();
      expect(screen.getByText('5%')).toBeInTheDocument();
      expect(screen.getByText('$20,000,000')).toBeInTheDocument();
    });
  });

  test('searching for cryptocurrency', async () => {
    render(<Cryptocurrencies />);

    await waitFor(() => {
      expect(screen.getByText(/Today's Cryptocurrency prices by Market Cap/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Search CryptoCurrency')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search CryptoCurrency');
    userEvent.type(searchInput, 'Ethereum');

    expect(screen.getByText('Ethereum (ETH)')).toBeInTheDocument();
    expect(screen.queryByText('Bitcoin (BTC)')).not.toBeInTheDocument();
  });

});
