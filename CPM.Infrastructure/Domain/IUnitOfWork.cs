using System;

namespace CPM.Infrastructure.Domain
{
	public interface IUnitOfWork : IDisposable
    {
        int Commit();
    }
}
