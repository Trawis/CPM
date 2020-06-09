namespace CPM.Infrastructure.Exceptions
{
	public static class ExceptionCodes
    {
        public const string ValidationError = "E100";
        public const string CarHasNoDriver = "E101";
        public const string EmployeeAlreadyHasTrip = "E102";
        public const string EmployeesAlreadyHaveTrip = "E103";
        public const string CarNotAvailable = "E104";
		public const string CarPlatesMustBeUnique = "E105";
		public const string EntityNotFound = "E400";
    }
}
