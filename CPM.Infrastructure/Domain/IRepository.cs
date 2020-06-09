using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace CPM.Infrastructure.Domain
{
	public interface IRepository<T> where T : class
    {
        T FindById(int id);

        IEnumerable<T> FindAll();

        IEnumerable<T> FindBy(Expression<Func<T, bool>> predicate);

        void Add(T entity);

        void AddRange(IEnumerable<T> entities);

        void Update(T entity);

        void Remove(T entity);

        void RemoveRange(IEnumerable<T> entities);
    }
}
