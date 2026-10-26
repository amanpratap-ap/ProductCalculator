using ProductCalculator.Models;
using ProductCalculator.Services;
using ProductCalculator.Utilities;

namespace ProductCalculator.Application;

public class Menu
{
    private readonly CalculatorService _calculator;
    private readonly HistoryService _history;
    private readonly InputHelper _inputHelper;

    public Menu(
        CalculatorService calculator,
        HistoryService history)
    {
        _calculator = calculator;
        _history = history;
        _inputHelper = new InputHelper();
    }

    public void Run()
    {
        bool running = true;

        while (running)
        {
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.WriteLine();
            Console.WriteLine("================================");
            Console.WriteLine("       PRODUCT CALCULATOR");
            Console.WriteLine("================================");
            Console.ResetColor();

            Console.WriteLine("1. Multiply two numbers");
            Console.WriteLine("2. View calculation history");
            Console.WriteLine("3. Clear calculation history");
            Console.WriteLine("4. Exit");
            Console.WriteLine();

            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.Write("Choose an option: ");
            Console.ResetColor();

            string? choice = Console.ReadLine();

            switch (choice)
            {
                case "1":
                    Multiply();
                    break;

                case "2":
                    _history.Show();
                    break;

                case "3":
                    _history.Clear();
                    break;

                case "4":
                    running = false;
                    break;

                default:
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine("Invalid option.");
                    Console.ResetColor();
                    break;
            }
        }

        Console.ForegroundColor = ConsoleColor.Green;
        Console.WriteLine();
        Console.WriteLine("Goodbye!");
        Console.ResetColor();
    }

    private void Multiply()
    {
        Console.Write("Enter first number: ");
        double firstNumber = _inputHelper.ReadNumber();

        Console.Write("Enter second number: ");
        double secondNumber = _inputHelper.ReadNumber();

        double result = _calculator.Multiply(
            firstNumber,
            secondNumber);

        Calculation calculation = new Calculation
        {
            FirstNumber = firstNumber,
            SecondNumber = secondNumber,
            Result = result
        };

        _history.Add(calculation);

        Console.WriteLine($"Result: {result}");
    }
}